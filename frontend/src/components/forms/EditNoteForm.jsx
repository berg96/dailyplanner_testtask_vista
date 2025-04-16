import React, { useState, useEffect } from "react";
import BaseNoteForm from "./BaseNoteForm";

export default function EditNoteForm({ note, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: note.title || "",
    description: note.description || "",
    note_date: note.note_date
      ? new Date(note.note_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    is_done: note.is_done || false,
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        description: note.description || "",
        note_date: note.note_date
          ? new Date(note.note_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        is_done: note.is_done || false,
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: note.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BaseNoteForm
        formData={formData}
        setFormData={setFormData}
        onCancel={onCancel}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_done"
          checked={formData.is_done}
          onChange={(e) =>
            setFormData({ ...formData, is_done: e.target.checked })
          }
          className="form-checkbox"
        />
        <label htmlFor="is_done">Выполнено</label>
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
