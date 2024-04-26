import bcrypt from "bcryptjs";

export default async function Hashing(plain_password) {
    try {
        const hash = await bcrypt.hash(plain_password.toString(), 10);
        console.log(hash, "hash");
        return hash;
    } catch (error) {

        console.error("Error hashing password:", error);
        throw error;
    }
}
