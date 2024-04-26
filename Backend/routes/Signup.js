import { Router } from "express";
import { Users } from "../Db/collection.js";
import Hashing from "../fucntions/hashing.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const SignupRouter = Router()

async function Userdata(data) {
    return await Users()

        .then(async (_collection) => {
            const { password } = data

            if (password) {
                const hash_password = await Hashing(password)
                // console.log(hash_password);

                if (hash_password) {
                    data.password = hash_password
                    console.log(data);

                    const user_data = await _collection.insertOne(data)
                    if (user_data) {
                        console.log("data created in mongo");
                        return true
                    }
                    return false
                }
            }
        })
}



SignupRouter.post("/signup", async (req, res) => {

    const {
        username,
        email,
        mob,
        password
    } = req.body;

    if (
        username && email && mob && password
    ) {
        console.log("created")
        console.log(req.body);

        const exist_user = await Users().then(_collection => {
            return _collection.findOne({ email })
        })


        if (exist_user)
            return res.status(409).send("user exist with " + JSON.stringify(exist_user))


        const insertData = await Userdata(req.body)
        console.log(insertData);

        if (insertData) {
            const token = jwt.sign({ name: req.body.name }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d" })
            console.log(token);

            res.cookie(`token`, token, { httpOnly: true, maxAge: 86400000 })

            return res.json({ message: "account created", status: 200 })
        }
        return res.json({ message: "error in account creation", status: 500 }
        )
    }

    return res.send("error")
}
)

async function tokenVerifier(req, res) {
    if (jwt.verify(req.body.token, process.env.JWT_SECRET)) {
        return res.send("you are verified")
    }
    else {
        res.send("error in jwt")
    }

}
SignupRouter.get("/home", (req, res) => {
    return tokenVerifier(req, res)
})

