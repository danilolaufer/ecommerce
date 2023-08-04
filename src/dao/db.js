const express = require("express")
const mongoose = require("mongoose");




  const connect = ()=>{
    const URL = "mongodb+srv://danilolaura:resbalones123@clusterecommerce.0exvxqh.mongodb.net/avanzado"
    return mongoose.connect("mongodb+srv://nattileiva2012:More2408@backend.xu58awj.mongodb.net/Ecomerce?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(async(connection)=>{
      console.log("Conexion exitosa db !!! siiii");

      // Cart.create({
      //   date: "14/06/2023"
      // })
      // Cart.find().populate("products.product")
      // .then(c=> console.log(JSON.stringify(c, null, "\t")))
      // .catch(err => console.log(err));

      //agregamos productos al carrito
      // let cart1 = await Cart.findOne({_id:"648a1be49c96e246e7560b3a"})  //numero id del carrito
      // cart1.products.push({product : "6489ebe58d43be6354e1d6be"})  // id del producto
      // console.log(cart1);
      //  await Cart.updateOne({_id:"648a1be49c96e246e7560b3a"}, cart1)   //numero id del carrito



    })
    .catch(err => console.log(err));
  }

//exportar la funcion para incocarla en index.js
  module.exports = {
    connect
  };
  


