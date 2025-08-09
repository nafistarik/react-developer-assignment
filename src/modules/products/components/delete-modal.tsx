'use client';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[var(--z-modal)]"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[var(--card)] text-[var(--card-foreground)] p-6 rounded-[var(--radius)] max-w-md w-full shadow-[var(--shadow-lg)]">
        {/* Title */}
        <h3 className="text-lg font-bold mb-2">{title}</h3>

        {/* Message */}
        <p className="mb-6 text-[var(--muted-foreground)]">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted-foreground)] hover:text-[var(--muted)] transition-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-[var(--radius)] hover:bg-[var(--primary-hover)] transition-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
