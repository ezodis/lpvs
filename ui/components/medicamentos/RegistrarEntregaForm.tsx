import React, { useState } from "react";
import Select from "react-select";
import { registrarEntrega } from "./api";

export const RegistrarEntregaForm = ({ medicamentos, miembros, onEntregaRegistered }: any) => {
  const [registro, setRegistro] = useState({
    medicamentoId: "",
    cantidad: 1,
    miembroId: "",
    fecha: "",
    presentacion: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const miembroOptions = miembros.map((miembro: any) => ({
    value: miembro.id,
    label: miembro.nombre,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registro.medicamentoId ||
      registro.cantidad <= 0 ||
      !registro.miembroId ||
      !registro.presentacion.trim()
    ) {
      alert("Todos los campos son obligatorios y la cantidad debe ser positiva.");
      return;
    }

    setLoading(true);
    try {
      await registrarEntrega(registro);
      onEntregaRegistered();
      setRegistro({
        medicamentoId: "",
        cantidad: 1,
        miembroId: "",
        fecha: "",
        presentacion: "",
      });
      alert("✅ Entrega registrada con éxito.");
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar la entrega.");
    } finally {
      setLoading(false);
    }
  };

  const handleMiembroChange = (selectedOption: any) => {
    setRegistro({ ...registro, miembroId: selectedOption ? selectedOption.value : "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto mt-8">
      <h2
        className="text-2xl font-semibold mb-6 text-green-600 cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "▼" : "▶"} Registrar Entrega
      </h2>
      {isVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-green-600">Medicamento</label>
            <select
              value={registro.medicamentoId}
              onChange={(e) =>
                setRegistro({ ...registro, medicamentoId: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            >
              <option value="">Selecciona un medicamento</option>
              {medicamentos.map((med: any) => (
                <option key={med.id} value={med.id}>
                  {med.nombre} (Disponible: {med.cantidad})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-green-600">Cantidad</label>
            <input
              type="number"
              value={registro.cantidad}
              onChange={(e) =>
                setRegistro({ ...registro, cantidad: Number(e.target.value) })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-green-600">Presentación</label>
            <select
              value={registro.presentacion}
              onChange={(e) =>
                setRegistro({ ...registro, presentacion: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            >
              <option value="">Selecciona una presentación</option>
              <option value="blister">Blister</option>
              <option value="pastilla">Pastilla</option>
              <option value="parche">Parche</option>
              <option value="caja">Caja</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-green-600">Miembro</label>
            <Select
              options={miembroOptions}
              onChange={handleMiembroChange}
              value={miembroOptions.find((option) => option.value === registro.miembroId)}
              placeholder="Selecciona un miembro"
              isClearable
              className="w-full"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#d1d5db",
                  "&:hover": { borderColor: "#10b981" },
                }),
              }}
            />
          </div>
          <div>
            <label className="block mb-2 text-green-600">Fecha</label>
            <input
              type="date"
              value={registro.fecha}
              onChange={(e) =>
                setRegistro({ ...registro, fecha: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Registrar Entrega"}
          </button>
        </form>
      )}
    </div>
  );
};