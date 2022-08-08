const inquirer = require("inquirer");

require("colors");

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================================".blue);
  console.log("           TODO:".green);
  console.log("===========================================\n".blue);

  const preguntas = [
    {
      type: "list",
      name: "opcion",
      message: "¿Que desea hacer?",
      choices: [
        {
          value: "1",
          name: `${"1.".green} Crear una nueva tarea`,
        },
        {
          value: "2",
          name: `${"2.".green} Listar tareas`,
        },
        {
          value: "3",
          name: `${"3.".green} Listar tareas completadas`,
        },
        {
          value: "4",
          name: `${"4.".green} Listar tareas pendientes`,
        },
        {
          value: "5",
          name: `${"5.".green} Completar tarea(s)`,
        },
        {
          value: "6",
          name: `${"6.".green} Eliminar tarea`,
        },
        {
          value: "0",
          name: `${"0.".green} Salir`,
        },
      ], //se pueden mandar como un objeto o como un arreglo de strings
    },
  ];

  const { opcion } = await inquirer.prompt(preguntas); //el inquirer recibe una promesa por esa razon podemos usar el await
  //el inquirer.prompt retorna un objeto por esa razon se desestructura {opcion}

  return opcion;
};

const pausa = async () => {
  const siguiente = [
    {
      type: "input",
      name: "continuar",
      message: `Presione ${"ENTER".green} para continuar\n`,
      // default: "ENTER",
    },
  ];

  console.log("\n");
  const continuar = await inquirer.prompt(siguiente);
  return continuar;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "descripcion",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { descripcion } = await inquirer.prompt(question);
  return descripcion;
};

const listadoTareasBorrar = async (tareas = []) => {
  //prepara un nuevo arreglo con las tareas a borrar estas choices son la que se muetran en el listado del prompt
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
    };
  });

  //agrega una opcion de cancelar al listado, por si el usuario se arrepiente de querer borrar una tarea
  choices.unshift({
    value: "0",
    name: `${"0.".green} Cancelar`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrarr tarea\n",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

//Esta funcion sirve para enviar un mensaje de confirmacion al usuario antes de borrar una tarea
const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

//Esta funcion es para listar la lista de tareas y escoger cuales son las que se marcaran como completadas o desmarvar
const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
      checked: tarea.completadaEn ? true : false,//Este ternario es para que muestre el check en la tarea que esta anteriormente como completada
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione las tareas que desea marcar como completada\n",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
