import mongoose from 'mongoose';

const ResenaSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    puntuacion: { type: Number, min: 0, max: 5, required: true },
    textoResena: { type: String },
    horasJugadas: { type: Number, min: 0 },
    dificultad: { type: String },
    recomendacion: { type: Boolean, default: false, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

export default mongoose.model('Resena', ResenaSchema);
