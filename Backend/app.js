import express from "express"
import { SignupRouter } from "./routes/Signup.js"
import { userUpdateRoute } from "./routes/updateUserData.js"
import { LoginRouter } from "./routes/login.js"
import { dumy } from "./routes/tokenverify.js"
import cookieParser from "cookie-parser"
import { Users } from "./Db/collection.js"
import cors from "cors"
const app = express()

const port = 8080
const cors_options = {
    origin: ["http://192.168.1.5:5173", "http://192.168.1.40:5173","http://192.168.35.94:5173"],
    credentials: true,
};
Users()
app.use(cors(cors_options))
app.use(express.json())
app.use(cookieParser())
app.use(dumy)
app.use(LoginRouter)
app.use(SignupRouter)
app.use(userUpdateRoute)

app.listen(port, () => console.log("port is running on ", port))