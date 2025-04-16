import React, { useState } from "react";
import BaseNoteForm from "./BaseNoteForm";

export default function CreateNoteForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    note_date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BaseNoteForm formData={formData} setFormData={setFormData} onCancel={onCancel} />

      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Создать
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
