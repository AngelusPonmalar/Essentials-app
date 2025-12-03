import { useState } from 'react';
import { X, ShoppingBag, Bus, CreditCard, FileText, Heart, MoreHorizontal } from 'lucide-react';
import type { Expense } from '../App';

interface AddExpenseModalProps {
  onClose: () => void;
  onAdd: (expense: Omit<Expense, 'id' | 'date'>) => void;
}

const expenseCategories: Array<{ category: Expense['category']; label: string; icon: any }> = [
  { category: 'food', label: 'Food', icon: ShoppingBag },
  { category: 'transport', label: 'Transport', icon: Bus },
  { category: 'shopping', label: 'Shopping', icon: CreditCard },
  { category: 'bills', label: 'Bills', icon: FileText },
  { category: 'health', label: 'Health', icon: Heart },
  { category: 'other', label: 'Other', icon: MoreHorizontal },
];

const categoryColors = {
  food: 'from-orange-400 to-orange-500',
  transport: 'from-blue-400 to-blue-500',
  shopping: 'from-pink-400 to-pink-500',
  bills: 'from-purple-400 to-purple-500',
  health: 'from-green-400 to-green-500',
  other: 'from-gray-400 to-gray-500',
};

export function AddExpenseModal({ onClose, onAdd }: AddExpenseModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && amount) {
      onAdd({
        title: title.trim(),
        amount: parseFloat(amount),
        category,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Add Expense</h2>
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
            <label className="block text-gray-700 mb-2">Expense Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter expense name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-3">Category</label>
            <div className="grid grid-cols-3 gap-3">
              {expenseCategories.map(({ category: cat, label, icon: Icon }) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-4 rounded-xl text-white transition-all flex flex-col items-center gap-2 ${
                    category === cat
                      ? `bg-gradient-to-br ${categoryColors[cat]} shadow-lg scale-105`
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!title.trim() || !amount}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Expense
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
