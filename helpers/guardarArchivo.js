const fs = require("fs");

const archivo = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  //comprobacion de si el archivo NO existe con el metodo existsSync
  if (!fs.existsSync(archivo)) {
    return null;
  }
  const info = fs.readFileSync(archivo, "utf8"); //para leer el archivo se usa readFileSync
  const data = JSON.parse(info); //para parsear el archivo se usa JSON.parse y convertirlo en un objeto
  console.log(data);
  return data;
};

module.exports = { guardarDB, leerDB };
