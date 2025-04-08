// 📦 multer ko import kar rahe hain
import multer from 'multer';

// ✅ Named export: storage ko baahar bhej rahe hain taaki doosre files me use ho sake
export const storage = multer.diskStorage({

  // 📁 destination: yeh batata hai ki uploaded file ko server ke kis folder me rakhna hai
  // Yahan hum 'uploads' folder use kar rahe hain
  destination: 'uploads',

  // 🏷️ filename: yeh function har file ka unique naam set karta hai
  // req = request, file = file object, cb = callback
  filename: (req, file, cb) => {
    // 👇 file ka naam banaya gaya: [timestamp]-[original filename]
    cb(null, Date.now() + '-' + file.originalname);
    // Example: 1712598123456-mypic.jpg
  }
});





