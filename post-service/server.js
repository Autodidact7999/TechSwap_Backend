import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import postRoutes from './src/routes/post.js';

config();
const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
const mongoDB_URI = process.env.MONGODB_URI;
mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Post Service API',
            version: '1.0.0',
            description: 'APIs for Post Service',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', serve, setup(swaggerDocs));

app.use(express.json()); // for parsing application/json
app.use('/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Post Service is running on port ${PORT}`);
});