import express from "express"
import routeHabito from "./Routes/routeHabito"
import cors from "cors"

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(routeHabito)


app.listen(port, () => {
    console.log(`Server is running on http://localhost${port}`)
})