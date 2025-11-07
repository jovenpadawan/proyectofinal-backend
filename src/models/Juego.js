import mongoose from 'mongoose';

const juegoSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
    anoLanzamiento: { type: Number },
    desarrollador: { type: String, required: true },
    imagenPortada: { type: String },
    descripcion: { type: String },
    completado: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model('Juego', juegoSchema);