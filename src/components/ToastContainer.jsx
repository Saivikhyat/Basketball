import { useLineup } from '../context/LineupContext';

export default function ToastContainer() {
  const { toasts } = useLineup();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-enter rounded-lg border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-sm max-w-xs
            ${toast.type === 'success'
              ? 'border-accent-green/30 bg-accent-green/10 text-accent-green'
              : 'border-accent-red/30 bg-accent-red/10 text-accent-red'
            }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
