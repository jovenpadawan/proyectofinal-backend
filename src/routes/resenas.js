import express from 'express';
import Resena from '../models/Resena.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const resenas = await Resena.find();
        res.json(resenas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});

router.post('/', async (req, res) => {
    try {
        const ultimoResena = await Resena.findOne().sort({ id: -1 });
        const nuevoIdResena = ultimoResena ? ultimoResena.id + 1 : 1;
        const nuevaResena = new Resena({
        id: nuevoIdResena,
        juegoId: req.body.juegoId,
        puntuacion: req.body.puntuacion,
        textoResena: req.body.textoResena,
        horasJugadas: req.body.horasJugadas,
        dificultad: req.body.dificultad,
        recomendacion: req.body.recomendacion,
        fechaCreacion: req.body.fechaCreacion,
        fechaActualizacion: req.body.fechaActualizacion
    });
        const resenaGuardada = await nuevaResena.save();
        res.status(201).json(resenaGuardada);
    } catch (error) {
        res.status(400).json({ message:"Error al agregar la reseña", error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const resenaActualizada = await Resena.findByIdAndUpdate(
            req.params.id,
            {
                puntuacion: req.body.puntuacion,
                textoResena: req.body.textoResena,
                horasJugadas: req.body.horasJugadas,
                dificultad: req.body.dificultad,
                recomendacion: req.body.recomendacion,
                fechaActualizacion: req.body.fechaActualizacion,
                fechaCreacion: req.body.fechaCreacion
            },
            { new: true }
        );
        if (!resenaActualizada) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json(resenaActualizada);
    } catch (error) {
        res.status(400).json({ message:"Error al actualizar la reseña.", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
        if (!resenaEliminada) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ message:"Error al eliminar la reseña.", error });
    }
});
export default router;
