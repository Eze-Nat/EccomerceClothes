import { productsModel } from "../models/products.model.js";
import { errorHandler } from "../utils/error.js";

export const newProduct = async (req, res, next) => {
  try {
    const cart = await productsModel.create(req.body);
    return res.status(201).json(cart);
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  const product = await productsModel.findById(req.params.pid);
  if(!product) {
    return next(errorHandler(404, 'Producto no encontrado'))
  }
  
  // if (req.user.id !== productId.id) {
  //   return next(errorHandler(401, 'Solo podes borrar productos propios'))
  // }
  try {
    await productsModel.findByIdAndDelete(req.params.pid)
    res.status(200).json('Producto Eliminado')
  } catch (error) {
      next(error)
  }
};

// export const updateProduct = async (req, res, next) => {
//   const product = await productsModel.findById(req.params.pid)
//   if(!product) {
//     return next(errorHandler(404, 'Producto no encontrado'))
//   }
//   // if(req.user.id !== product.code) {
//   //   return next(errorHandler(401, 'Solo se puede editar de tu lista'))
//   // }
//   try {
//     const updatedProduct = await productsModel.findByIdAndUpdate(
//       req.params.pid,
//       req.body,
//       {new: true}
//     )
//     res.status(200).json(updatedProduct)
//   } catch (error) {
//     next(error)
//   }
// }
export const updateProduct = async (req, res, next) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
      const result = await productsModel.findByIdAndUpdate(productId, updatedFields);
      if (result) {
          res.json({ message: "Producto actualizado exitosamente" });
      } else {
          res.status(404).json({ error: "Producto no encontrado" });
      }
  } catch (error) {
      next(error);
  }
};

export const getProducts = async (req, res, next) => {
    try {
      const products =await productsModel.findById(req.params.pid)
      if(!products){
        return next(errorHandler(404, 'Producto no encontrado'))
      }
      res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }

  export const searchProduct = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10
      const startIndex = parseInt(req.query.startIndex) || 0
      let title = req.query.title

      if(title === "undefined" || "false"){
        title = { $in: [false, true]}
      }

      const searchTerm = req.query.searchTerm || '';

      const sort = req.query.sort || 'createdAt'

      const order = req.query.order || 'desc'

      const products = await productsModel.find({
        title: {$regex: searchTerm, $options: 'i'},
        description
      }).sort({[sort]: order}
        ).limit(limit).skip(startIndex)
        
        return res.status(200).json(products)

      

    } catch (error) {
      next(error)
    }
  }
