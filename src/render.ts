import * as logic from "./logica.ts";
import { newQuestion as apiNuewQuestion, getQuestion } from "./api.ts";

// Aseguramos que el elemento existe con el !
const question_box = document.querySelector("#question")!;

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
}

export function fallo(boton_true:Element, boton_false:Element, boton_reiniciar:Element){
    question_box.textContent = "No conseguiste salvarlos, el mal ha ganado!!"
    boton_true.setAttribute("hidden","");
    boton_false.setAttribute("hidden","");
    boton_reiniciar.removeAttribute("hidden");
}

await apiNuewQuestion();
await newQuestion();