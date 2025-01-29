const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Event = require("../models/event");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Event.deleteMany({});
});

describe("API de Eventos", () => {
    const sampleEvent = { nombre: "Evento de prueba", fecha: new Date(), descripcion: "Descripción de prueba" };

    test("POST /events - Crear evento", async () => {
        const response = await request(app).post("/events").send(sampleEvent);
        expect(response.status).toBe(201);
        expect(response.body.nombre).toBe(sampleEvent.nombre);
    });

    test("GET /events - Obtener eventos", async () => {
        await Event.create(sampleEvent);
        const response = await request(app).get("/events");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("PUT /events/:id - Actualizar evento", async () => {
        const event = await Event.create(sampleEvent);
        const response = await request(app).put(`/events/${event._id}`).send({ nombre: "Evento Actualizado" });
        expect(response.status).toBe(200);
        expect(response.body.nombre).toBe("Evento Actualizado");
    });

    test("DELETE /events/:id - Eliminar evento", async () => {
        const event = await Event.create(sampleEvent);
        const response = await request(app).delete(`/events/${event._id}`);
        expect(response.status).toBe(200);
        const deletedEvent = await Event.findById(event._id);
        expect(deletedEvent).toBeNull();
    });
});
