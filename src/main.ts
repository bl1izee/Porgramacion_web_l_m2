import * as api from  "./api.ts";
import * as render from "./render.ts";
import * as logica from "./logica.ts";

// Botones del juego
const boton_true = document.querySelector("#true");
const boton_false = document.querySelector("#false");
const boton_reiniciar = document.querySelector("#reiniciar");

// Guadra los datos de la api
let data:logica.response;

// Función recursiva que se vuelve a llamar en caso de que haya saltado el fallo de la API
async function preguntarApi() {
    let data_tmp:logica.response;
    try {
        // Mensaje de espera mientras carga la API
        render.newQuestion("Cunsultando a la API...");

        // Esperamos 2 segundo antes de continuar
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Ahora pedimos los datos a la API
        data_tmp = await api.newQuestion();
    } catch (error: unknown) {
        if (error instanceof api.ErrorQuestion) { // Si el erro es producido por que no carga la API, esperamos 2 segundos y volvemos a crear la consulta
            console.error("Error controlado de la API:", error.message);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return await preguntarApi();
        }
    }

    return data_tmp!;
}

async function iniciar(){
    let texto: string = "";

    // Desabilitamos los botones para que no haya fallo mientras carga la API
    boton_true!.setAttribute("disabled","");
    boton_false!.setAttribute("disabled","");

    // Primero hacemos la consulta a la API
    data = await preguntarApi();
    // Procesamos lo que nos ha devuelto para sacar la pregunta
    texto = logica.getQuestion(data);

    // Imprimimos por pantalla la pregunta
    render.newQuestion(texto);

    // Abilitamos los botones
    boton_true!.removeAttribute("disabled");
    boton_false!.removeAttribute("disabled");
}

// Listeners del juego
boton_true!.addEventListener("click", async () => {
    if(logica.getAnswer(data) === "True"){
        render.acierto(String(logica.incrementarNumeroPregunta()));
        logica.nextQuestion(data);
    }
    else {
        let tot_preguntas = localStorage.getItem("tot_preguntas");

        if (tot_preguntas === null){
            localStorage.setItem("tot_preguntas", "1");
        }
        else{
            localStorage.setItem("tot_preguntas", String(Number(localStorage.getItem("tot_preguntas")!) + 1));
        }
        render.fallo(boton_true!, boton_false!, boton_reiniciar!);
    }
});

boton_false!.addEventListener("click", async () => {
    if(logica.getAnswer(data) === "False"){
        render.acierto(String(logica.incrementarNumeroPregunta()));
        logica.nextQuestion(data);
    }
    else {
        let tot_preguntas = localStorage.getItem("tot_preguntas");

        if (tot_preguntas === null){
            localStorage.setItem("tot_preguntas", "1");
        }
        else{
            localStorage.setItem("tot_preguntas", String(Number(localStorage.getItem("tot_preguntas")!) + 1));
        }

        render.fallo(boton_true!, boton_false!, boton_reiniciar!);
    }
});

boton_reiniciar!.addEventListener("click", () => {location.reload();})

// Función inicial
await iniciar()