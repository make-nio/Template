# Uso del Template

Este template incluye un script de automatización en Python que te permite configurar un nuevo proyecto en GitHub utilizando el template como base. A continuación, te proporcionamos instrucciones detalladas sobre cómo utilizar este script.

## Requisitos Previos

Antes de ejecutar el script, necesitarás:

- Python instalado en tu máquina.
- Un token de acceso personal de GitHub con permisos para crear repositorios y manejar secretos.
- Las herramientas de línea de comandos de `git` instaladas en tu sistema.

## Configuración de Variables de Entorno

El script utiliza las siguientes variables de entorno, que deberás configurar antes de su ejecución. Puedes configurarlas en un archivo `.env` en el mismo directorio que el script:

- `GITHUB_USERNAME`: Tu nombre de usuario de GitHub.
- `REPO_NAME`: El nombre que deseas para tu nuevo repositorio.
- `REPO_DESCRIPTION`: Una descripción para tu nuevo repositorio.
- `DOCKER_USER`: Tu nombre de usuario de Docker Hub (si aplica).
- `DOCKER_PASSWORD`: Tu contraseña o token de acceso personal de Docker Hub (si aplica).
- `TEMPLATE_URL`: La URL del template de GitHub que deseas usar como base.
- `LOCAL_PATH`: La ruta local donde deseas clonar el repositorio del template.

Asegúrate de sustituir los valores con tu información personal.

## Ejecución del Script

Con las variables de entorno configuradas, puedes ejecutar el script de la siguiente manera:

```bash
python main.py
```

## El script realizará las siguientes acciones:

- Autenticación en GitHub utilizando tu token de acceso personal.
- Creación de un nuevo repositorio en GitHub con el nombre y descripción proporcionados.
- Configuración de los secretos de Docker en el repositorio de GitHub si se proporcionaron las variables de DOCKER_USER y DOCKER_PASSWORD.
- Clonación del template en la ruta especificada por LOCAL_PATH.
- Modificación del template clonado con tus detalles y empuje de los cambios al nuevo repositorio.

## Después de la Ejecución

Una vez que el script se haya ejecutado correctamente, tendrás un nuevo repositorio en GitHub listo para ser usado. Puedes clonar el repositorio a tu máquina local y comenzar a desarrollar tu proyecto inmediatamente.

## Preguntas Frecuentes

P: ¿Qué pasa si ya tengo un repositorio con el mismo nombre?
R: El script fallará al intentar crear un nuevo repositorio con un nombre que ya existe. Asegúrate de que el nombre del repositorio sea único en tu cuenta de GitHub.

P: ¿Es seguro guardar mi token de acceso personal y contraseña de Docker en el archivo .env?
R: Mientras mantengas el archivo .env fuera de tu repositorio (lo cual se debe hacer, y para eso está listado en .gitignore), es un método seguro. Asegúrate de no subir accidentalmente este archivo a ningún repositorio público.

Este formato asegura que el código y los comandos estén claramente delineados y fácilmente reconocibles por los lectores, lo que facilita el seguimiento de las instrucciones.




