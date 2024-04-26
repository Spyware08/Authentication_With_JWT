import express from "express"

import { Router } from "express"
import { Users } from "../Db/collection.js"

export const userUpdateRoute = Router()

userUpdateRoute.route("/update")
    .post(async (req, res) => {
        return await Users().then(_collection => {
            _collection.findOneAndUpdate({ email: req.body.email }, { $set: req.body }, { upsert: true })
        }).then(e => res.json({ msg: e }))
    })