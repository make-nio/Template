import { Request, Response, NextFunction } from 'express';

const errorFrontMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error capturado por feMiddleware: ',err); // Loguear el error para referencia.

  const statusCode = err.response?.status || err.statusCode || 500;
  const isAjaxRequest = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
  console.log('Es una respuesta AJAX: ', isAjaxRequest);
  if (isAjaxRequest) {
    // Si la solicitud es AJAX, envía una respuesta JSON con el código de estado y mensaje de error.
    res.status(statusCode).json({
      error: true,
      message: 'Se ha producido un error en la solicitud AJAX.',
      statusCode,
      ...(statusCode === 401 || statusCode === 403) && {redirectUrl: '/login'},
      ...(statusCode === 404) && {redirectUrl: '/'},
    });
  } else {
    // Para solicitudes no AJAX, maneja la redirección o renderización basada en el código de estado.
    if (statusCode === 401 || statusCode === 403) {
      res.redirect('/login');
    } else if (statusCode === 404) {
      res.redirect('/');
    } else {
      res.status(statusCode).render('error', {
        title: 'Error',
        message: 'Lo sentimos, ha ocurrido un error inesperado.'
      });
    }
  }
};

export default errorFrontMiddleware;
