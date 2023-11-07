import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products:{
        type:[
            {
                quantity:{
                    type:Number,
                    default:1
                },
                productId:{
                    type:mongoose.Types.ObjectId,
                    ref:"products"
                }
            }
        ],
        default:[]
    }
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);