// Creamos un error que extienda de la clase Error por si la API falla
export class ErrorQuestion extends Error {
  constructor() {
    super("Error al obtener una petición a la API");
    this.name = "ErrorQuestion";
  }
}

// Interfaces con el tipo del objeto/JSON que obtendremos de la API
interface response {
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

// Variable que guarda la pregunta inicializado con la interfaz vacía
let data: response = {
    response_code: 0,
    results: []
};

// Función que obtiene una nueva pregunta de la API
export async function newQuestion() {
    const respuesta = await fetch('https://opentdb.com/api.php?amount=1&type=boolean&difficulty=easy');
    if (!respuesta.ok) throw new ErrorQuestion();
    data = await respuesta.json();
}

// Función que devuelve la pregunta del JSON
export async function getQuestion(): Promise<string> {
    await newQuestion();
    return data.results[0].question;
}

// Función que devuelve la respuesta del JSON
export async function getAnswer(): Promise<string> {
    return data.results[0].correct_answer;
}

// Función que devuelve la categoría del JSON
export async function getCategory(): Promise<string> {
    return data.results[0].category;
}

// Función que devuelve la dificultad del JSON
export async function getDifficulty(): Promise<string> {
    return data.results[0].difficulty;
}