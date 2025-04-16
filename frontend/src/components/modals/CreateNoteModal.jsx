import React from "react";
import CreateNoteForm from "../forms/CreateNoteForm";

export default function CreateNoteModal({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Создать запись</h2>
        <CreateNoteForm onAdd={onAdd} onCancel={onClose} />
      </div>
    </div>
  );
}
