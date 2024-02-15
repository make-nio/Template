import express from 'express';
import https from 'https'; // Importar módulo https
import http from 'http';
import fs from 'fs'; // Importar módulo fs para leer archivos
import nunjucks from 'nunjucks';
import path from 'path';
import routes from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { initializeWebSocket } from './config/websocketService';
import { Request, Response } from 'express';

const HTTP_PORT = process.env.HTTP_PORT || 3000; // Puerto para HTTP
const HTTPS_PORT = process.env.HTTPS_PORT ||3443; // Puerto para HTTPS, diferente al de HTTP
const app = express();

// Configuración de Nunjucks
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: true
});

app.set('view engine', 'html');

// Utiliza morgan para registrar todas las solicitudes en la consola
app.use(morgan('dev'));

// Configurar body-parser para analizar solicitudes JSON
app.use(bodyParser.json());

app.use(cookieParser());

// Directorio estático para recursos como CSS, JS e imágenes
app.use(express.static(path.join(__dirname, '..', 'public')));

// Uso de rutas
app.use(routes);

// Ruta al archivo .pfx y su contraseña
const pfxFilePath = path.join(__dirname, 'localhost.pfx');
const passphrase = 'tuContraseña'; // Reemplazar con la contraseña real

const httpsOptions = {
  pfx: fs.readFileSync(pfxFilePath),
  passphrase: passphrase,
  rejectUnauthorized: true
};

// Crear servidor HTTPS y servidor HTTP
const httpsServer = https.createServer(httpsOptions, app);

// Inicializar WebSocket en el servidor HTTPS
initializeWebSocket(httpsServer); // Cambio realizado aquí

// El puerto para HTTPS debe ser diferente al del HTTP
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${HTTPS_PORT}`);
});

// Crear un servidor HTTP que redirige a HTTPS
const httpApp = express();
httpApp.use((req: Request, res: Response, next) => {
  if (!req?.secure) {
    const secureUrl = `https://${req?.headers?.host?.replace(`${HTTP_PORT}`, `${HTTPS_PORT}`)}${req.url}`;
    res.redirect(301, secureUrl);
  } else {
    next();
  }
});

const httpServer = http.createServer(httpApp);
httpServer.listen(HTTP_PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${HTTP_PORT} y redirigiendo a HTTPS`);
});