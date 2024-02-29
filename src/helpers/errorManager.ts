// src/helpers/errorManager.ts
export class CustomError {
  public message: string;
  public statusCode: number;
  public details?: string;

  constructor(message: string, statusCode: number = 500, details?: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }

  static fromError(error: Error | any): CustomError {
    // Si el error ya es una instancia de CustomError, simplemente devuélvelo.
    if (error instanceof CustomError) {
      return error;
    }

    // Manejo de errores de Axios
    if (error.response) {
      // Aquí se manejan errores que vienen de respuestas HTTP fallidas
      return new CustomError(
        error.response.data?.message || 'Error en la solicitud',
        error.response.status,
        error.response.data?.details
      );
    } else if (error.request) {
      // Error de solicitud de Axios sin respuesta (problema de red o no se pudo establecer conexión)
      return new CustomError('No se pudo establecer conexión con el servidor', 0);
    } else {
      // Otros errores (Errores del lado del cliente o errores no capturados en el servidor)
      return new CustomError(error.message || 'Se produjo un error desconocido', error.statusCode || 0);
    }
  }

  // Método para imprimir el error en la consola
  logError() {
    const { message, statusCode, details } = this;
    console.log({ error: true, message, statusCode, details: details || 'N/A' });
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}
