import bcrypt from "bcryptjs"

export default async function HashVerfier({ plain_password, hashed_password }) {
    const isPassword = await bcrypt.compare(plain_password, hashed_password)

    return isPassword


}