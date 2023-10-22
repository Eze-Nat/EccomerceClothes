import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import path from "path"
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import viewsRouter from "./routes/views.route.js";

dotenv.config();
const app = express();
const PORT = 8080;
const connection = mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(cookieParser())

app.use('/', viewsRouter)
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto http://localhost:${PORT}`);
});
