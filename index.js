const express = require("express");
const app = express();
const router = express.Router();

const morgan=require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const blogModel=require('./model');
require('dotenv').config();
const PORT=process.env.PORT
require('./connection')
app.use('/api/', router);

//Write missing code here and all the CRUD operations on the database
router.get('/view',async (req,res)=>{
  try{
    const data=await blogModel.find();
    res.send(data);
  }
  catch{
    res.status(500).send({message:"Error"});
  }
})
router.post('/create',async (req,res)=>{
  // const {author,content,category}=req.body;
  // const newUser=new blogModel({author,content,category});
  const blog=req.body;
  const newUser=blogModel(blog);
  try{
    const newPost=await newUser.save({new:true});
    res.status(201).send({message:'Blog created successfully',data: newPost});
  } 
  catch(err){
    console.log(err);
    res.status(500).send({message:"Error"});
  }
});


router.put('/update/:id', async (req, res) => {
  const postId = req.params.id;
  const blog = req.body;


  try {
    const updatedPost = await blogModel.findByIdAndUpdate(postId, blog,{new:true});
    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Blog updated successfully", data: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating post" });
  }
});


router.delete('/delete/:id', async (req, res) => {
  const postId = req.params.id;  // Get the post ID from the route parameter
  try {
    const deletedPost = await blogModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting post" });
  }
});





app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
