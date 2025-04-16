import React from "react";

export default function BaseNoteForm({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">Название</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1 font-medium">Описание</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="note_date" className="block mb-1 font-medium">Дата</label>
        <input
          type="date"
          id="note_date"
          value={formData.note_date}
          onChange={(e) => setFormData({ ...formData, note_date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
    </div>
  );
}
