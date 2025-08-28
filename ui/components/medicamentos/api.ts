export const fetchMedicamentos = async () => {
    const response = await fetch("/api/medicamentos");
    if (!response.ok) throw new Error("Error al cargar los medicamentos");
    return response.json();
  };

  export const fetchMiembros = async () => {
    const response = await fetch("/api/miembros");
    if (!response.ok) throw new Error("Error al cargar los miembros");
    return response.json();
  };

  export const createMedicamento = async (medicamento: any) => {
    const response = await fetch("/api/medicamentos/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicamento),
    });
    if (!response.ok) throw new Error("Error al agregar el medicamento");
  };

  export const registrarEntrega = async (registro: any) => {
    const response = await fetch("/api/medicamentos/entregar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    });
    if (!response.ok) throw new Error("Error al registrar la entrega");
  };