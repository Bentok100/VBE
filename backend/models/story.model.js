import mongoose from "mongoose";

const storySchema= new mongoose.Schema({
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  mediaType:{
     type:String,
     enum:["image" , "video"],
     required:true 
  },
  media:{
    type:String,
    required:true
  },
  viewers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }],
  createdAt:{
    type:Date,
    default:Date.now(),  //yeh time jab story bana .
    expires:86400//sec    ,ek din baad , itne der baad yeh story haata dena  
  }
},{timestamps:true});

const Story = mongoose.model("Story",storySchema);
export default Story ;
