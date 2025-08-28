import React from "react";

export const MiembrosTable = ({ beneficiaries }: any) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4 text-pink-600">Miembros</h2>
    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-pink-100">
          <tr>
            <th className="p-3 border text-pink-600">Nombre</th>
            <th className="p-3 border text-pink-600">Fecha de Registro</th>
            <th className="p-3 border text-pink-600">Teléfono</th>
            <th className="p-3 border text-pink-600">Correo Electrónico</th>
            <th className="p-3 border text-pink-600">Dirección</th>
            <th className="p-3 border text-pink-600">Documentos</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((b: any) => (
            <tr key={b.id} className="hover:bg-pink-50">
              <td className="p-3 border">{b.nombre}</td>
              <td className="p-3 border">{b.fecha_registro}</td>
              <td className="p-3 border">{b.telefono}</td>
              <td className="p-3 border">{b.correo_electronico || "N/A"}</td>
              <td className="p-3 border">{b.direccion || "N/A"}</td>
              <td className="p-3 border">
                {b.documentos?.length ? (
                  b.documentos.map((doc: any) => (
                    <div key={doc.id}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.name}
                      </a>
                    </div>
                  ))
                ) : (
                  <em>No documents</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);