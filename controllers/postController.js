const POST =require('../models/postsModel')
const createPost=(req,res,next)=>{
    try {
        console.log(req.userId);
        POST({
            content:req.body.content,
            createdBy:req.userId,
            imagePath:req.body.imagePath
        }).save().then((result)=>{
            res.status(201).json('post created successfully')
        })

    } catch (error) {
        next(err)
    }
}

const addImageController =(req,res,next)=>{
console.log(req.file)
res.status(201).json({path: "images/"+req.file.filename})
}
const getpostData=(req,res,next)=>{
    let  {pageNo,perpage}=req.query
    pageNo=parseInt(pageNo)
    perpage=parseInt(perpage)
    const skip =(pageNo-1)*perpage
    console.log(pageNo,perpage);
    
    POST.aggregate([
        {$match:{deleted:false}},
        {$facet:{
            totalCount:[{$count:"totalCount"}],
            postData:[
                {$lookup:{
                    from:'users',
                    localField:"createdBy",
                    foreignField:"_id",
                    as:"userData"
                }},
                {
                    $set:{
                        userData: {$arrayElemAt:["$userData",0]},
                        content:{$substrBytes:["$content",0,300]}
                    }
                },
                {
                    $sort:{createdAt:1}
                },
                {
                    $skip:skip
                },
                {
                    $limit:perpage
                },
                {
                    $project:{"userData.password":0}
                }
            
            ],
            
        }}
    
    ]).then((result)=>{ 
        res.status(200).json(result)
      })
}
module.exports={createPost, addImageController, getpostData}