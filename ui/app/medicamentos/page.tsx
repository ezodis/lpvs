"use client";

import { useState, useEffect } from "react";
import { fetchMedicamentos, fetchMiembros } from "@/components/medicamentos/api";
import { AddMedicamentoForm } from "@/components/medicamentos/AddMedicamentoForm";
import { RegistrarEntregaForm } from "@/components/medicamentos/RegistrarEntregaForm";
import { RemoveMedicamentoForm } from "@/components/medicamentos/RemoveMedicamentoForm";
import { MedicamentosTable } from "@/components/medicamentos/MedicamentosTable";
import { RemovedMedicamentosTable } from "@/components/medicamentos/RemovedMedicamentosTable";

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [removedMedicamentos, setRemovedMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      const [medicamentosData, miembrosData] = await Promise.all([
        fetchMedicamentos(),
        fetchMiembros(),
      ]);
      setMedicamentos(medicamentosData);
      setMiembros(miembrosData);
    } catch (error) {
      console.error(error);
      alert("Error al cargar los datos.");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleMedicamentoAdded = () => {
    fetchMedicamentos().then(setMedicamentos).catch(console.error);
  };

  const handleEntregaRegistered = () => {
    fetchMedicamentos().then(setMedicamentos).catch(console.error);
  };

  const handleMedicamentoRemoved = (medicamentoId: string, fechaCaducidad: string) => {
    const medicamento = medicamentos.find((med: any) => med.id === medicamentoId);
    if (!medicamento) return;

    setRemovedMedicamentos((prev) => [
      ...prev,
      { ...medicamento, fechaCaducidad, removedAt: new Date().toLocaleString() },
    ]);
    setMedicamentos((prev) =>
      prev.map((med: any) =>
        med.id === medicamentoId
          ? { ...med, cantidad: med.cantidad - 1 } // Adjust quantity if necessary
          : med
      )
    );
  };

  return (
    <main
      className="p-6 bg-green-50 min-h-screen"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          overflowY: "auto",
          flex: 1,
        }}
      >
        {/* Add Medicamento Form */}
        <AddMedicamentoForm onMedicamentoAdded={handleMedicamentoAdded} />

        {/* Registrar Entrega Form */}
        <RegistrarEntregaForm
          medicamentos={medicamentos}
          miembros={miembros}
          onEntregaRegistered={handleEntregaRegistered}
        />

        {/* Remove Medicamento Form */}
        <RemoveMedicamentoForm
          medicamentos={medicamentos}
          onRemove={handleMedicamentoRemoved}
        />

        {/* Medicamentos Table */}
        <MedicamentosTable
          medicamentos={medicamentos}
          onRemove={handleMedicamentoRemoved}
        />

        {/* Removed Medicamentos Table */}
        <RemovedMedicamentosTable removedMedicamentos={removedMedicamentos} />
      </div>
    </main>
  );
}