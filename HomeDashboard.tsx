import { CheckSquare, Bell, FileText, Wallet, Plus, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import type { Task, Reminder, Note, Expense } from '../App';
import { Calendar, CalendarEvent } from './Calendar';
import { UpcomingEvents } from './UpcomingEvents';

interface HomeDashboardProps {
  tasks: Task[];
  reminders: Reminder[];
  notes: Note[];
  expenses: Expense[];
  calendarEvents: CalendarEvent[];
  onAddTask: () => void;
  onAddExpense: () => void;
  onNavigate: (screen: 'tasks' | 'reminders' | 'notes' | 'expenses') => void;
}

export function HomeDashboard({
  tasks,
  reminders,
  notes,
  expenses,
  calendarEvents,
  onAddTask,
  onAddExpense,
  onNavigate,
}: HomeDashboardProps) {
  const todayTasks = tasks.filter(task => !task.completed);
  const upcomingReminders = reminders.filter(r => !r.completed && (r.date === 'Today' || r.date === 'Tomorrow')).slice(0, 3);
  const pinnedNotes = notes.filter(n => n.pinned).slice(0, 2);
  const todayExpenses = expenses.filter(e => {
    const today = new Date().toDateString();
    return e.date.toDateString() === today;
  });
  const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl text-gray-800 mb-1">Good Morning! 👋</h2>
        <p className="text-gray-500">Here's your day at a glance</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onAddTask}
          className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <div className="bg-blue-400 p-2 rounded-xl">
            <Plus size={20} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-blue-900">Quick Add</p>
            <p className="text-xs text-blue-600">New Task</p>
          </div>
        </button>

        <button
          onClick={onAddExpense}
          className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <div className="bg-green-400 p-2 rounded-xl">
            <Plus size={20} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-green-900">Quick Add</p>
            <p className="text-xs text-green-600">Expense</p>
          </div>
        </button>
      </div>

      {/* Today's Tasks */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckSquare size={24} className="text-purple-600" />
            <h3 className="text-lg text-purple-900">Today's Tasks</h3>
          </div>
          <button
            onClick={() => onNavigate('tasks')}
            className="text-purple-600 hover:text-purple-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {todayTasks.length === 0 ? (
          <p className="text-purple-600 text-center py-4">All done! Great job! 🎉</p>
        ) : (
          <div className="space-y-2">
            {todayTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="bg-white rounded-xl p-3 flex items-center gap-3">
                <div className="w-5 h-5 rounded-md border-2 border-purple-300" />
                <p className="text-gray-700 flex-1">{task.title}</p>
              </div>
            ))}
            {todayTasks.length > 3 && (
              <p className="text-purple-600 text-center pt-2">+{todayTasks.length - 3} more tasks</p>
            )}
          </div>
        )}
      </div>

      {/* Upcoming Reminders */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={24} className="text-pink-600" />
            <h3 className="text-lg text-pink-900">Upcoming Reminders</h3>
          </div>
          <button
            onClick={() => onNavigate('reminders')}
            className="text-pink-600 hover:text-pink-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {upcomingReminders.length === 0 ? (
          <p className="text-pink-600 text-center py-4">No reminders for today</p>
        ) : (
          <div className="space-y-2">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="bg-white rounded-xl p-3">
                <p className="text-gray-800">{reminder.title}</p>
                <p className="text-pink-600 text-sm mt-1">{reminder.date} • {reminder.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Notes */}
      {pinnedNotes.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={24} className="text-yellow-600" />
              <h3 className="text-lg text-yellow-900">Pinned Notes</h3>
            </div>
            <button
              onClick={() => onNavigate('notes')}
              className="text-yellow-600 hover:text-yellow-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="space-y-2">
            {pinnedNotes.map((note) => (
              <div key={note.id} className="bg-white rounded-xl p-3">
                <p className="text-gray-800">{note.title}</p>
                <p className="text-gray-500 text-sm mt-1 line-clamp-1">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Expenses */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet size={24} className="text-green-600" />
            <h3 className="text-lg text-green-900">Today's Expenses</h3>
          </div>
          <button
            onClick={() => onNavigate('expenses')}
            className="text-green-600 hover:text-green-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-3xl text-green-600">${todayTotal.toFixed(2)}</p>
          <p className="text-gray-500 text-sm mt-1">{todayExpenses.length} transactions today</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={24} className="text-blue-600" />
            <h3 className="text-lg text-blue-900">Calendar</h3>
          </div>
          <button
            onClick={() => onNavigate('tasks')}
            className="text-blue-600 hover:text-blue-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <UpcomingEvents events={calendarEvents} />
      </div>
    </div>
  );
}