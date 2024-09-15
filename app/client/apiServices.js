// apiService.js
const datos = {
  data: [
    {
      id: 1,
      valor: true,
      sector_de_fuga: 5,
      estatus: "no revisado",
    },
    {
      id: 2,
      valor: false,
      sector_de_fuga: 12,
      estatus: "asignado",
    },
    {
      id: 3,
      valor: true,
      sector_de_fuga: 8,
      estatus: "cerrado",
    },
    {
      id: 4,
      valor: false,
      sector_de_fuga: 25,
      estatus: "no revisado",
    },
    {
      id: 5,
      valor: true,
      sector_de_fuga: 19,
      estatus: "asignado",
    },
    {
      id: 6,
      valor: false,
      sector_de_fuga: 7,
      estatus: "cerrado",
    },
    {
      id: 7,
      valor: true,
      sector_de_fuga: 14,
      estatus: "no revisado",
    },
    {
      id: 8,
      valor: false,
      sector_de_fuga: 21,
      estatus: "asignado",
    },
    {
      id: 9,
      valor: true,
      sector_de_fuga: 3,
      estatus: "cerrado",
    },
    {
      id: 10,
      valor: false,
      sector_de_fuga: 28,
      estatus: "no revisado",
    },
    {
      id: 11,
      valor: true,
      sector_de_fuga: 15,
      estatus: "asignado",
    },
    {
      id: 12,
      valor: false,
      sector_de_fuga: 4,
      estatus: "cerrado",
    },
    {
      id: 13,
      valor: true,
      sector_de_fuga: 16,
      estatus: "no revisado",
    },
    {
      id: 14,
      valor: false,
      sector_de_fuga: 30,
      estatus: "asignado",
    },
    {
      id: 15,
      valor: true,
      sector_de_fuga: 9,
      estatus: "cerrado",
    },
    {
      id: 16,
      valor: false,
      sector_de_fuga: 18,
      estatus: "no revisado",
    },
    {
      id: 17,
      valor: true,
      sector_de_fuga: 11,
      estatus: "asignado",
    },
    {
      id: 18,
      valor: false,
      sector_de_fuga: 6,
      estatus: "cerrado",
    },
    {
      id: 19,
      valor: true,
      sector_de_fuga: 2,
      estatus: "no revisado",
    },
    {
      id: 20,
      valor: false,
      sector_de_fuga: 27,
      estatus: "asignado",
    },
  ],
  //   status: 200,
  //   message: "Data fetched successfully",
};

export async function obtenerDatosAPI() {
  return datos.data;
}
