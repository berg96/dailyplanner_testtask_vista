import React from "react";
import EditNoteForm from "../forms/EditNoteForm";

export default function EditNoteModal({ isOpen, onClose, note, onSubmit }) {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Редактировать запись</h2>
        <EditNoteForm note={note} onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>
  );
}
