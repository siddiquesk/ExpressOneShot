
export const hellocontroller=(req,res)=>{
  res.send('Hello World');
}

export const paramscontroller=(req,res)=>{
  let {name,age}=req.params;
  res.send(`Hello ${name}, your age is ${age}`);
 console.log(name,age);
}

export const querycontroller=(req,res)=>{
  let {username}=req.query;
  res.send(`Hello ${username}`);
  console.log(`Hello ${username}`);
}