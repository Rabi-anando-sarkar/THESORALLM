import express from 'express'
import "dotenv/config"
import { auth } from './libs/auth.js';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors'
import { registerRoutes } from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express()
const PORT = process.env.PORT
const clientUrl = process.env.CLIENT_URL ?? "http:localhost:3000"

app.use(
    cors({
        origin: clientUrl,
        credentials: true
    })
)

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.get("/", (_,res) => {
    res.send("Hello world")
})

app.get("/health", (_,res) => {
    res.json({
        status: "ok"
    })
})

registerRoutes(app)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is succesfully running on port :: ${PORT}`);
})