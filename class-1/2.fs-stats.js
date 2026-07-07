const fs = require('node:fs');

const stats = fs.statSync('./archivo.txt');

console.log(
    stats.isFile() ? 'Es un archivo' : 'No es un archivo',
    stats.isDirectory() ? 'Es un directorio' : 'No es un directorio',
    stats.isSymbolicLink() ? 'Es un enlace simbólico' : 'No es un enlace simbólico',
    stats.size + ' bytes'
); 