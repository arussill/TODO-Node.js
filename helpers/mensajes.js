require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("===========================================".blue);
    console.log("           SELECCIONE UNA OPCION:".green);
    console.log("===========================================\n".blue);

    console.log(` ${"1.".green} Crear Tarea`);
    console.log(` ${"2.".green} Listar Tareas`);
    console.log(` ${"3.".green} Listar Tareas Completadas`);
    console.log(` ${"4.".green} Listar Tareas Pendientes`);
    console.log(` ${"5.".green} Completar Tarea(s)`);
    console.log(` ${"6.".green} Borrar Tareas`);
    console.log(` ${"0.".green} Salir \n`);

    //esto prepara la interfaz para que el usuario pueda ingresar una opcion desde el teclado a la consola
    //es decur crea una instancia de lo que se llama readline
    const readline = require("readline").createInterface({
      //Se crea una interfaz para leer datos
      input: process.stdin, //Se lee desde el teclado lo que el usuario ingrese
      output: process.stdout, //Se imprime en pantalla un mensaje para mostrarle al usuario
    });

    //readline.question para mostrarle al usuario una pregunta al usuario
    //en el callback se recibe la respuesta del usuario
    readline.question("Seleccione  una opcion: ", (opt) => {
      readline.close(); //Se cierra la interfaz porque o sino se queda esperando algo del usuario
      resolve(opt); //Se retorna la opcion que el usuario ingreso
    });
  });
};

//Para pausar la ventana de consola
const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

module.exports = { mostrarMenu, pausa };
