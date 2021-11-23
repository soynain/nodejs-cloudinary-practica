const path = require('path')
const imagen = require(path.resolve('models/imgSchema')) //importas el esquema para formar el documento a insertar en mongo
const url = require('url');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dsd41njz3', 
    api_key: '752622418195413', 
    api_secret: '5W6UiWVudHBHGcLFh6kKBC0QqUk' 
  });

const subido = async (req, res) => {
    const imageGuardarMongo = new imagen(); //creas un nuevo documento
    imageGuardarMongo.path = '/uploads/' + req.file.filename
    imageGuardarMongo.size = req.file.size
    imageGuardarMongo.name = req.file.filename

    const responseCloudinaryApi = await cloudinary.uploader.upload(req.file.path)
 
    // console.log(req.file)
    imageGuardarMongo.imageURL=responseCloudinaryApi.url
    imageGuardarMongo.image_id=responseCloudinaryApi.public_id
    console.log(imageGuardarMongo)
    await imageGuardarMongo.save()
    // res.redirect(`/uploads/${req.file.filename}`)
    let id = encodeURIComponent(imageGuardarMongo.name);
    res.redirect('/home/image?id=' + id)
}



module.exports = { subido };