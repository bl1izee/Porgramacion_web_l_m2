import * as api from "./api";
import * as logica from "./logica";
import * as render from "./render";
import type { Pregunta } from "./types";

const botonTrue = document.querySelector("#true")!;
const botonFalse = document.querySelector("#false")!;
const botonReiniciar = document.querySelector("#reiniciar")!;
const statsBox = document.querySelector("#stats")!;

let preguntas: Pregunta[] = [];

async function iniciar(): Promise<void> {
    // Reiniciamos los valores de la página
    render.mostrarCarga();

    try {
        // La API devuelve preguntas transformadas y validadas.
        preguntas = await api.newQuestion();

        // Mostramos la pantalla de cargando API
        logica.reiniciarPartida();

        // Pedimos la pregunta
        const pregunta = logica.preguntaActual(preguntas);

        // Mostramos la pregunta
        render.mostrarPregunta(pregunta!, logica.getNumeroPregunta(), preguntas.length + 1);
        
        // Mostramos los botones de True|False y la caja de stats
        statsBox.removeAttribute("hidden");
        botonTrue.removeAttribute("hidden");
        botonFalse.removeAttribute("hidden");
    } catch (error: unknown) {
        console.error("Error al iniciar el juego:", error);

        // Mostramos el mensaje del error
        const mensaje = error instanceof Error ? error.message : "Ha ocurrido un error inesperado.";
        render.mostrarError(`No se ha podido iniciar el juego. ${mensaje}`);
    }
}

function responder(respuestaUsuario: boolean): void {
    const pregunta:Pregunta = logica.preguntaActual(preguntas)!;

    // Deshabilitamos ambos botones mientras procesamos la respuesta.
    botonTrue.setAttribute("disabled","");
    botonFalse.setAttribute("disabled","");

    const correcta = logica.comprobarRespuesta(pregunta, respuestaUsuario);

    if (!correcta) {
        render.mostrarDerrota();
        return;
    }

    logica.avanzarPregunta();

    if (!logica.hayPreguntas(preguntas)) {
        render.mostrarVictoria();
        return;
    }

    const siguiente = logica.preguntaActual(preguntas);

    render.mostrarPregunta(
        siguiente!,
        logica.getNumeroPregunta(),
        preguntas.length
    );

    // Reabilitamos ambos botones
    botonTrue.removeAttribute("disabled");
    botonFalse.removeAttribute("disabled");
}

botonTrue.addEventListener("click", () => responder(true));
botonFalse.addEventListener("click", () => responder(false));

// Reiniciamos el juego volviendolo a iniciar
botonReiniciar.addEventListener("click", () => iniciar());

// Arranque protegido dentro de iniciar()
iniciar();