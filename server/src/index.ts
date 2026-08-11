import express from 'express'
import "dotenv/config"

const app = express()
const PORT = process.env.PORT

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