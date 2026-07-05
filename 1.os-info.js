// Native Modules
const os = require('node:os');

console.log('Información del sistema operativo:');

console.log('Nombre del sistem operativo: ', os.platform());
console.log('Versión del sistema operativo: ', os.release());
console.log('Arquitectura: ', os.arch());
console.log('Memoria total: ', os.totalmem());
console.log('Memoria libre: ', os.freemem());
console.log('Tiempo de actividad del sistema (en segundos): ', os.uptime());