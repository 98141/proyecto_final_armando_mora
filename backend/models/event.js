const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    fecha: {
      type: Date,
      required: [true, "La fecha es obligatoria"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
