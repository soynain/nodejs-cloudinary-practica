const {Schema,model}=require('mongoose')

const imgEsquema=new Schema({
    name:{type:String},
    path:{type: String},
    size:{type: Number},
    date: {type: Date, default: Date.now()},
    imageURL:{type: String},
    image_id:{type:String}
})

module.exports=model('imagen',imgEsquema);