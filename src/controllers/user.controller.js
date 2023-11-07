import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcrypt'
import {userModel} from "../models/user.model.js"
import { productsModel } from "../models/products.model.js"

export const test = (req, res) =>{
  res.json({
    message: 'Probando que ande'
  })
}

export const updateUser = async (req, res, next) => {
  if(req.user.id === req.params.id) return next(errorHandler(401, 'No se puede actualizar!'))
  try {
    if(req.body.password){
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    const updateUser = await userModel.findByIdAndUpdate(req.params.id, {
      $set:{
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    }, {new: true})

    const {password, ...rest} = updateUser._doc;

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'Solo se puede eliminar tu cuenta'));
  try {
    await userModel.findByIdAndUpdate(req.params.id);
    res.clearCookie('access_token')
    res.status(200).json('Usuario eliminado')
  } catch (error) {
    next(error)
  }
}

export const getUserCart = async (req, res, next) => {
  if(req.user.id != req.params.id){
    try {
      const products =await productsModel.find().lean()
      res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }else{
    return next(errorHandler(401, 'Solo podes ver tus productos!'))
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id)
    if(!user) return next(errorHandler(404, 'Usuario no encontrado'))
    const {passweord: pass, ...rest} = user._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }

}