import { useState } from 'react';
import { X } from 'lucide-react';
import type { Task } from '../App';

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const categories: Task['category'][] = ['personal', 'work', 'health', 'shopping'];

const categoryColors = {
  personal: 'from-blue-400 to-blue-500',
  work: 'from-purple-400 to-purple-500',
  health: 'from-green-400 to-green-500',
  shopping: 'from-pink-400 to-pink-500',
};

export function AddTaskModal({ onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        completed: false,
        category,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Add New Task</h2>
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
            <label className="block text-gray-700 mb-2">Task Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-lg"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-3">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-4 rounded-xl text-white transition-all ${
                    category === cat
                      ? `bg-gradient-to-br ${categoryColors[cat]} shadow-lg scale-105`
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <span className="capitalize">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Task
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
