import mongoose from "mongoose";

const productsCollection = "Products";


const productsSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }, 
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  }, 
  stock: {
    type: Number,
    required: true,
  }, 
  status: Boolean,
  category: String,
  thumbnail: String,
})


export const productsModel = mongoose.model(productsCollection, productsSchema)