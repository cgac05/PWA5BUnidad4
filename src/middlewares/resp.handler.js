//MASU: Response Handlers - Middlewares para formatear respuestas estandarizadas

//JAPV: Respuesta exitosa - OK
export const OK = (message, data) => {
  return {
    message: message || 'OK',
    data: data,
    success: true,
    fail: false,
  };
};

//BAFS: Respuesta fallida - FAIL
export const FAIL = (message, data) => {
  return {
    message: message || 'FAIL',
    data: data,
    success: false,
    fail: true,
  };
};
