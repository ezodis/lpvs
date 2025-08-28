"use client";

import React, { useState } from "react";
import { createMiembro } from "./api";
import { format, addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const AddMiembroForm = ({ onMiembroAdded }: any) => {
  const today = new Date();
  const maxDate = addDays(today, 29); // 30 days total

  const [newMember, setNewMember] = useState({
    nombre: "",
    telefono: "",
    correo_electronico: "",
    direccion: "",
    fecha_registro: today,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setNewMember({ ...newMember, fecha_registro: date });
      setShowCalendar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nombre: newMember.nombre.trim(),
        telefono: newMember.telefono?.trim() || null,
        correo_electronico: newMember.correo_electronico?.trim() || null,
        direccion: newMember.direccion?.trim() || null,
        fecha_nacimiento: null,
        tipo_cancer: null,
        genero: null,
        activa: true,
        documentos: [],
        notas: null,
        fecha_registro: format(newMember.fecha_registro, "yyyy-MM-dd"),
      };

      await createMiembro(payload);
      onMiembroAdded();
      setNewMember({
        nombre: "",
        telefono: "",
        correo_electronico: "",
        direccion: "",
        fecha_registro: today,
      });
      setFile(null);
      alert("✅ Miembro agregado con éxito!");
    } catch (error: any) {
      console.error(error);
      alert(`❌ Error al agregar el miembro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl mx-auto">
      <h2
        className="text-2xl font-semibold mb-6 text-pink-600 cursor-pointer"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "▼" : "▶"} Agregar Miembro
      </h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name / Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-pink-600">Nombre</label>
              <input
                type="text"
                value={newMember.nombre}
                onChange={(e) =>
                  setNewMember({ ...newMember, nombre: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-pink-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-pink-600">Teléfono</label>
              <input
                type="text"
                value={newMember.telefono}
                onChange={(e) =>
                  setNewMember({ ...newMember, telefono: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-pink-500"
              />
            </div>
          </div>

          {/* Email / Address */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-pink-600">Correo Electrónico</label>
              <input
                type="email"
                value={newMember.correo_electronico}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    correo_electronico: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg focus:outline-pink-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-pink-600">Dirección</label>
              <input
                type="text"
                value={newMember.direccion}
                onChange={(e) =>
                  setNewMember({ ...newMember, direccion: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-pink-500"
              />
            </div>
          </div>

          {/* Custom Calendar */}
          <div className="relative">
            <label className="block mb-2 text-pink-600">Fecha de Registro</label>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-3 border rounded-lg focus:outline-pink-500 text-left bg-white hover:bg-pink-100 transition-colors"
            >
              {format(newMember.fecha_registro, "dd/MM/yyyy")}
            </button>
            {showCalendar && (
              <div className="absolute z-50 mt-2 p-2 bg-white rounded-2xl shadow-xl border border-pink-200">
                <DayPicker
                  mode="single"
                  selected={newMember.fecha_registro}
                  onSelect={handleDateSelect}
                  fromDate={today}
                  toDate={maxDate}
                  showOutsideDays={false}
                  className="rdp font-sans text-sm"
                  modifiersClassNames={{
                    selected: "bg-pink-500 text-white rounded-full",
                    today: "bg-pink-100 text-pink-600 font-bold rounded-full",
                  }}
                />
              </div>
            )}
          </div>

          {/* File */}
          <div>
            <label className="block mb-2 text-pink-600">Agregar Documentos</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 border rounded-lg focus:outline-pink-500 text-left bg-white hover:bg-pink-100 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Member"}
          </button>
        </form>
      )}
    </div>
  );
};
