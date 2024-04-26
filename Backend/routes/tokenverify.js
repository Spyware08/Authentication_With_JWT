import { Router } from "express";

export const dumy = Router().get("/verify", (req, res) => {
    console.log(req.cookies.token);
    if (req.cookies.token)
        return res.status(200).send("ok")
    else
    return res.status(401).send("unauthorized")
    // return res.status(401).send("error in token")
})