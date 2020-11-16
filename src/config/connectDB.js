import mongoose from "mongoose"

const connectDB = () => {
  const host = process.env.DB_HOST ;
  const port = process.env.DB_PORT ; 
  const database = process.env.DB_DATABASE; 
  const user = process.env.DB_USER ; 
  const password = process.env.DB_PASSWORD ; 
  const uri = `mongodb://${host}:${port}/${database}`
  return mongoose.connect(uri, {useUnifiedTopology : true , useCreateIndex : true, useNewUrlParser: true })
}

export default connectDB