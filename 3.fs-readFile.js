const fs = require('node:fs');

console.log('Leyendo primer archivo.txt');
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
    console.log('Primer archivo:', text);
});

console.log('Hacer cosas mientras lee le archivo');

console.log('Leyendo segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
    console.log('Segundo archivo:', text);
});