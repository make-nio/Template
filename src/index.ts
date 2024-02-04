import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import routes from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import https from 'https'; // Importar módulo https
import fs from 'fs'; // Importar módulo fs para leer archivos
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;
const app = express();
// Configurar body-parser para analizar solicitudes JSON
app.use(bodyParser.json());

app.use(cookieParser());

// Configuración de Nunjucks
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: true
});

app.set('view engine', 'html');

// Utiliza morgan para registrar todas las solicitudes en la consola
app.use(morgan('dev'));

// Directorio estático para recursos como CSS, JS e imágenes
app.use(express.static(path.join(__dirname,'..','public')));

// Uso de rutas
app.use(routes);

// Ruta al archivo .pfx y su contraseña
const pfxFilePath = path.join(__dirname, 'localhost.pfx');
const passphrase = 'tuContraseña'; // Reemplazar con la contraseña real

const httpsOptions = {
  pfx: fs.readFileSync(pfxFilePath),
  passphrase: passphrase,
};

// Crear servidor HTTPS
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${PORT}`);
});
