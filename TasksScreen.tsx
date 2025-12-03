import { Plus, Trash2, Flame } from 'lucide-react';
import type { Task } from '../App';

interface TasksScreenProps {
  tasks: Task[];
  streak: number;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
}

const categoryColors = {
  personal: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  work: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  health: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  shopping: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
};

export function TasksScreen({ tasks, streak, onToggleTask, onDeleteTask, onAddTask }: TasksScreenProps) {
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-800 mb-2">My Tasks</h2>
        <p className="text-gray-500">Stay organized and productive</p>
      </div>

      {/* Streak Card */}
      <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 mb-1">Daily Streak</p>
            <p className="text-3xl text-orange-600">{streak} days 🔥</p>
            <p className="text-orange-600 text-sm mt-1">Keep it going!</p>
          </div>
          <div className="bg-orange-400 p-4 rounded-2xl">
            <Flame size={40} className="text-white" />
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-700">Today's Progress</p>
          <p className="text-purple-600">{completedCount}/{totalCount}</p>
        </div>
        <div className="w-full bg-white rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
      >
        <Plus size={24} />
        <span className="text-lg">Add New Task</span>
      </button>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tasks yet</p>
            <p className="text-gray-400">Add your first task to get started!</p>
          </div>
        ) : (
          <>
            {/* Active Tasks */}
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).map((task) => {
                const colors = categoryColors[task.category];
                return (
                  <div
                    key={task.id}
                    className={`${colors.bg} rounded-2xl p-4 shadow-sm border-2 ${colors.border} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg border-2 ${colors.border} bg-white flex items-center justify-center flex-shrink-0 mt-1`}
                      >
                      </button>
                      <div className="flex-1">
                        <p className="text-gray-800 text-lg">{task.title}</p>
                        <span className={`inline-block ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs mt-2 capitalize`}>
                          {task.category}
                        </span>
                      </div>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completed Tasks */}
            {tasks.filter(task => task.completed).length > 0 && (
              <div className="pt-4">
                <h3 className="text-gray-500 mb-3">Completed</h3>
                <div className="space-y-3">
                  {tasks.filter(task => task.completed).map((task) => {
                    const colors = categoryColors[task.category];
                    return (
                      <div
                        key={task.id}
                        className="bg-gray-50 rounded-2xl p-4 shadow-sm border-2 border-gray-200 opacity-60"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => onToggleTask(task.id)}
                            className="w-6 h-6 rounded-lg bg-green-400 flex items-center justify-center flex-shrink-0 mt-1"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-500 text-lg line-through">{task.title}</p>
                            <span className={`inline-block bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs mt-2 capitalize`}>
                              {task.category}
                            </span>
                          </div>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
