import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { fetchNotes, completeNote, uncompletedNote, createNote, deleteNote, updateNote } from "../api/notes";
import CreateNoteModal from "../components/modals/CreateNoteModal";
import EditNoteModal from "../components/modals/EditNoteModal";


const normalizeNote = (note) => ({
  ...note,
  note_date: new Date(note.note_date),
});

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      const normalizedNotes = data.map(normalizeNote);
      setNotes(normalizedNotes);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteNote = async (noteId) => {
    try {
      const updatedNote = await completeNote(noteId);
      const normalized = normalizeNote(updatedNote);
      setNotes((prev) =>
        prev.map((note) => (note.id === noteId ? normalized : note))
      );
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    }
  };

  const handleUncompletedNote = async (noteId) => {
    try {
      const updatedNote = await uncompletedNote(noteId);
      const normalized = normalizeNote(updatedNote);
      setNotes((prev) =>
        prev.map((note) => (note.id === noteId ? normalized : note))
      );
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const newNote = await createNote(note);
      setNotes((prev) => [normalizeNote(newNote), ...prev]);
      setCreateModalOpen(false);
    } catch (err) {
      console.error("Ошибка при добавлении:", err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const handleEditNote = async (updatedNote) => {
    try {
      const updated = await updateNote(updatedNote); // Получаем обновленную заметку с сервера
      const normalized = normalizeNote(updated); // Нормализуем данные
      setNotes((prev) =>
        prev.map((note) => (note.id === updated.id ? normalized : note))
      );
      setEditModalOpen(false);
      setEditingNote(null);
    } catch (err) {
      console.error("Ошибка при редактировании заметки:", err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Мой Ежедневник</h1>
      <button
        title="Создать запись"
        aria-label="Создать запись"
        onClick={() => setCreateModalOpen(true)}
        className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl mb-4"
      >
        ➕ Новая запись
      </button>
      {loading ? (
        <p className="text-center text-gray-600">Загрузка...</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="relative cursor-pointer hover:shadow-lg transition-shadow duration-200">
            <NoteCard {...note}
              onClick={() => {
                setEditingNote(note);
                setEditModalOpen(true);
              }}
            />
            <div
              className="absolute top-4 right-4 flex flex-col space-y-3"
            >
              {/* Верхняя группа: Удалить и Выполнить */}
              <div className="flex space-x-2 ml-auto">
                <button
                  title="Удалить запись"
                  aria-label="Удалить запись"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id)
                  }}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
                >
                  🗑 Удалить
                </button>
                {note.is_done ? (
                  <button
                    title="Пометить запись невыполненной"
                    aria-label="Пометить запись невыполненной"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUncompletedNote(note.id)
                    }}
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl"
                  >
                    ↩️ Не выполнено
                  </button>
                ) : (
                  <button
                    title="Пометить запись выполненной"
                    aria-label="Пометить запись выполненной"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompleteNote(note.id)
                    }}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl"
                  >
                    ✅ Выполнить
                  </button>
                )}
              </div>

              {/* Нижняя кнопка: Редактировать */}
              <div className="ml-auto">
                <button
                  title="Редактировать запись"
                  aria-label="Редактировать запись"
                  onClick={() => {
                    setEditingNote(note);
                    setEditModalOpen(true);
                  }}
                  className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl"
                >
                  ✏️ Редактировать
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAdd={handleAddNote}
      />
    <EditNoteModal
      isOpen={isEditModalOpen}
      onClose={() => {
        setEditModalOpen(false);
        setEditingNote(null);
      }}
      note={editingNote}
      onSubmit={handleEditNote}
    />
    </div>
  );
}
