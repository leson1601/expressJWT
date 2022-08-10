import mongoose from 'mongoose';
const password = process.env.DB_PASSWORD;


const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URI
    if (dbURI) await mongoose.connect(dbURI);
    else console.log("Could not find database URI")
  } catch (error) {
    console.log(error)
  }  
}

export {connectDB}