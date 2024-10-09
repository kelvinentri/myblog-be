
const addImageHandler=(req,res)=>{
console.log(req.file);
res.status(200).json(`public/images/${req.file.filename}`)
}

module.exports={addImageHandler}