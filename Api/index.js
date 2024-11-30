import express from 'express'
import cors from 'cors'
import fileRoutes from './routes/fileRoutes.routes.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/files', fileRoutes);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
