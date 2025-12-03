import { useState } from 'react';
import { X, Pill, Stethoscope, Receipt, ShoppingCart, Users } from 'lucide-react';
import type { Reminder } from '../App';

interface AddReminderModalProps {
  onClose: () => void;
  onAdd: (reminder: Omit<Reminder, 'id'>) => void;
}

const reminderTypes: Array<{ type: Reminder['type']; label: string; icon: any }> = [
  { type: 'medicine', label: 'Medicine', icon: Pill },
  { type: 'doctor', label: 'Doctor', icon: Stethoscope },
  { type: 'bill', label: 'Bill', icon: Receipt },
  { type: 'grocery', label: 'Grocery', icon: ShoppingCart },
  { type: 'meeting', label: 'Meeting', icon: Users },
];

const typeColors = {
  medicine: 'from-blue-400 to-blue-500',
  doctor: 'from-red-400 to-pink-500',
  bill: 'from-yellow-400 to-orange-500',
  grocery: 'from-green-400 to-green-500',
  meeting: 'from-purple-400 to-purple-500',
};

export function AddReminderModal({ onClose, onAdd }: AddReminderModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Reminder['type']>('medicine');
  const [time, setTime] = useState('09:00');
  const [date, setDate] = useState('Today');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        type,
        time,
        date,
        completed: false,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Add New Reminder</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Reminder Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter reminder title"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none text-lg"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-3">Type</label>
            <div className="grid grid-cols-3 gap-3">
              {reminderTypes.map(({ type: t, label, icon: Icon }) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-4 rounded-xl text-white transition-all flex flex-col items-center gap-2 ${
                    type === t
                      ? `bg-gradient-to-br ${typeColors[t]} shadow-lg scale-105`
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Today"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Reminder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
