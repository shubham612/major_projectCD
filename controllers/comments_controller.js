const Comment = require('../models/comment');
const Post = require('../models/post');


// ************ COMMENT CREATION WITHOUT ASYNC-AWAIT *********
// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 if(err){
//                     console.log('Error in creating comment');
//                     return;
//                 }

//                 post.comments.push(comment);
//                 post.save();

//                 return  res.redirect('back');
//             })
//         }

//         // return res.redirect('back');
//     })
// }

// **************** COMMENT CREATION MODIFIED WITH ASYN-AWAIT
module.exports.create = async  function(req,res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){
           let comment = await  Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

             post.comments.push(comment);
             post.save();

             if(req.xhr){
                 return res.status(200).json({
                     data: {
                         comment: comment
                     },
                     message: 'Comment created!'
                 });
             }

             return  res.redirect('/');

        }

    }catch(err){
        console.log('Error',err);
        return;
    }


}


// ********  COMMENT DESTROY WTHOUT ASYNC-AWAIT ******
// module.exports.destroy = function(req,res){
//    Comment.findById(req.params.id).populate('post')
//    .exec(function(err,comment){
//        if(comment.user == req.user.id || comment.post.users == req.user.id){
//            let postID = comment.post;
//             comment.remove();
//             // to pull out this requested comment from array of comment of post to which
//             // this comment is made
//             Post.findOneAndUpdate(postID,{$pull: {comments: req.params.id}},function(err,post){
//                 return res.redirect('back');  
//             })
            
//        }else{
//         return res.redirect('back');
//        }
//    })
// }


// ************* MODIFIED CODE FOR COMMENT-DELETION WITH ASYN AWAIT

module.exports.destroy = async function(req,res){
      

    try{

        let comment = await Comment.findById(req.params.id);
    
        if(comment.user == req.user.id ){
            let postID = comment.post;
             comment.remove();
             // to pull out this requested comment from array of comment of post to which
             // this comment is made
             
             let post = await Post.findByIdAndUpdate(postID,{$pull: {comments: req.params.id}});
                 return res.redirect('/');  
             
        }else{
         return res.redirect('/');
        }

    }catch(err){
        console.log('Error',err);
        return;
    }
    
 }