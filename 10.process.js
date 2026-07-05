// Entry arguments
console.log(process.argv);

// control the process and its exit
process.exit(1)

// handle process events
process.on('exit', () => {
    console.log('Process exit event with code');
});

console.log(process.cwd()); // current working directory 

// platform 
console.log(process.platform); // operating system
console.log(process.env); // environment variables