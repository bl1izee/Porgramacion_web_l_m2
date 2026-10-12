import * as logic from "./logica.ts";

// Aseguramos que el elemento existe con el !
const question_box = document.querySelector("#question")!;

// La función debe ser 'async' para poder usar 'await'
async function newQuestion() {
    let texto:string = "";
    try {
        // Esperamos a que se resuelva la promesa de la API
        // El texto esta en formato HTML, no usare decodeHTML por que hace uso por detrás de innerHTML lo cual me hace vulnerable a XSS injection
        texto = await logic.getQuestion();
    } catch (error: unknown) {
        texto = "Error al cargar pregunta desde la API"
    } finally {question_box.textContent = texto}
}

await newQuestion();