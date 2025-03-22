import { connect } from 'mongoose';
import 'dotenv/config'

const connectionString = process.env.MONGO_URI;

export const initMongoDB = async() => {
  try {
    await connect(connectionString,{dbName: 'coderBack'});
  } catch (error) {
    throw new Error(error)
  }
}
