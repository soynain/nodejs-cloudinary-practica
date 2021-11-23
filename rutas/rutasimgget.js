const express=require('express');
const router=express.Router();
const funcionesRutas=require('./funcionesrutas/rutasimgfuncionesget')


router.get('/',(req,res)=>{  
   // console.log(path.join(__dirname,'public/static'))
   funcionesRutas.renderIndex(req,res) //siempre enviar los parametros del router
})
//despues del signo de interrogacion hay mas parametros, no hay necesidad de especificarlos
//es cosa de hacer destructuración de objetos y con un try and catch manejar la ausencia de estos
router.get('/image?',async(req,res)=>{
   await funcionesRutas.enviarJsonConsultaImagen(req,res)
})

router.get('/delete/:id',async(req,res)=>{
   await funcionesRutas.borrado(req,res)
})

module.exports=router 