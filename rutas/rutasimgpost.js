const express = require('express');
const router = express.Router();
const path = require('path')
const funcionesImagenPost = require('./funcionesrutas/rutasimgfuncionespost')
const multer = require('multer')
const {v4: uuidv4} =require('uuid')

const storage = multer.diskStorage({
    destination: path.resolve('public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4()+path.extname(file.originalname))
    }
})

const imgMiddle = multer(
    {
        //dest: path.resolve('public/uploads'), //el storage lo trae implicito
        storage,
        limits: { fileSize: 10000000 },
        fileFilter: (req, file, callback) => {
            const filetypes = /jpeg|png|gif|jpg/
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname));
            if (mimetype && extname) {
                return callback(null, true)
            }
            return callback('No es un archivo con extensión válida')
        }
    }
).single('imagenSubida')


router.post('/upload', imgMiddle, (req, res) => {
    funcionesImagenPost.subido(req, res)
})


module.exports = { router };
