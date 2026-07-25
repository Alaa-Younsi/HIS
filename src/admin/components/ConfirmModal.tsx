import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { useAdminT } from '@/admin/i18n';

/**
 * Modale de confirmation pour une action destructrice — jamais un simple
 * `window.confirm`, pour pouvoir désactiver les boutons et le clic sur le
 * fond pendant l'exécution (évite un double-clic qui déclenche deux fois
 * la suppression).
 */
export function ConfirmModal({
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const { t } = useAdminT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setBusy(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.errorGeneric);
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={busy ? undefined : onClose}
        className="absolute inset-0 cursor-default"
      />
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-flame-50 text-flame-600">
          <Icon name="close" size={20} />
        </span>
        <h2 className="mt-4 text-lg text-navy-900">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{description}</p>
        {error && <p className="mt-3 text-sm text-flame-600">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="btn-ghost flex-1 !py-2.5 !text-xs disabled:opacity-50"
          >
            {t.common.cancel}
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={busy}
            className="btn flex-1 bg-flame-600 !py-2.5 !text-xs text-white hover:bg-flame-700 disabled:opacity-50"
          >
            {busy ? t.common.deleting : (confirmLabel ?? t.common.delete)}
          </button>
        </div>
      </div>
    </div>
  );
}
