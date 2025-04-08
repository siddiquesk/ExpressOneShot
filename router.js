import express from 'express';
const router=express.Router();
import {hellocontroller,paramscontroller ,querycontroller} from "./controller.js";
router.get("/",hellocontroller);
router.get("/about/:name/:age",paramscontroller);
router.get("/api",querycontroller);
export default router;