/* ======== Programa que se encarga de seguir la lógica del programa ======== */
import { victoria, newQuestion } from "./render";

let numero_pregunta = 1;

const boton_true = document.querySelector("#true");
const boton_false = document.querySelector("#false");
const boton_reiniciar = document.querySelector("#reiniciar");

// Interfaz con el tipo del objeto/JSON que obtendremos de la API
export interface response {
  response_code: number;
  results: question[];
}

interface question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export function comprobarVictoria(){
    if(numero_pregunta === 6){
        victoria(boton_true!, boton_false!, boton_reiniciar!);
        return true;
    }
    return false;
}

export function getQuestion(data:response): string {
    return data.results[numero_pregunta-1].question
}

export function getAnswer(data:response): string{
    return data.results[numero_pregunta-1].correct_answer
}

// A parte de incrementar también guardamos el número de aciertos y preguntas que hemos hecho
export function incrementarNumeroPregunta(){
    let tot_acert = localStorage.getItem("tot_acert");
    let tot_preguntas = localStorage.getItem("tot_preguntas");

    if (tot_preguntas === null){
        localStorage.setItem("tot_preguntas", "1");
    }
    else{
        localStorage.setItem("tot_preguntas", String(Number(localStorage.getItem("tot_preguntas")!) + 1));
    }

    if (tot_acert === null){
        localStorage.setItem("tot_acert", "1");
    }
    else{
        localStorage.setItem("tot_acert", String(Number(localStorage.getItem("tot_acert")!) + 1));
    }

    numero_pregunta+=1;
    return numero_pregunta;
}

export function nextQuestion(data:response){
    if (comprobarVictoria()) return;
    newQuestion(getQuestion(data));
}

export function stats(){
    let tot_acert: number = Number(localStorage.getItem("tot_acert")!);
    let tot_preguntas: number = Number(localStorage.getItem("tot_preguntas")!);
    
    let tot_falla: number = tot_preguntas - tot_acert;
    
    return {tot_falla, tot_acert, media: tot_acert / tot_preguntas };
}