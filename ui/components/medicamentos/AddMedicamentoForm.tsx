import React, { useState } from "react";
import { createMedicamento } from "./api";

export const AddMedicamentoForm = ({ onMedicamentoAdded }: any) => {
  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    nombre: "",
    cantidad: 1,
    descripcion: "",
    fechaCaducidad: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMedicamento.nombre.trim() || nuevoMedicamento.cantidad <= 0 || !nuevoMedicamento.fechaCaducidad.trim()) {
      alert("Nombre, cantidad positiva y fecha de caducidad son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await createMedicamento(nuevoMedicamento);
      onMedicamentoAdded();
      setNuevoMedicamento({
        nombre: "",
        cantidad: 1,
        descripcion: "",
        fechaCaducidad: "",
      });
      alert("✅ Medicamento agregado con éxito.");
    } catch (error) {
      console.error(error);
      alert("❌ Error al agregar el medicamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto">
      <h2
        className="text-2xl font-semibold mb-6 text-green-600 cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "▼" : "▶"} Agregar Medicamento
      </h2>
      {isVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-green-600">Nombre</label>
            <input
              type="text"
              value={nuevoMedicamento.nombre}
              onChange={(e) =>
                setNuevoMedicamento({ ...nuevoMedicamento, nombre: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-green-600">Cantidad</label>
            <input
              type="number"
              value={nuevoMedicamento.cantidad}
              onChange={(e) =>
                setNuevoMedicamento({ ...nuevoMedicamento, cantidad: Number(e.target.value) })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-green-600">Fecha de Caducidad</label>
            <input
              type="date"
              value={nuevoMedicamento.fechaCaducidad}
              onChange={(e) =>
                setNuevoMedicamento({ ...nuevoMedicamento, fechaCaducidad: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-green-600">Descripción</label>
            <textarea
              value={nuevoMedicamento.descripcion}
              onChange={(e) =>
                setNuevoMedicamento({ ...nuevoMedicamento, descripcion: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Agregar Medicamento"}
          </button>
        </form>
      )}
    </div>
  );
};