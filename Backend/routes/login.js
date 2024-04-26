import Router from "express";
import { Users } from "../Db/collection.js";
import HashVerfier from "../fucntions/has_verifier.js";

export const LoginRouter = Router()

LoginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        return await Users().then(async (_collection) => {
            const exist_user = await _collection.findOne({ email })
            console.log(exist_user);

            if (exist_user) {
                let isPassword = await HashVerfier({
                    plain_password: password,
                    hashed_password: exist_user.password
                })

                if (isPassword) {
                    return res.status(200).send("logged in");

                } else return res.status(401).send("wrong password")
            }
            return res.status(404).send("no user found")
        })
    }
    return res.status(400).send("something missing")
})
