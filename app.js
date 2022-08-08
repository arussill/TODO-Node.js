require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

// const { mostrarMenu, pausa } = require("./helpers/mensajes");

console.clear();

const main = async () => {
  console.log("Starting app...".green);

  let opt = "";

  //de manera manual
  //   do {
  //     opt = await mostrarMenu();
  //     await pausa();
  //   } while (opt !== "0"); //hasta que la opcion no sea 0 no se saldra del ciclo

  ////////////////////////////////////////////////////////////////////////////////////

  //Usando inquirer

  const tareas = new Tareas(); //instancia de tareas

  const tareasDB = leerDB(); //lee el archivo data.json

  //verifica si existe el archivo data.json
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB); //si esxite el archivo ingresa los datos del que lee del archivo data.json y los ingresa en el objeto _listado que se encuentra en la clase tareas, para luego cuando se llame la opcion listar tareas se pueda mostrar aquellas que se guardaron en base de datos
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion de la tarea:"); //para poder leer lo que viene de la consola se llama esta funcion leerInput
        tareas.crearTarea(desc); //para crear una tarea se llama a la funcion crearTarea de la clase tareas
        break;

      case "2":
        // console.log(tareas._listado);
        // console.log(tareas.listadoArr);
        tareas.listadoCompleto(); //para listar las tareas se llama a la funcion listadoCompleto de la clase tareas
        break;

      case "3": //Muestra en lista las tareas que estan completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": //Muestra en lista las tareas que estan pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5"://marca las tareas completadas
        const ids = await mostrarListadoCheckList(tareas.listadoArr); 
        tareas.toggleCompletada(ids);
        break;

      case "6": //Borrar tareas
        const id = await listadoTareasBorrar(tareas.listadoArr); //este metodo es el que se encarga de mostrar las tareas que se pueden borrar del inquirer de aqui se seleciona el id a borrar
        if (id !== "0") {
          const ok = await confirmar("¿Esta seguro de borrar la tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log({ id }, "Tarea borrada".red);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr); //con este metodo se persisten los datos de las tareras nuevas creadas en el archivo data.json
    await pausa();
  } while (opt !== "0");
};

main();
