const path = require('path')
const { unlink } = require('fs-extra');
const imagen = require(path.resolve('models/imgSchema'))
const cloudinary = require('cloudinary').v2;

/*en esta parte configuras tus api keys, ya sea con env o desde aquí*/
cloudinary.config({
    cloud_name: 'yourcloudname',
    api_key: 'yourapikey',
    api_secret: 'yourapisecret'
});

const renderIndex = (req, res) => {
    // console.log(path.resolve('public/static'))
    // res.sendFile('index.html',{root:'public/static'}) //para rutas de subcarpetas usa el root en sendfile
    // res.sendFile(path.resolve('public/static/index.html')) 
    /*se puede de dos maneras, con path resolve obtienes la ruta root, root te da la ruta maestro*/
    res.render('index');
};

const enviarJsonConsultaImagen = async (req, res) => {
    const { id } = req.query;
    const respuestaRedirect = await imagen.findOne({ name: id })
    res.json({
        respuestaRedirect
    })
}

const borrado = async (req, res) => {
    try {
        console.log(req.params.id)
        const imgToBeDeleted = await imagen.findOne({ name: req.params.id })
        console.log(imgToBeDeleted)
        if (imgToBeDeleted === null) {
            res.send('no existe la imagen')
        } else {
            const img = await imagen.deleteOne({ name: req.params.id })
            const responseCloudinaryApi = await cloudinary.uploader.destroy(imgToBeDeleted.image_id)
            await unlink(path.resolve('public/uploads/' + req.params.id))
            res.send('imagen borrada')
        }
    } catch (e) {
        if (e.code == 'ENOENT') {
            console.log('no existe la imagen')
        }
    }
}

module.exports = {
    renderIndex,
    enviarJsonConsultaImagen,
    borrado
}
