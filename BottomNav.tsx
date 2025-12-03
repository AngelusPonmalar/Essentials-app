import { CheckSquare, Bell, FileText, Wallet, Home } from 'lucide-react';

interface BottomNavProps {
  activeScreen: 'home' | 'tasks' | 'reminders' | 'notes' | 'expenses';
  onNavigate: (screen: 'home' | 'tasks' | 'reminders' | 'notes' | 'expenses') => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'tasks' as const, icon: CheckSquare, label: 'Tasks' },
    { id: 'reminders' as const, icon: Bell, label: 'Reminders' },
    { id: 'notes' as const, icon: FileText, label: 'Notes' },
    { id: 'expenses' as const, icon: Wallet, label: 'Expenses' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl border-t border-gray-100">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg scale-105'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
