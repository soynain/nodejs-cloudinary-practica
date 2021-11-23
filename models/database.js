const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/baseimagenes').then(e=>{
    console.log('conectado a mongo')
}).catch(error=>{
    console.log(error)
})