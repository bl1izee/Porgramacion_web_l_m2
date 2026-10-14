import * as logic from "./logica.ts";
import { newQuestion as apiNuewQuestion, getQuestion } from "./api.ts";

// Aseguramos que el elemento existe con el !
const question_box = document.querySelector("#question")!;
const question_number_text = document.querySelector("#question_number_text")!;

// Closure para incrementa el numero de la pregunta
const incrementarNumero = numero_pregunta();

function numero_pregunta(){
    let numero:number = 1;
    return () => ++numero;
}

// La función debe ser 'async' para poder usar 'await'
export async function newQuestion() {
    let texto:string = "";
    try {
        // Esperamos a que se resuelva la promesa de la API
        // El texto esta en formato HTML, no usare decodeHTML por que hace uso por detrás de innerHTML lo cual me hace vulnerable a XSS injection
        texto = await logic.getQuestion();
    } catch (error: unknown) {
        texto = "Error al cargar pregunta desde la API"
    } finally {
        question_box.textContent = texto
    }
}

export async function acierto(){
    await newQuestion();
    document.querySelector("#question_number")!.textContent = String(incrementarNumero());
    logic.comprobarVictoria();
}

export function fallo(boton_true:Element, boton_false:Element, boton_reiniciar:Element){
    question_box.textContent = "No conseguiste salvarlos, el mal ha ganado!!"
    boton_true.setAttribute("hidden","");
    boton_false.setAttribute("hidden","");
    boton_reiniciar.removeAttribute("hidden");
}

export function victoria(boton_true: Element, boton_false: Element, boton_reiniciar: Element){
    // Llamamos a fallo para que ponga el botón de reiniciar
    fallo(boton_true, boton_false, boton_reiniciar);
    
    // Quitamos el texto de la pregunta por la que vamos
    question_number_text.remove();

    // Cambiamos el texto de la caja de preguntas por victorias
    question_box.textContent = "Has ganado, felicidades! Has derrotado al mal sabio caballero..."
}

await apiNuewQuestion();
await newQuestion();