require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Importar rutas
const eventRoutes = require("./routes/events");
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}/`));

module.exports = app; // Para pruebas
