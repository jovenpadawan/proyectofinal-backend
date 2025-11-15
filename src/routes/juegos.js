import express from 'express';
import juego from '../models/Juego.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const juegos = await juego.find();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ message:"Ocurrió un error al obtener los juegos.", error });
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const idNumerico = Number(req.params.id); 
        const juegoEncontrado = await juego.findOne({ id: idNumerico });
        if (!juegoEncontrado) {
            return res.status(404).json({ message: 'Juego no encontrado con ese ID.' });
        }
        res.json(juegoEncontrado);
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al buscar el juego por ID.", error });
    }
});

router.post('/', async (req, res) => {
    try {
        const ultimoJuego = await juego.findOne().sort({ id: -1 });
        const nuevoId = ultimoJuego ? ultimoJuego.id + 1 : 1;
        const nuevoJuego = new juego({
            id: nuevoId,
            titulo: req.body.titulo,
            genero: req.body.genero,
            plataforma: req.body.plataforma,
            anoLanzamiento: req.body.anoLanzamiento,
            desarrollador: req.body.desarrollador,
            imagenPortada: req.body.imagenPortada,
            descripcion: req.body.descripcion,
            completado: req.body.completado,
            fechaCreacion: req.body.fechaCreacion
        });
        const juegoGuardado = await nuevoJuego.save();
        res.status(201).json(juegoGuardado);
    } catch (error) {
        res.status(400).json({ message:"Ocurrió un error al agregar el juego.", error});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const juegoActualizado = await juego.findByIdAndUpdate(
            req.params.id,
            {
                titulo: req.body.titulo,
                genero: req.body.genero,
                plataforma: req.body.plataforma,
                anoLanzamiento: req.body.anoLanzamiento,
                desarrollador: req.body.desarrollador,
                imagenPortada: req.body.imagenPortada,
                descripcion: req.body.descripcion,
                completado: req.body.completado,
                fechaCreacion: req.body.fechaCreacion
            },
            { new: true }
        );
        if (!juegoActualizado) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json(juegoActualizado);
    } catch (error) {
        res.status(400).json({ message:"Ocurrió un error al actualizar el juego.", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const juegoEliminado = await juego.findByIdAndDelete(req.params.id);
        if (!juegoEliminado) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json({ message: 'Juego eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message:"Ocurrió un error al eliminar el juego.", error });
    }
});

export default router;