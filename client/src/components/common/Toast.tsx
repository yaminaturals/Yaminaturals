import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl bg-white animate-slideIn ${
            toast.type === 'success'
              ? 'border-emerald-200 text-emerald-950'
              : toast.type === 'error'
              ? 'border-red-200 text-red-950'
              : 'border-slate-200 text-slate-900'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-700 mt-0.5 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle size={18} className="text-red-700 mt-0.5 flex-shrink-0" />}
          {toast.type === 'info' && <Info size={18} className="text-emerald-800 mt-0.5 flex-shrink-0" />}

          <div className="flex-1 text-xs">
            {toast.title && <div className="font-bold mb-0.5">{toast.title}</div>}
            <div className="text-slate-600">{toast.message}</div>
          </div>

          <button onClick={() => onDismiss(toast.id)} className="text-slate-400 hover:text-slate-700">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
