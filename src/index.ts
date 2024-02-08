import express from 'express';
import https from 'https'; // Importar módulo https
import fs from 'fs'; // Importar módulo fs para leer archivos
import nunjucks from 'nunjucks';
import path from 'path';
import routes from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { initializeWebSocket } from './config/websocketService';

const PORT = process.env.PORT || 3000;
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
httpsServer.listen(PORT, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${PORT}`);
});
