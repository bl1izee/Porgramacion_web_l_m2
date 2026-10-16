// Formato original que devuelve OpenTDB
export interface PreguntaAPI {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface RespuestaAPI {
    response_code: number;
    results: PreguntaAPI[];
}

// Formato interno que utilizará nuestro juego
export interface Pregunta {
    texto: string;
    correcta: boolean;
    categoria: string;
    dificultad: string;
}