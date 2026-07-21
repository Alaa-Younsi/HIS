"""
Genere les declinaisons responsives des photos du site.

Pour chaque JPEG de public/images/, produit une version 400 / 800 / 1200 px
(et 1600 / 1920 px pour les tres grandes images) en JPEG *et* en WebP, puis
ecrit le manifeste src/content/image-variants.ts que le composant <Img> lit
pour composer ses attributs srcset.

    python scripts/generate-image-variants.py

A relancer apres avoir depose de nouvelles photos dans public/images/.
Sans declinaisons, une photo reste affichee en pleine resolution : le site
fonctionne toujours, il est juste plus lourd a charger.

Prerequis : Python 3 + Pillow  (pip install Pillow)
"""

import json
import os
import re
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "public", "images")
MANIFEST = os.path.join(ROOT, "src", "content", "image-variants.ts")

WIDTHS = [400, 600, 800, 1200, 1600, 1920]
JPEG_QUALITY = 78
WEBP_QUALITY = 76

# Une declinaison deja generee ne doit pas servir de source.
VARIANT_RE = re.compile(r"-\d+\.(jpg|webp)$")


def sources():
    for folder, _, files in os.walk(IMAGES):
        for name in sorted(files):
            if name.lower().endswith(".jpg") and not VARIANT_RE.search(name):
                yield os.path.join(folder, name)


def web_path(absolute):
    return "/images/" + os.path.relpath(absolute, IMAGES).replace(os.sep, "/")


def main():
    manifest = {}
    generated = 0

    for path in sources():
        with Image.open(path) as img:
            img = img.convert("RGB")
            widths = [w for w in WIDTHS if w <= img.width]
            # Une image plus petite que le premier palier garde sa taille native.
            if not widths:
                widths = [img.width]

            for width in widths:
                height = round(img.height * width / img.width)
                resized = img.resize((width, height), Image.LANCZOS)
                stem = path[: -len(".jpg")]
                resized.save(f"{stem}-{width}.jpg", "JPEG",
                             quality=JPEG_QUALITY, optimize=True, progressive=True)
                resized.save(f"{stem}-{width}.webp", "WEBP", quality=WEBP_QUALITY, method=6)
                generated += 2

        manifest[web_path(path)] = widths
        print(f"  {web_path(path):46s} {', '.join(str(w) for w in widths)}")

    body = (
        "/**\n"
        " * Fichier genere par scripts/generate-image-variants.py — ne pas editer a la main.\n"
        " *\n"
        " * Largeurs disponibles pour chaque photo. <Img> ne compose un srcset que\n"
        " * pour les images listees ici : une photo ajoutee sans declinaison\n"
        " * s'affiche normalement, en pleine resolution.\n"
        " */\n"
        "export const imageVariants: Readonly<Record<string, readonly number[]>> = "
        + json.dumps(manifest, indent=2, ensure_ascii=False)
        + ";\n"
    )
    with open(MANIFEST, "w", encoding="utf8", newline="\n") as f:
        f.write(body)

    print(f"\n{generated} fichiers generes pour {len(manifest)} photos")
    print(f"manifeste : {os.path.relpath(MANIFEST, ROOT)}")


if __name__ == "__main__":
    sys.exit(main())
