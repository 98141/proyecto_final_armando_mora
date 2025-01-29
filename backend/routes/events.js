const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// Obtener todos los eventos
router.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ fecha: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener eventos" });
    }
});

// Crear un nuevo evento
router.post("/", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: "Error al crear evento" });
    }
});

// Actualizar un evento
router.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ error: "Evento no encontrado" });
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar evento" });
    }
});

// Eliminar un evento
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ error: "Evento no encontrado" });
        res.json({ message: "Evento eliminado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar evento" });
    }
});

module.exports = router;
