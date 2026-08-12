import express from 'express'
import "dotenv/config"
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';

const app = express()
const PORT = process.env.PORT

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

app.listen(PORT, () => {
    console.log(`Server is succesfully running on port :: ${PORT}`);
    
})