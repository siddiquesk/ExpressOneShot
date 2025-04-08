import mongoose from 'mongoose'


const MONGO_DB='mongodb+srv://myexpressapp:sufiyan123@cluster0.tswwuos.mongodb.net/express?retryWrites=true&w=majority&appName=Cluster0'

export const connectDb=async()=>{
  mongoose.connect(MONGO_DB).then(()=>{
    console.log('db conncted');
  }).catch((err)=>{
    console.log(err);
  });
}


