import { useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { uploadSiteVideo } from '@/lib/upload';
import { useAdminT } from '@/admin/i18n';

/** Plusieurs vidéos (ex. la galerie vidéo d'une réalisation) — ajout, suppression. */
export function VideoManager({
  value,
  onChange,
  folder,
}: {
  value: readonly string[];
  onChange: (urls: readonly string[]) => void;
  folder: string;
}) {
  const { t } = useAdminT();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    setBusy(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadSiteVideo(file, folder));
      }
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.uploadFailed);
    } finally {
      setBusy(false);
    }
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((url, index) => (
          <div key={url} className="group relative">
            <video src={url} className="aspect-video w-full rounded-lg border border-navy-100 bg-navy-900 object-cover" muted preload="metadata" />
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label={t.videoUploader.removeVideo}
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
          className="grid aspect-video place-items-center rounded-lg border border-dashed border-navy-200 text-navy-400 transition hover:border-flame-400 hover:text-flame-500 disabled:opacity-50"
        >
          <Icon name={busy ? 'clock' : 'video'} size={20} />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files?.length) void handleFiles(event.target.files);
            event.target.value = '';
          }}
        />
      </div>
      {busy && <p className="mt-2 text-xs text-navy-900/50">{t.videoUploader.sending}</p>}
      {error && <p className="mt-2 text-xs text-flame-600">{error}</p>}
    </div>
  );
}
