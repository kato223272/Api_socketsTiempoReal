const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
const User = require('./routes/user.routes.js');
const Repartidor = require('./routes/repartidor.routes.js');
const Venta = require('./routes/Venta.routes.js');

const app = express();
dotenv.config();
app.use(cors({
    origin:"*"
}));
app.use(cors());

// Middleware
app.use(express.json());

const server = http.createServer(app);


app.use('/users', User);
app.use('/venta',Venta);
app.use('/producto',Repartidor);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});








/******** - SOCKET.IO IMPLEMENTACINO DE ROOMS -**********/
const io = require('socket.io')(server,{
  cors:{
      origin:"*"
  }
})

const NEW_CHAT_MESSAGE_EVENT="newChatMessage"

io.on('connection',(socket)=>{
  //console.log("socket id is "+socket.id+ "connected")

  const {roomId} = socket.handshake.query
  socket.join(roomId)

  socket.on(NEW_CHAT_MESSAGE_EVENT, (data)=>{
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT,data)
  })

  socket.on('disconnect', ()=>{
      socket.leave(roomId)
  })
})

/************** - SHORT POLLING -**************/
let estadoPaquete = 'Procesando venta';

// let responseCliente = [];
// let repartidor =[];

// function responseClient(){
//     for(res of responseCliente){
//         res.status(201).json({
//             success:true,
//             repartidor:repartidor
//         })
//     }
// }

function cambiarEstadoPaquete(nuevoEstado) {
    estadoPaquete = nuevoEstado;
    io.emit('estado_venta', estadoPaquete);
}

// Ruta para obtener el estado del paquete
app.get('/estado-venta', (req, res) => {
    res.json({ estado: estadoPaquete });
});

// Ruta para cambiar el estado del paquete
app.post('/cambiar-estado-venta/:nuevoEstado', (req, res) => {
    const nuevoEstado = req.params.nuevoEstado;
    cambiarEstadoPaquete(nuevoEstado);
    res.send(`Estado de la venta cambiado a: ${nuevoEstado}`);
});





app.post('/agregarProducto',async(req,res)=>{
    
  try {
      const repartidor = await repartidor.create(req.body);
      if(repartidor){
          repartidor.push(repartidor);
          responseClient();
      }
  } catch (error) {
      console.log("Error al agregar repartidor");
  }
})

app.get('/obtenerProducto', async (req,res)=>{
  const repartidorNuevo = await repartidor.findOne();
  repartidor.push(repartidorNuevo);

  res.status(201).json({
      repartidor:repartidor
  })
})


/**************************************************/



/*codigo del short polling*/
// setInterval(() => {
//   console.log('Estado actual de la venta:', estadoPaquete);
// }, 6000);