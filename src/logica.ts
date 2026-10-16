import type { Pregunta } from "./types";

let numeroPregunta = 0;

export function preguntaActual(preguntas: Pregunta[]): Pregunta | undefined {
    return preguntas[numeroPregunta];
}

export function comprobarRespuesta(pregunta: Pregunta, respuestaUsuario: boolean): boolean {
    const correcta = pregunta.correcta === respuestaUsuario;

    return correcta;
}

export function avanzarPregunta(): void {
    numeroPregunta++;
}

export function hayPreguntas(preguntas: Pregunta[]): boolean {
    return numeroPregunta < preguntas.length;
}

export function reiniciarPartida(): void {
    numeroPregunta = 0;
}

export function getNumeroPregunta(): number {
    return numeroPregunta + 1; 
}