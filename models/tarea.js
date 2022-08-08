const { v4: uuidv4 } = require('uuid');// uuidv4 es una funcion que genera un id unico

class Tarea{
 
    id = ' ';
    descripcion = ' ';
    completadaEn = null;

    constructor(descripcion){
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadaEn = null;
    }
}


module.exports =  Tarea ;