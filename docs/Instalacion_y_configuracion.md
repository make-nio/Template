# Instalación y Configuración

Este documento proporciona instrucciones detalladas sobre cómo instalar y configurar el template para su uso.

## Requisitos del Sistema

- **Node.js**: Versión 12.0 o superior
- **NPM**: Versión 6.0 o superior
- **Redis**: Versión 5.0 o superior (necesario para la gestión de sesiones y caché)
- **Docker**: Versión 19.03 o superior (opcional, utilizado para contenedores y despliegues)

## Instalación

1. Clonar el Repositorio:
   ```bash
   git clone https://github.com/make-nio/Template.git
   ```

2. Instalar Dependencias:   
    ```bash
    cd Template
    npm install
    ```

3. Configurar Variables de Entorno:

Copiar el archivo .env.example a .env y modificar las variables según sea necesario.

4. Configuración de Base de Datos y Redis:

Es necesario introducir las credenciales en el .env tanto para Redis como para la Base de datos SQL, por defecto el sequelize esta configurado para SQL Server, pero puede ser utilizado con cualquier base de datos que soporte sequelize.

5. Iniciar el Servidor de Desarrollo:

    ```bash
    npm run dev
    ```
6. Acceso al Template:

Finalmente, una vez que se compila y ejecuta el servidor, abrir http://localhost:3000 en un navegador.

