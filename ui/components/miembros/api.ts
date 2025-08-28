export const fetchMiembros = async () => {
  const response = await fetch("/api/miembros");
  if (!response.ok) throw new Error("Error al cargar los miembros");
  return response.json();
};

export const createMiembro = async (miembro: any) => {
  const response = await fetch("/api/miembros/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(miembro),
  });
  if (!response.ok) throw new Error("Error al agregar el miembro");
};