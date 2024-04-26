import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const DB = async (db_name) => {
  let connection = new MongoClient(process.env.DATABASE_URL);
  let conn = await connection.connect();
  if (db_name) {
    const db = conn.db(db_name);
    return db;
  }
  else {
    const db = conn.db("testDB");
    // console.log("connected");
    return db;
  }
};


const Users = async () => {
  const db = await DB();
  const collection = db.collection("usersDatabase");
  if (collection)
  console.log("connected");

    return collection;
  return null;
};
export { DB, Users };