// ********* module.exports.actionName = function(req,res){} ********************

const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.home = function(req,res){

   // populate the user of each post
   Post.find({}).populate('users')
   .populate({
       path: 'comments',
       populate: {
           path: 'user'
       }
   })
   .exec(function(err,posts){
       if(err){
           console.log('error in finding post');
           return;
       }



      User.find({},function(err,user){
       
        return  res.render('home',{
              title: "Codeial | Home",
              post: posts,
              all_users: user
          });

      });
   });
}