import React from "react";

export default function NoteCard({ note, title, description, note_date, is_done, onClick }) {

  return (
    <div
      onClick={() => onClick(note)}
      className={`p-4 rounded-2xl shadow-md mb-4 border ${is_done ? "bg-green-100 border-green-400" : "bg-white"}`}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
      <div className="text-sm text-gray-500 mt-2">
        Дата: {new Date(note_date).toLocaleDateString()}
      </div>
      {is_done && (
        <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
          Выполнено
        </span>
      )}
    </div>
  );
}
