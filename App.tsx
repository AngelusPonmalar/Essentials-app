import { useState } from "react";
import { HomeDashboard } from "./components/HomeDashboard";
import { TasksScreen } from "./components/TasksScreen";
import { RemindersScreen } from "./components/RemindersScreen";
import { NotesScreen } from "./components/NotesScreen";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { BottomNav } from "./components/BottomNav";
import { AddTaskModal } from "./components/AddTaskModal";
import { AddReminderModal } from "./components/AddReminderModal";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { BudgetAlertModal } from "./components/BudgetAlertModal";
import type { CalendarEvent } from "./components/Calendar";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: "personal" | "work" | "health" | "shopping";
  createdAt: Date;
}

export interface Reminder {
  id: string;
  title: string;
  type: "medicine" | "doctor" | "bill" | "grocery" | "meeting";
  time: string;
  date: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: Date;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category:
    | "food"
    | "transport"
    | "shopping"
    | "bills"
    | "health"
    | "other";
  date: Date;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<
    "home" | "tasks" | "reminders" | "notes" | "expenses"
  >("home");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);

  // Sample data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Morning workout",
      completed: false,
      category: "health",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Review project proposal",
      completed: true,
      category: "work",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Buy groceries",
      completed: false,
      category: "shopping",
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "Call mom",
      completed: false,
      category: "personal",
      createdAt: new Date(),
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Blood pressure medicine",
      type: "medicine",
      time: "9:00 AM",
      date: "Today",
      completed: false,
    },
    {
      id: "2",
      title: "Doctor checkup",
      type: "doctor",
      time: "3:00 PM",
      date: "Tomorrow",
      completed: false,
    },
    {
      id: "3",
      title: "Pay electricity bill",
      type: "bill",
      time: "5:00 PM",
      date: "Nov 30",
      completed: false,
    },
    {
      id: "4",
      title: "Team meeting",
      type: "meeting",
      time: "10:00 AM",
      date: "Today",
      completed: false,
    },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Shopping List",
      content: "Milk, Bread, Eggs, Vegetables",
      pinned: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Recipe Ideas",
      content: "Try the pasta recipe from cookbook",
      pinned: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Important Dates",
      content: "Anniversary: Dec 15, Birthday: Jan 20",
      pinned: true,
      createdAt: new Date(),
    },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      title: "Lunch",
      amount: 12.5,
      category: "food",
      date: new Date(),
    },
    {
      id: "2",
      title: "Bus ticket",
      amount: 2.5,
      category: "transport",
      date: new Date(),
    },
    {
      id: "3",
      title: "Groceries",
      amount: 45.0,
      category: "shopping",
      date: new Date(),
    },
    {
      id: "4",
      title: "Medicine",
      amount: 18.0,
      category: "health",
      date: new Date(),
    },
  ]);

  const [streak, setStreak] = useState(7);
  const monthlyBudget = 500;

  // Calendar events
  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      date: new Date(2025, 11, 5), // December 5
      title: "Mom's Birthday",
      type: "birthday",
    },
    {
      id: "2",
      date: new Date(2025, 11, 15), // December 15
      title: "Wedding Anniversary",
      type: "anniversary",
    },
    {
      id: "3",
      date: new Date(2025, 11, 25), // December 25
      title: "Christmas Party",
      type: "party",
    },
    {
      id: "4",
      date: new Date(2025, 11, 31), // December 31
      title: "New Year's Eve",
      type: "special",
    },
    {
      id: "5",
      date: new Date(2026, 0, 20), // January 20
      title: "Dad's Birthday",
      type: "birthday",
    },
    {
      id: "6",
      date: new Date(2025, 11, 10), // December 10
      title: "Coffee with Sarah",
      type: "coffee",
    },
    {
      id: "7",
      date: new Date(2025, 11, 28), // December 28
      title: "Concert Night",
      type: "music",
    },
  ]);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    setReminders([...reminders, newReminder]);
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder,
      ),
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(
      reminders.filter((reminder) => reminder.id !== id),
    );
  };

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      pinned: false,
      createdAt: new Date(),
    };
    setNotes([...notes, newNote]);
  };

  const togglePinNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note,
      ),
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addExpense = (
    expense: Omit<Expense, "id" | "date">,
  ) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date(),
    };
    setExpenses([...newExpense, ...expenses]);

    // Check if budget exceeded
    const monthTotal =
      expenses.reduce((sum, exp) => sum + exp.amount, 0) +
      expense.amount;
    if (monthTotal > monthlyBudget) {
      setShowBudgetAlert(true);
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(
      expenses.filter((expense) => expense.id !== id),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20">
      <div className="max-w-md mx-auto min-h-screen bg-white/80 backdrop-blur-sm shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-8 rounded-b-3xl shadow-lg">
          <h1 className="text-3xl mb-1">Essentials</h1>
          <p className="text-purple-50">Your daily companion</p>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {activeScreen === "home" && (
            <HomeDashboard
              tasks={tasks}
              reminders={reminders}
              notes={notes}
              expenses={expenses}
              calendarEvents={calendarEvents}
              onAddTask={() => setShowAddTask(true)}
              onAddExpense={() => setShowAddExpense(true)}
              onNavigate={setActiveScreen}
            />
          )}
          {activeScreen === "tasks" && (
            <TasksScreen
              tasks={tasks}
              streak={streak}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onAddTask={() => setShowAddTask(true)}
            />
          )}
          {activeScreen === "reminders" && (
            <RemindersScreen
              reminders={reminders}
              calendarEvents={calendarEvents}
              onToggleReminder={toggleReminder}
              onDeleteReminder={deleteReminder}
              onAddReminder={() => setShowAddReminder(true)}
            />
          )}
          {activeScreen === "notes" && (
            <NotesScreen
              notes={notes}
              onAddNote={addNote}
              onTogglePin={togglePinNote}
              onDeleteNote={deleteNote}
            />
          )}
          {activeScreen === "expenses" && (
            <ExpenseTracker
              expenses={expenses}
              monthlyBudget={monthlyBudget}
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
        />

        {/* Modals */}
        {showAddTask && (
          <AddTaskModal
            onClose={() => setShowAddTask(false)}
            onAdd={addTask}
          />
        )}
        {showAddReminder && (
          <AddReminderModal
            onClose={() => setShowAddReminder(false)}
            onAdd={addReminder}
          />
        )}
        {showAddExpense && (
          <AddExpenseModal
            onClose={() => setShowAddExpense(false)}
            onAdd={addExpense}
          />
        )}
        {showBudgetAlert && (
          <BudgetAlertModal
            onClose={() => setShowBudgetAlert(false)}
            monthlyBudget={monthlyBudget}
            currentSpent={expenses.reduce(
              (sum, exp) => sum + exp.amount,
              0,
            )}
          />
        )}
      </div>
    </div>
  );
}