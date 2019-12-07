const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){
                    console.log('Error in creating comment');
                    return;
                }

                post.comments.push(comment);
                post.save();

                return  res.redirect('back');
            })
        }

        // return res.redirect('back');
    })
}

module.exports.destroy = function(req,res){
   Comment.findById(req.params.id).populate('post')
   .exec(function(err,comment){
       if(comment.user == req.user.id || comment.post.users == req.user.id){
           let postID = comment.post;
            comment.remove();
            // to pull out this requested comment from array of comment of post to which
            // this comment is made
            Post.findOneAndUpdate(postID,{$pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');  
            })
            
       }else{
        return res.redirect('back');
       }
   })
}