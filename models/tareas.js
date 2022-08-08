require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    //lo siguiente reotrna un objeto de las llaves del objeto listado por eso se puede usar el foreach
    Object.keys(this._listado).forEach((key) => {
      // console.log(key);
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      //si esa tareea existe en el objeto _listado se borra
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tarreas = []) {
    tarreas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion); //llama a la clase tarea para crear una tarea
    this._listado[tarea.id] = tarea; //ingresa la tarea creada en el objeto _listado
  }

  listadoCompleto() {
    // // for (let i = 0; i < this.listadoArr.length; i++) {
    // //   const tarea = this.listadoArr[i];
    // //   console.log(
    // //     `${i + 1}.`.green +
    // //       `${tarea.descripcion} ::` +
    // //       `Completada`.green +
    // //       `|` +
    // //       `Pendiente`.red
    // //   );
    // // }

    // Lista las tareas junto con el estdo de cada una
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const idx = `${index + 1}.`.green;
      const { descripcion, completadaEn } = tarea;
      const estado = completadaEn ? `Completada`.green : `Pendiente`.red;

      console.log(`${idx} ${descripcion} :: ${estado}`);
    });
  }

  // lista las tareas por completadas y pendientes
  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { descripcion, completadaEn } = tarea;
      const estado = completadaEn ? `Completada`.green : `Pendiente`.red;
      if (completadas) {
        //muestra las tareas que estan completadas
        if (completadaEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${descripcion} :: ${completadaEn.green}`
          );
        }
      } else {
        //muestra las tareas que estan pendientes
        if (!completadaEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${descripcion} :: ${estado}`);
        }
      }
    });
  }

  //Este metodo sirve para marcar y desmarcar una tarea como completada o pendiente (hacer el cambio de estado)
  toggleCompletada(ids = []) {//ar7eglo de ids
    ids.forEach((id) => {
      const tarea = this._listado[id];
      //si la tarea viene en el arreglo de ids se marca como completada agregandole a su propiedad completadaEn la fecha actual
      if (!tarea.completadaEn) {
        tarea.completadaEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      //si la tarea no esta en el array de ids se le pone la fecha de completada en null, es decir esto le quita el completadao a la tarea antes marcada
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadaEn = null;
      }
    });
  }
}
module.exports = Tareas;
