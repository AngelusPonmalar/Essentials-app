import { useState } from 'react';
import { ChevronLeft, ChevronRight, Cake, Heart, Gift, PartyPopper, Star, Coffee, Music, Sparkles } from 'lucide-react';

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'birthday' | 'anniversary' | 'gift' | 'party' | 'special' | 'coffee' | 'music' | 'other';
}

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  compact?: boolean;
}

const eventIcons = {
  birthday: Cake,
  anniversary: Heart,
  gift: Gift,
  party: PartyPopper,
  special: Star,
  coffee: Coffee,
  music: Music,
  other: Sparkles,
};

const eventColors = {
  birthday: 'text-pink-500',
  anniversary: 'text-red-500',
  gift: 'text-purple-500',
  party: 'text-yellow-500',
  special: 'text-blue-500',
  coffee: 'text-orange-500',
  music: 'text-indigo-500',
  other: 'text-green-500',
};

export function Calendar({ events, onEventClick, compact = false }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    const hasEvents = dayEvents.length > 0;
    const isTodayDate = isToday(day);

    days.push(
      <div
        key={day}
        className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all relative ${
          isTodayDate
            ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-md'
            : hasEvents
            ? 'bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-md cursor-pointer'
            : 'hover:bg-gray-50'
        }`}
        onClick={() => {
          if (hasEvents && onEventClick) {
            dayEvents.forEach(event => onEventClick(event));
          }
        }}
      >
        <span className={`${compact ? 'text-sm' : 'text-base'} ${isTodayDate ? 'font-bold' : ''}`}>
          {day}
        </span>
        {hasEvents && (
          <div className="flex gap-0.5 mt-1 flex-wrap justify-center px-1">
            {dayEvents.slice(0, compact ? 2 : 3).map((event, idx) => {
              const Icon = eventIcons[event.type];
              return (
                <Icon
                  key={idx}
                  size={compact ? 10 : 12}
                  className={`${eventColors[event.type]} ${isTodayDate ? 'text-white' : ''}`}
                  fill="currentColor"
                />
              );
            })}
            {dayEvents.length > (compact ? 2 : 3) && (
              <span className={`text-xs ${isTodayDate ? 'text-white' : 'text-gray-500'}`}>
                +{dayEvents.length - (compact ? 2 : 3)}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden ${compact ? 'p-3' : 'p-4'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-gray-800 ${compact ? 'text-base' : 'text-lg'}`}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div
            key={day}
            className={`text-center text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>

      {/* Legend */}
      {!compact && events.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Event Types:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(eventIcons)
              .filter(([type]) => events.some(e => e.type === type))
              .map(([type, Icon]) => (
                <div key={type} className="flex items-center gap-1">
                  <Icon
                    size={12}
                    className={eventColors[type as keyof typeof eventColors]}
                    fill="currentColor"
                  />
                  <span className="text-xs text-gray-600 capitalize">{type}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
