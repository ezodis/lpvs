"use client";

import { useState, useEffect } from "react";
import { fetchMiembros } from "@/components/miembros/api";
import { AddMiembroForm } from "@/components/miembros/AddMiembroForm";
import { MiembrosTable } from "@/components/miembros/MiembrosTable";

export default function Page() {
  const [beneficiaries, setBeneficiaries] = useState([]);

  const fetchBeneficiaries = async () => {
    try {
      const data = await fetchMiembros();
      setBeneficiaries(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load beneficiaries.");
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  return (
    <main
      className="p-6 bg-pink-50 min-h-screen"
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
        <AddMiembroForm onMiembroAdded={fetchBeneficiaries} />
        <MiembrosTable beneficiaries={beneficiaries} />
      </div>
    </main>
  );
}