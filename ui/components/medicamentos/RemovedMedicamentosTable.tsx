import React from "react";

export const RemovedMedicamentosTable = ({ removedMedicamentos }: any) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-red-600">Medicamentos Removidos</h2>
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-red-100">
          <tr>
            <th className="p-3 border text-red-600">Nombre</th>
            <th className="p-3 border text-red-600">Cantidad</th>
            <th className="p-3 border text-red-600">Fecha de Caducidad</th>
            <th className="p-3 border text-red-600">Descripción</th>
            <th className="p-3 border text-red-600">Fecha de Salida</th>
          </tr>
        </thead>
        <tbody>
          {removedMedicamentos.map((med: any, index: number) => (
            <tr key={index} className="hover:bg-red-50">
              <td className="p-3 border">{med.nombre}</td>
              <td className="p-3 border">{med.cantidad}</td>
              <td className="p-3 border">{med.fechaCaducidad}</td>
              <td className="p-3 border">{med.descripcion || "N/A"}</td>
              <td className="p-3 border">{med.removedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);