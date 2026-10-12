import * as api from  "./api.ts";

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