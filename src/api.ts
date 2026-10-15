/* ========== Fichero encargado SOLO de hablar con la API ========== */
import type { response } from "./logica";

// Creamos un error que extienda de la clase Error por si la API falla
export class ErrorQuestion extends Error {
  constructor() {
    super("Error al obtener una petición a la API");
    this.name = "ErrorQuestion";
  }
}

// Función que obtiene una nueva pregunta de la API
export async function newQuestion(): Promise<response>  {
    const respuesta = await fetch('https://opentdb.com/api.php?amount=5&type=boolean&difficulty=easy');
    if (!respuesta.ok) throw new ErrorQuestion();
    return await respuesta.json();
}