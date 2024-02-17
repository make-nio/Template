# Estructura del Proyecto

Este documento describe la estructura de directorios del proyecto Template, proporcionando una visión general de la organización del código y la ubicación de archivos y carpetas importantes.

## Raíz del Proyecto

- `docker-compose.yml`: Contiene la configuración para Docker Compose, que facilita la creación y gestión de contenedores Docker.
- `Dockerfile`: Script de configuración utilizado para crear una imagen Docker para el proyecto.
- `package.json`: Archivo de configuración para NPM que especifica las dependencias del proyecto y los scripts disponibles.
- `tsconfig.json`: Configuración para el compilador de TypeScript.
- `webpack.config.js`: Configuración para Webpack, que se utiliza para compilar y empaquetar recursos de front-end.

## Directorio `/docs`

- Contiene la documentación del proyecto en formato Markdown, incluyendo este archivo.

## Directorio `/public`

- Almacena archivos estáticos como hojas de estilo CSS, JavaScript y fuentes, que son servidos directamente al navegador.

## Directorio `/src`

- Contiene el código fuente del proyecto.

### Subdirectorios de `/src`

- `/config`: Configuraciones del proyecto, como la conexión a bases de datos y la inicialización de WebSockets.
- `/controllers`: Controladores que manejan la lógica de solicitud-respuesta para las rutas de la aplicación.
- `/middlewares`: Funciones de middleware de Express que procesan las solicitudes antes de llegar a los controladores.
- `/models`: Modelos de Sequelize que representan tablas en la base de datos.
- `/routes`: Define las rutas HTTP del servidor y las asocia con sus controladores correspondientes.
- `/services`: Servicios que contienen la lógica de negocio y la lógica para interactuar con bases de datos y otros servicios.
- `/views`: Plantillas de Nunjucks que se utilizan para generar el HTML enviado al cliente.

## Archivos de Configuración

- `.env`: Un archivo de ejemplo que muestra cómo configurar las variables de entorno.
- `.eslintrc.json`: Configuración para ESLint, una herramienta de análisis de código estático para identificar patrones problemáticos.
- `.gitignore`: Especifica los archivos y directorios que Git deberá ignorar.

## Directorio `/.github/workflows`

- Contiene los archivos de configuración de GitHub Actions para la integración y entrega continuas (CI/CD).

## Arbol de Directorios

```
└── 📁Template
    └── .env
    └── .env.example
    └── .eslintrc.json
    └── 📁.github
        └── 📁workflows
            └── node.js.yml
    └── .gitignore
    └── docker-compose.yml
    └── Dockerfile
    └── 📁docs
        └── Estructura_del_proyecto.md
        └── Instalacion_y_configuracion.md
        └── Introduccion.md
        └── Seguridad_y_Rendimiento.md
        └── Uso_del_Template.md
    └── package-lock.json
    └── package.json
    └── 📁public
        └── 📁css
            └── main.css
        └── 📁js
            └── 2eb7b3ef25042305f3ff.ttf
            └── 3f9b34bb47c232621b2b.ttf
            └── 45a265d0f07b31cde85f.ttf
            └── 5b2688feed672622c768.ttf
            └── 6205fd00fb1b573e9f0f.ttf
            └── 8d3cabfc66809162fb4d.woff2
            └── a45ef01cd4a352f3ea26.ttf
            └── adc51aab4d771ab65f81.ttf
            └── b3049b13a93f07e026fc.woff2
            └── bundle.js
            └── e931bc0d14f5bbb1da22.woff2
            └── fb8184add5a3101ad0a3.woff2
            └── ffa45c576a4d482cc80b.ttf
            └── 📁fonts
                └── fa-brands-400.ttf
                └── fa-regular-400.ttf
                └── fa-solid-900.ttf
                └── fa-v4compatibility.ttf
    └── README.md
    └── 📁src
        └── 📁config
            └── connection.ts
            └── redisConfig.ts
            └── websocketService.ts
        └── 📁controllers
            └── apiController.ts
            └── apiLoginController.ts
            └── apiNotificacionesController.ts
            └── apiRedisController.ts
            └── homeController.ts
        └── 📁helpers
            └── callApi.ts
            └── errorManager.ts
            └── redisQueue.ts
            └── showToast.ts
        └── index.ts
        └── localhost.pfx
        └── 📁middlewares
            └── authMiddleware.ts
        └── 📁public
            └── 📁css
                └── bulmaswatch.min.css
                └── custom.scss
                └── 📁template
                    └── dataTables.scss
                    └── layout.scss
                    └── login.scss
            └── 📁js
                └── 📁functions
                    └── datatableFunctions.ts
                    └── loginFunctions.ts
                    └── menuFunctions.ts
                    └── webSocketFunctions.ts
                └── login.ts
                └── main.ts
                └── menu.ts
                └── webSocket.ts
        └── 📁routes
            └── apiLoginRoutes.ts
            └── apiNotificacionesRoutes.ts
            └── apiRedisRoutes.ts
            └── apiRoutes.ts
            └── frontendRoutes.ts
            └── index.ts
        └── 📁schema
            └── schemaDba.ts
        └── 📁services
            └── 📁backend
                └── beAuthServices.ts
                └── beRedisServices.ts
            └── 📁frontend
                └── feMenuServices.ts
        └── types.d.ts
        └── 📁views
            └── 📁commons
                └── layout.html
                └── menu.html
            └── 📁generic
                └── datatables.html
            └── index.html
            └── login.html
    └── tsconfig.json
    └── webpack.config.js
```