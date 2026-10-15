import { stats as stats_storage } from "./logica";

// Aseguramos que el elemento existe con el !
const question_box = document.querySelector("#question")!;
const question_number_text = document.querySelector("#question_number_text")!;

export function newQuestion(question: string) {
    question_box.textContent = question
}

export function acierto(numero:string){
    document.querySelector("#question_number")!.textContent = numero;
}

export function fallo(boton_true:Element, boton_false:Element, boton_reiniciar:Element){
    question_box.textContent = "No conseguiste salvarlos, el mal ha ganado!!"
    question_number_text.remove()
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

    let stats_user = stats_storage();
    const stats = document.querySelector("#stats")
    stats!.textContent = `Aciertos: ${stats_user.tot_acert} | Fallos: ${stats_user.tot_falla} | Media: ${stats_user.media}`;
}
