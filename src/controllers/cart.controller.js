import { cartsModel } from "../models/cart.model.js";
import { productsModel } from "../models/products.model.js";

// export const newCart = async (req, res, next) => {
//   try {
//     const cart = await cartsModel.create(req.body);
//   } catch (error) {
//     next(error)
//   }
// }

export const getAll = async () => {
  const carts = await cartsModel.find()
  return carts.map(cart => cart.toObject())
}

export const saveCart = async (req, res, next) => {

  try {
    const cart = await cartsModel.create(req.body)
  } catch (error) {
    next(error)
  }
}

export const addProductToCart = async (cid, pid) => {
  try {
    const product = await productsModel.findOne({_id: pid})
    const cart = await cartsModel.findOne({_id: cid})

    cart.products.push(product.title)
    /* product.carts.push(cart.title) */


    await productsModel.updateOne({_id: pid}, product)
    await cartsModel.updateOne({_id: cid}, cart)
    return
  } catch (error) {
    throw error
  }
}

export const getCartById = async (cid) => {
  if (this.validateId(cid)) {
    return (await cartsModel.findOne({ _id: cid }).lean()) || null;
  } else {
    console.log("Not found!");
    return null;
  }

}

export const validateId = (id) => {
  return id.length === 24 ? true : false; // 24 es la cantidad de caracteres que tiene un id de mongo, entonces valido esto para saber si es un id de mongo o no
}