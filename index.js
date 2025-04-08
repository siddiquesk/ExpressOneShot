import express from 'express';
const app = express();
import Person from './models/person.js'
import {connectDb} from "./config/db.js"
await connectDb();

app.use(express.json());

/*
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
*/



app.post('/person', async(req, res) => {
  try{
   const cretaePerson= await Person.create(req.body);
   if(!cretaePerson){
    res.json({message:"person details misssing"});
   }
   res.status(200).json({message:'user created sussessfully ',cretaePerson});
  }catch(err){
  res.status(400).json({message:err.message});
  }
});

app.get("/person",async(req,res)=>{
  try{
 const person=await Person.find({});
 if(!person){
  return res.status(400).json({message:"user not found"});
 }
 res.status(200).json(person);
  }catch(err){
    res.status(400).json({message:err.message});
  }
})

/*//correct hai ye bhi update logics
app.put('/person/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields manually
    person.name = req.body.name || person.name;
    person.email = req.body.email || person.email;
    person.age = req.body.age || person.age;

    const updatedPerson = await person.save(); // Runs schema validations
    res.status(200).json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

*/
app.put("/person/:id",async(req,res)=>{
  try{
  const update =await Person.findByIdAndUpdate(req.params.id,req.body,{new:true});
  if(!update){
    return res.status(402).json("user not updated");
  }
  res.status(200).json(update);
  }catch(err){
    res.status(400).json({message:err.message});
  }
})

app.delete("/person/:id",async(req,res)=>{
  let id=req.params.id;
  try{
   const delperson=await Person.findByIdAndDelete(id);
   if(!delperson){
    return res.status(400).json('person was not deleted');
   }
   res.status(200).json({message:'user deleted succesfully'});
  }catch(err){
    res.status(400).json({message:err.message});
  }
})





app.listen(8000, () => {
  console.log('Server is running on port 8000');
});


//import router from './router.js';
//import { storage } from "./config/muterstorage.js"; 
/*
import multer from 'multer'; 
const upload = multer({ 
  storage,
  //limits: {
  //  fileSize: 1024000 // optional: 1MB limit
  //}
});
*/
/*
app.post('/form', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('✅ File received!');
});
*/

//Named exports must use exact name while importing.
//{} brackets zaroori hain.
//default export ke liye aap koi bhi naam use kar sakte ho while importing.
//Brackets {} nahi lagte.
// Default route




/*
Client (like Postman or HTML form) se form-data bheja jaata hai (including fields + files).
Ye form-data content-type hota hai:
bash
Copy
Edit
Content-Type: multipart/form-data
Express khud is format ko nahi samajh sakta, isiliye hume multer chahiye hota hai.

Multer middleware:

form-data ko parse karta hai.

text fields ko req.body me store karta hai.

files ko:

ya to RAM (memory) me temporarily rakhta hai (multer() without config),

ya to Disk (server folder) me save karta hai (multer({ dest: "uploads/" }) or using storage config),

file info ko req.file ya req.files me daal deta hai.

🔍 Do Tarike se Multer File Ko Handle Karta Hai:
1️⃣ Memory Storage (default)
js
Copy
Edit
const upload = multer(); // No dest
File RAM me hoti hai.

req.file.buffer me binary data milta hai.

File disk pe save nahi hoti.

Tum chaaho to manually us buffer ko fs.writeFile se save kar sakte ho.

2️⃣ Disk Storage (Permanent File Save)
js
Copy
Edit
const upload = multer({ dest: 'uploads/' });
File automatically server pe uploads/ folder me save ho jaati hai.

File ka naam random hota hai.

Multer file ki metadata deta hai:

js
Copy
Edit
req.file = {
  destination: 'uploads/',
  filename: 'xyz123.jpg',
  originalname: 'photo.jpg',
  path: 'uploads/xyz123.jpg',
  ...
}
💬 Tumne bola:
res.send() to server pe message print karta hai — to file server pe kaise save ho?

🤯 Answer:
res.send() sirf client ko response bhejta hai — iska file saving se koi lena dena nahi.

📦 File pehle se hi server pe save ho chuki hoti hai jab tak res.send() run hota hai.
Multer middleware request se pehle hi file ko save kar deta hai.

✅ Pure Example: File Save with Multer
js
Copy
Edit
import express from "express";
import multer from "multer";

const app = express();

// Disk storage setup
const upload = multer({ dest: 'uploads/' }); // File server pe uploads/ me save hogi

app.post('/upload', upload.single('image'), (req, res) => {
  console.log("Body:", req.body); // text fields
  console.log("File:", req.file); // file info

  res.send("File uploaded successfully");
});

app.listen(8000, () => console.log("Server started on port 8000"));
Postman:

Method: POST

URL: http://localhost:8000/upload

Body: form-data

Key: image (Type: File)

Add file

Optionally: name, email (Type: Text)

🤔 Tera Final Sawal:
Image multer se save hoti hai to server pe hoti hai ya nahi?

✅ Answer:
Haan, hoti hai — agar tum dest: 'uploads/' ya custom storage use kar rahe ho.

Agar tumne config nahi diya (const upload = multer()), to file RAM me rehti hai (temporary), aur tum manually save kar sakte ho fs.writeFile se.

🎁 Bonus: Custom filename & folder
js
Copy
Edit
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // custom path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // custom name
  }
});

const upload = multer({ storage });
*/