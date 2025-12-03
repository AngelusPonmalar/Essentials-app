import { Cake, Heart, Gift, PartyPopper, Star, Coffee, Music, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import type { CalendarEvent } from './Calendar';

interface UpcomingEventsProps {
  events: CalendarEvent[];
  maxEvents?: number;
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
  birthday: { bg: 'from-pink-400 to-pink-500', text: 'text-pink-600' },
  anniversary: { bg: 'from-red-400 to-red-500', text: 'text-red-600' },
  gift: { bg: 'from-purple-400 to-purple-500', text: 'text-purple-600' },
  party: { bg: 'from-yellow-400 to-yellow-500', text: 'text-yellow-600' },
  special: { bg: 'from-blue-400 to-blue-500', text: 'text-blue-600' },
  coffee: { bg: 'from-orange-400 to-orange-500', text: 'text-orange-600' },
  music: { bg: 'from-indigo-400 to-indigo-500', text: 'text-indigo-600' },
  other: { bg: 'from-green-400 to-green-500', text: 'text-green-600' },
};

export function UpcomingEvents({ events, maxEvents = 5 }: UpcomingEventsProps) {
  const now = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, maxEvents);

  const formatDate = (date: Date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (eventDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntil <= 7) {
        return `In ${daysUntil} days`;
      }
      return eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (upcomingEvents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <CalendarIcon size={32} className="mx-auto mb-2 opacity-50" />
        <p>No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {upcomingEvents.map((event) => {
        const Icon = eventIcons[event.type];
        const colors = eventColors[event.type];
        
        return (
          <div
            key={event.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-br ${colors.bg} p-3 rounded-xl flex-shrink-0`}>
                <Icon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800">{event.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`${colors.text} text-sm capitalize`}>{event.type}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{formatDate(event.date)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
