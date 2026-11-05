import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AlertBanner({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const { type, message } = notification;

  const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-rose-50 border-rose-200 text-rose-900',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-900',
  }[type || 'info'];

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />,
  }[type || 'info'];

  return (
    <div className={`mb-6 rounded-xl border p-4 shadow-sm flex items-start justify-between transition-all duration-300 ${styles}`}>
      <div className="flex items-start space-x-3">
        {icons}
        <div className="text-sm font-medium leading-relaxed">
          {message}
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="ml-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-black/5 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
