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
      // Capturar errores específicos (como errores de validación, etc.)
      if (error instanceof CustomError) {
        return error;
      } else if (error?.response && error?.response?.data && error?.response?.data?.message) {
        // Error de respuesta de Axios
        return new CustomError(
          error?.response?.data?.message,
          error?.response?.status,
          error?.response?.data?.details
        );
      } else if (error?.request) {
        // Error de solicitud de Axios sin respuesta
        return new CustomError('No se pudo establecer conexión con el servidor', 0);
      } else {
        // Otros errores (Errores del lado del cliente o errores no capturados en el servidor)
        return new CustomError(error?.message || 'Se produjo un error desconocido', 0);
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
  