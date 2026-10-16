import type { Pregunta } from "./types";

const questionBox = document.querySelector("#question")!;
const questionNumberText = document.querySelector("#question_number_text")!;
const questionNumber = document.querySelector("#question_number")!;
const statsBox = document.querySelector("#stats")!;
const botonTrue = document.querySelector("#true")!;
const botonFalse = document.querySelector("#false")!;
const botonReiniciar = document.querySelector("#reiniciar")!;

export function mostrarPregunta(pregunta: Pregunta, numero: number, total: number): void {
    questionBox.textContent = pregunta.texto;
    questionNumber.textContent = String(numero);
    questionNumberText.textContent = `${numero}/${total}`;

    statsBox.textContent = `C: ${pregunta.categoria} · D: ${pregunta.dificultad}`;

    botonTrue.removeAttribute("hidden");
    botonFalse.removeAttribute("hidden");
    botonReiniciar.setAttribute("hidden","");

    botonTrue.removeAttribute("disabled");
    botonFalse.removeAttribute("disabled");
}

export function mostrarCarga(): void {
    questionBox.textContent = "Consultando a la API...";
    botonTrue.setAttribute("hidden","");
    botonFalse.setAttribute("hidden","");
    statsBox.setAttribute("hidden","");
}

export function mostrarError(mensaje: string): void {
    questionBox.textContent = mensaje;

    botonTrue.setAttribute("hidden","");
    botonFalse.setAttribute("hidden","");
    statsBox.setAttribute("hidden","");
    botonReiniciar.removeAttribute("hidden");

    botonReiniciar.textContent = "Reintentar";
}

export function mostrarVictoria(): void {
    questionBox.textContent = "¡Has ganado! Has derrotado al mal, sabio caballero.";

    questionNumberText.textContent = "";

    botonTrue.setAttribute("hidden","");
    botonFalse.setAttribute("hidden","");
    botonReiniciar.removeAttribute("hidden");

    botonReiniciar.textContent = "Jugar otra vez";
}

export function mostrarDerrota(): void {
    questionBox.textContent = "No conseguiste salvarlos. ¡El mal ha ganado!";

    questionNumberText.textContent = "";

    botonTrue.setAttribute("hidden","");
    botonFalse.setAttribute("hidden","");
    botonReiniciar.removeAttribute("hidden");

    botonReiniciar.textContent = "Volver a jugar";
}