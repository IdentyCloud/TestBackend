"use strict";var _require=require("mongoose"),Schema=_require.Schema,model=_require.model,MovieSchema=new Schema({name:{type:String,required:!0},director:{type:Schema.Types.ObjectId,ref:"Actor",required:!0},actor:[{type:Schema.Types.ObjectId,ref:"Actor",required:!0}]});module.exports=model("Movie",MovieSchema);