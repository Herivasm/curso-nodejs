const fs = require('node:fs/promises');
const path = require('node:path');
const picocolors = require('picocolors');

const folder = process.argv[2] ?? '.';

let files

async function ls(directory) {
    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(picocolors.red(`No se pudo leer el directorio: ${folder}`));
        process.exit(1);
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats

        try {
            stats = await fs.stat(filePath);
        } catch {
            console.error(picocolors.red(`No se pudo obtener información del archivo: ${filePath}`));
            process.exit(1);
        }

        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fileSize = stats.size.toString();
        const fileModified = stats.mtime.toLocaleString();

        return `${fileType} ${picocolors.cyan(file.padEnd(20))} ${picocolors.yellow(fileSize.padStart(10))} ${picocolors.green(fileModified)}`;
    })

    const filesInfo = await Promise.all(filesPromises);

    filesInfo.forEach(fileInfo => console.log(fileInfo));
}

ls(folder)