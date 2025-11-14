import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import juegosRoutes from './routes/juegos.js';
import resenasRoutes from './routes/resenas.js';

const app = express();

dotenv.config({ path: './.env' });
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('No se encontró MONGO_URI en las variables de entorno.');
  process.exit(1);
}

mongoose.connect(mongoUri)
.then(() => {
    console.log("Conectado a MongoDB");
})
.catch((error) => {
    console.error("Error del servidor: ", error);
});

app.use('/api/juegos', juegosRoutes);
app.use('/api/reseñas', resenasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;