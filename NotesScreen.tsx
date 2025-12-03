import { Plus, Pin, Trash2 } from 'lucide-react';
import type { Note } from '../App';

interface NotesScreenProps {
  notes: Note[];
  onAddNote: () => void;
  onTogglePin: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesScreen({ notes, onAddNote, onTogglePin, onDeleteNote }: NotesScreenProps) {
  const pinnedNotes = notes.filter(n => n.pinned);
  const unpinnedNotes = notes.filter(n => !n.pinned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-800 mb-2">Notes</h2>
        <p className="text-gray-500">Quick thoughts and ideas</p>
      </div>

      {/* Add Note Button */}
      <button
        onClick={onAddNote}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
      >
        <Plus size={24} />
        <span className="text-lg">Add New Note</span>
      </button>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h3 className="text-gray-700 mb-3 flex items-center gap-2">
            <Pin size={18} className="text-yellow-600" />
            Pinned
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {pinnedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 shadow-md border-2 border-yellow-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg text-gray-800 flex-1">{note.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onTogglePin(note.id)}
                      className="text-yellow-600 hover:text-yellow-700 p-1"
                    >
                      <Pin size={20} fill="currentColor" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Notes */}
      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && <h3 className="text-gray-700 mb-3">All Notes</h3>}
          <div className="grid grid-cols-1 gap-3">
            {unpinnedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg text-gray-800 flex-1">{note.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onTogglePin(note.id)}
                      className="text-gray-400 hover:text-yellow-600 p-1"
                    >
                      <Pin size={20} />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No notes yet</p>
          <p className="text-gray-400">Create your first note!</p>
        </div>
      )}
    </div>
  );
}
