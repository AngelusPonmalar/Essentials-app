import { Plus, Pill, Stethoscope, Receipt, ShoppingCart, Users, Trash2 } from 'lucide-react';
import type { Reminder } from '../App';
import { Calendar, CalendarEvent } from './Calendar';

interface RemindersScreenProps {
  reminders: Reminder[];
  calendarEvents: CalendarEvent[];
  onToggleReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
  onAddReminder: () => void;
}

const reminderIcons = {
  medicine: { icon: Pill, color: 'from-blue-400 to-blue-500' },
  doctor: { icon: Stethoscope, color: 'from-red-400 to-pink-500' },
  bill: { icon: Receipt, color: 'from-yellow-400 to-orange-500' },
  grocery: { icon: ShoppingCart, color: 'from-green-400 to-green-500' },
  meeting: { icon: Users, color: 'from-purple-400 to-purple-500' },
};

export function RemindersScreen({
  reminders,
  calendarEvents,
  onToggleReminder,
  onDeleteReminder,
  onAddReminder,
}: RemindersScreenProps) {
  const activeReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-800 mb-2">Reminders</h2>
        <p className="text-gray-500">Never miss what matters</p>
      </div>

      {/* Add Reminder Button */}
      <button
        onClick={onAddReminder}
        className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
      >
        <Plus size={24} />
        <span className="text-lg">Add New Reminder</span>
      </button>

      {/* Calendar Widget */}
      <div>
        <Calendar events={calendarEvents} compact />
      </div>

      {/* Active Reminders */}
      <div className="space-y-4">
        {activeReminders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No active reminders</p>
            <p className="text-gray-400">Add a reminder to get notified</p>
          </div>
        ) : (
          <>
            {activeReminders.map((reminder) => {
              const { icon: Icon, color } = reminderIcons[reminder.type];
              return (
                <div
                  key={reminder.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 p-4">
                    <div className={`bg-gradient-to-br ${color} p-3 rounded-xl flex-shrink-0`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-800 mb-1">{reminder.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full">{reminder.date}</span>
                        <span className="text-gray-400">•</span>
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onToggleReminder(reminder.id)}
                        className="w-6 h-6 rounded-lg border-2 border-pink-300 bg-white flex items-center justify-center"
                      >
                      </button>
                      <button
                        onClick={() => onDeleteReminder(reminder.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div className="pt-4">
          <h3 className="text-gray-500 mb-3">Completed</h3>
          <div className="space-y-3">
            {completedReminders.map((reminder) => {
              const { icon: Icon, color } = reminderIcons[reminder.type];
              return (
                <div
                  key={reminder.id}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden opacity-60"
                >
                  <div className="flex items-start gap-4 p-4">
                    <div className="bg-gray-300 p-3 rounded-xl flex-shrink-0">
                      <Icon size={28} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-500 line-through mb-1">{reminder.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full">{reminder.date}</span>
                        <span className="text-gray-300">•</span>
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onToggleReminder(reminder.id)}
                        className="w-6 h-6 rounded-lg bg-green-400 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDeleteReminder(reminder.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}