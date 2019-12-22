// ********* module.exports.actionName = function(req,res){} ********************

const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


// ************** CODE WITHOUT ASYNC-AWAIT ***************************
// module.exports.home = function(req,res){

//    // populate the user of each post
//    Post.find({}).populate('users')
//    .populate({
//        path: 'comments',
//        populate: {
//            path: 'user'
//        }
//    })
//    .exec(function(err,posts){
//        if(err){
//            console.log('error in finding post');
//            return;
//        }



//       User.find({},function(err,user){
       
//         return  res.render('home',{
//               title: "Codeial | Home",
//               post: posts,
//               all_users: user
//           });

//       });
//    });
// }

// ******************** MODIFIED CODE TO ASYNC AWAIT ************
module.exports.home = async function(req,res){

    // populate the user of each post
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('users')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await  User.find({});
            
         return res.render('home',{
                title: "Codeial | Home",
                post: posts,
                all_users: users
            });    
    }catch(err){
         console.log('Error',err);
         return;
    }

 }