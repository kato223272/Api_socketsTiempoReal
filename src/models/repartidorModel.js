
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Repartidor = sequelize.define('Repartidor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50)
    
  },
  direccion: {
    type: DataTypes.STRING(50)
  }
},{
  timestamps:false
});

module.exports = Repartidor;

// const {DataTypes} = require('sequelize')
// const sequelize = require('../db')

// const Repartidor= sequelize.define('Repartidor',{
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         primaryKey:true,
//     },
//     nombre:{
//         type:DataTypes.STRING(50)
//     },
//     direccion:{
//         type:DataTypes.STRING(50)
//     }  
// },{
//     timestamps: false,
// })

// module.exports = Repartidor;