const mongoose=require("mongoose");
var mongoURL='mongodb+srv://Deepukankar:Sharma9179@cluster0.iu8h0.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, {useUnifiedTopology:true , useNewUrlParser:true})

var connection=mongoose.connection
connection.on('error',()=>{
    console.log('Mongo Db connection failed');
})

connection.on('connected', ()=>{
    console.log('Mongo DB connection succesful');
})

module.exports =mongoose