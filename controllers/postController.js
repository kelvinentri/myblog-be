const POSTS =require('../models/postsModel')
const addImageHandler=(req,res)=>{
res.status(200).json(`images/${req.file.filename}`)
}

const addPost=(req,res,next)=>{  
    console.log(req.body,req.userId);
      
    try {
        const {text,image}=req.body
        POSTS({content:text,imagePath:image,createdBy:req.userId}).save().then(data=>{
            res.status(200).json({message:"post created successfully"})
        })
    } catch (error) {
        next(error)
    }
}
const getBlogData=(req,res,next)=>{
try {
    POSTS.find({deleted:false}).populate('createdBy',"name email _id").skip(0).limit(20).then((data)=>{
        console.log(data,"postData");
        res.status(200).json(data)
    })
} catch (error) {
    next()
}
}
module.exports={addImageHandler,addPost, getBlogData}