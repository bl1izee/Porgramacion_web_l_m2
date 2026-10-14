import * as api from  "./api.ts";
import * as render from "./render.ts";

const boton_true = document.querySelector("#true");
const boton_false = document.querySelector("#false");
const boton_reiniciar = document.querySelector("#reiniciar");

export async function getQuestion(): Promise<string> {
    try {
        return await api.getQuestion();
    } catch (error: unknown) {
        // Comprobamos si es nuestro error personalizado con 'instanceof'
        if (error instanceof api.ErrorQuestion) {
            console.error("Fallo específico de la API:", error.message);
        } else if (error instanceof Error) {
            console.error("Fallo general:", error.message);
        } else {
            console.error("Fallo desconocido:", error);
        }
        throw error;
    }
}

boton_true!.addEventListener("click", async () => {
    if(await api.getAnswer() === "True"){await render.acierto();}
    else {render.fallo(boton_true!, boton_false!, boton_reiniciar!);}
});

boton_false!.addEventListener("click", async () => {
    if(await api.getAnswer() === "False"){await render.acierto();}
    else {render.fallo(boton_true!, boton_false!, boton_reiniciar!);}
});

boton_reiniciar!.addEventListener("click", () => {location.reload();})