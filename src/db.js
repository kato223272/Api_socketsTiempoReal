const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

console.log("Inicio de la aplicación");
const iniciarBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos", error.message);
  }  
}

iniciarBase();

module.exports = sequelize;