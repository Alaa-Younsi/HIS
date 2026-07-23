import { useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { uploadSiteImage } from '@/lib/upload';

/** Plusieurs photos (ex. la galerie d'un service) — ajout, suppression, aucun réordonnancement par glisser-déposer. */
export function GalleryManager({
  value,
  onChange,
  folder,
}: {
  value: readonly string[];
  onChange: (urls: readonly string[]) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    setBusy(true);
    setError(null);
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadSiteImage(file, folder)));
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l’envoi');
    } finally {
      setBusy(false);
    }
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {value.map((url, index) => (
          <div key={url} className="group relative">
            <img src={url} alt="" className="h-20 w-20 rounded-lg border border-navy-100 object-cover" />
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label="Retirer cette photo"
              className="absolute -end-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-flame-500 text-white shadow-md transition hover:bg-flame-600"
            >
              <Icon name="close" size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="grid h-20 w-20 place-items-center rounded-lg border border-dashed border-navy-200 text-navy-400 transition hover:border-flame-400 hover:text-flame-500 disabled:opacity-50"
        >
          <Icon name={busy ? 'clock' : 'check'} size={20} />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files?.length) void handleFiles(event.target.files);
            event.target.value = '';
          }}
        />
      </div>
      {error && <p className="mt-2 text-xs text-flame-600">{error}</p>}
    </div>
  );
}
