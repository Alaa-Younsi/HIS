import { useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { uploadSiteVideo } from '@/lib/upload';
import { isYoutubeUrl, youtubeId, youtubeThumbnailUrl } from '@/lib/video';
import { useAdminT } from '@/admin/i18n';

/**
 * Plusieurs vidéos (ex. la galerie vidéo d'une réalisation) — un lien
 * YouTube (recommandé : gratuit, illimité, hors forfait Supabase) ou un
 * fichier envoyé vers Supabase Storage (plafonné, voir src/lib/upload.ts).
 * Les deux cohabitent dans le même tableau `value`, distingués à l'affichage
 * par la forme de l'URL.
 */
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
  const [youtubeInput, setYoutubeInput] = useState('');

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

  const addYoutubeLink = () => {
    const url = youtubeInput.trim();
    if (!url) return;
    if (!isYoutubeUrl(url)) {
      setError(t.videoUploader.youtubeInvalid);
      return;
    }
    setError(null);
    onChange([...value, url]);
    setYoutubeInput('');
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="url"
          value={youtubeInput}
          onChange={(event) => setYoutubeInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addYoutubeLink();
            }
          }}
          placeholder={t.videoUploader.youtubePlaceholder}
          dir="ltr"
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 transition placeholder:text-navy-900/35 focus:border-flame-400 focus:outline-none focus:ring-2 focus:ring-flame-500/25"
        />
        <button type="button" onClick={addYoutubeLink} className="btn-ghost !py-2.5 !text-xs whitespace-nowrap">
          {t.videoUploader.addYoutube}
        </button>
      </div>
      <p className="mt-1.5 text-xs font-normal text-navy-900/45">{t.videoUploader.youtubeHint}</p>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((url, index) => {
          const ytId = youtubeId(url);
          return (
            <div key={url} className="group relative">
              {ytId ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-navy-100 bg-navy-900">
                  <img src={youtubeThumbnailUrl(ytId)} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center bg-navy-950/20">
                    <Icon name="play" size={28} className="text-white drop-shadow" />
                  </span>
                  <span className="absolute bottom-1 start-1 rounded bg-navy-950/70 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    YouTube
                  </span>
                </div>
              ) : (
                <video
                  src={url}
                  className="aspect-video w-full rounded-lg border border-navy-100 bg-navy-900 object-cover"
                  muted
                  preload="metadata"
                />
              )}
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label={t.videoUploader.removeVideo}
                className="absolute -end-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-flame-500 text-white shadow-md transition hover:bg-flame-600"
              >
                <Icon name="close" size={12} />
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="grid aspect-video place-items-center rounded-lg border border-dashed border-navy-200 text-navy-400 transition hover:border-flame-400 hover:text-flame-500 disabled:opacity-50"
          title={t.videoUploader.uploadFileTitle}
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
