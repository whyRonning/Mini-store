const {model, Schema}=require("mongoose");

let schema=new Schema({
    id:{type:Number,required:true,unique:true},
    name:{type: String,required: true},
    count:{type:Number,required:true},
    cost:{type:Number,required:true},
    img:{type:String,required:true}
});
module.exports=model("cartItem",schema);