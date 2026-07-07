const fs = require('node:fs');

console.log('Leyendo primer archivo.txt');
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log('Primer archivo:', text);

console.log('Hacer cosas mientras lee le archivo');

console.log('Leyendo segundo archivo');
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log('Segundo archivo:', text2);