import React from "react";

export const MedicamentosTable = ({ medicamentos, onRemove }: any) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-green-600">Medicamentos Disponibles</h2>
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-green-100">
          <tr>
            <th className="p-3 border text-green-600">Nombre</th>
            <th className="p-3 border text-green-600">Cantidad</th>
            <th className="p-3 border text-green-600">Fecha de Caducidad</th>
            <th className="p-3 border text-green-600">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med: any) => (
            <tr key={med.id} className="hover:bg-green-50">
              <td className="p-3 border">{med.nombre}</td>
              <td className="p-3 border">{med.cantidad}</td>
              <td className="p-3 border">{med.fechaCaducidad}</td>
              <td className="p-3 border">{med.descripcion || "N/A"}</td>
              <td className="p-3 border">
                <button
                  onClick={() => onRemove(med.id)}
                  className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);