import type { Pregunta, RespuestaAPI } from "./types";

export async function newQuestion(): Promise<Pregunta[]> {
    const respuesta = await fetch("https://opentdb.com/api.php?amount=5&type=boolean");

    if (!respuesta.ok) {
        throw new Error(
            `Error HTTP: ${respuesta.status}`
        );
    }

    const datos: RespuestaAPI = await respuesta.json();

    if (datos.response_code !== 0 || datos.results.length === 0) {
        throw new Error(
            "La API no ha podido proporcionar preguntas."
        );
    }

    console.log(datos)

    // Transformamos el formato de la API al formato de nuestro juego.
    return datos.results.map(pregunta => ({
        texto: pregunta.question,
        correcta: pregunta.correct_answer === "True", // Lo convierte a bool el dato
        categoria: pregunta.category,
        dificultad: pregunta.difficulty
    }));
}