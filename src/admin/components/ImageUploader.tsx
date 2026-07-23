import { useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { uploadSiteImage } from '@/lib/upload';

/** Une seule photo (ex. l'image d'un service). */
export function ImageUploader({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const url = await uploadSiteImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l’envoi');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      {value ? (
        <img src={value} alt="" className="h-24 w-24 flex-none rounded-lg border border-navy-100 object-cover" />
      ) : (
        <div className="grid h-24 w-24 flex-none place-items-center rounded-lg border border-dashed border-navy-200 text-navy-300">
          <Icon name="fire" size={26} />
        </div>
      )}
      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleFile(file);
            event.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn-ghost !py-2 !text-xs disabled:opacity-50"
        >
          {busy ? 'Envoi…' : value ? 'Remplacer la photo' : 'Choisir une photo'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="block text-xs text-navy-900/50 transition hover:text-flame-600"
          >
            Retirer
          </button>
        )}
        {error && <p className="text-xs text-flame-600">{error}</p>}
      </div>
    </div>
  );
}
