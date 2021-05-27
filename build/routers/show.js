"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));require("dotenv").config();var _require=require("express"),Router=_require.Router,jwt=require("jsonwebtoken"),router=Router(),showModel=require("../models/show"),accessToken=function(a,b,c){var d=a.headers["auth-token"];d?jwt.verify(d,process.env.SECRET_TOKEN,function(d,e){return d?b.status(400).json({mensaje:"The token is invalid"}):void(a.decoded=e,c())}):b.status(500).send({mensaje:"A Token is needed"})};router.post("/create-show",accessToken,function(){var a=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function a(b,c){var d,e,f,g,h,i,j;return _regenerator["default"].wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=b.body,e=d.name,f=d.season,g=d.actor,h=d.director,a.prev=1,a.next=4,showModel.findOne({name:e,season:f,actor:g,director:h});case 4:if(i=a.sent,!i){a.next=7;break}return a.abrupt("return",c.status(500).json("The show already exists"));case 7:return j=new showModel({name:e,season:f,actor:g,director:h}),a.next=10,j.save();case 10:return a.abrupt("return",c.status(200).json("the show ".concat(j.name," was created")));case 13:a.prev=13,a.t0=a["catch"](1),c.status(500).json(a.t0.message);case 16:case"end":return a.stop();}},a,null,[[1,13]])}));return function(){return a.apply(this,arguments)}}()),module.exports=router;