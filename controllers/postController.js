const POSTS = require("../models/postsModel");
const addImageHandler = (req, res) => {
  res.status(200).json(`images/${req.file.filename}`);
};

const addPost = (req, res, next) => {
  console.log(req.body, req.userId);

  try {
    const { text, image } = req.body;
    POSTS({ content: text, imagePath: image, createdBy: req.userId })
      .save()
      .then((data) => {
        res.status(200).json({ message: "post created successfully" });
      });
  } catch (error) {
    next(error);
  }
};
const getBlogData = (req, res, next) => {
  console.log(req.query);
  const { perPage, pageNo } = req.query;
  const skip = (pageNo - 1) * perPage;
  try {
    // POSTS.find({deleted:false}).populate('createdBy',"name email _id").skip(skip).limit(perPage).then((data)=>{
    //     res.status(200).json(data)
    // })

    POSTS.aggregate([
      { $match: { deleted: false } },
      {
        $facet: {
          totalCount: [{ $count: "totalCount" }],
          blogs: [
            {
              $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $set: {
                user: { $arrayElemAt: ["$user", 0] },
                content: { $substrBytes: ["$content", 0, 300] },
              },
            },
            {
              $skip: (skip),
            },
            {
              $limit: parseInt(perPage),
            },
            {
              $project: {
                "user.password": 0,
              },
            },
          ],
        },
      },
    ])
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    next();
  }
};
module.exports = { addImageHandler, addPost, getBlogData };
