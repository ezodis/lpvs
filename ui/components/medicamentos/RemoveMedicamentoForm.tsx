import React, { useState } from "react";

export const RemoveMedicamentoForm = ({ medicamentos, onRemove }: any) => {
  const [registro, setRegistro] = useState({
    medicamentoId: "",
    fechaCaducidad: "",
  });
  const [fechasCaducidad, setFechasCaducidad] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registro.medicamentoId || !registro.fechaCaducidad) {
      alert("Selecciona un medicamento y una fecha de caducidad para remover.");
      return;
    }
    onRemove(registro.medicamentoId, registro.fechaCaducidad);
    setRegistro({ medicamentoId: "", fechaCaducidad: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto mt-8">
      <h2
        className="text-2xl font-semibold mb-6 text-red-600 cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "▼" : "▶"} Remover Medicamento
      </h2>
      {isVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-red-600">Medicamento</label>
            <select
              value={registro.medicamentoId}
              onChange={(e) => {
                const selectedMedicamento = medicamentos.find(
                  (med: any) => med.id === e.target.value
                );
                setRegistro({ ...registro, medicamentoId: e.target.value });
                setFechasCaducidad(
                  selectedMedicamento ? selectedMedicamento.fechasCaducidad : []
                );
              }}
              className="w-full p-3 border rounded-lg focus:outline-red-500"
              required
            >
              <option value="">Selecciona un medicamento</option>
              {medicamentos.map((med: any) => (
                <option key={med.id} value={med.id}>
                  {med.nombre}
                </option>
              ))}
            </select>
          </div>
          {fechasCaducidad.length > 0 && (
            <div>
              <label className="block mb-2 text-red-600">Fecha de Caducidad</label>
              <select
                value={registro.fechaCaducidad}
                onChange={(e) =>
                  setRegistro({ ...registro, fechaCaducidad: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-red-500"
                required
              >
                <option value="">Selecciona una fecha</option>
                {fechasCaducidad.map((fecha: string, index: number) => (
                  <option key={index} value={fecha}>
                    {fecha}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Remover Medicamento
          </button>
        </form>
      )}
    </div>
  );
};