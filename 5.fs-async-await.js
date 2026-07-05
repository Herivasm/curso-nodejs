const fs = require('node:fs/promises');

// IIFE - Immediately Invoked Function Expression
(async () => {
    console.log('Leyendo primer archivo.txt');
    const text = await fs.readFile('./archivo.txt', 'utf-8');
    console.log('Primer archivo:', text);

    console.log('Hacer cosas mientras lee le archivo');

    console.log('Leyendo segundo archivo');
    const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
    console.log('Segundo archivo:', text2);
}
)();

