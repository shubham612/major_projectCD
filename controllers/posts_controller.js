const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
   try{
   
     let post = await Post.create({
        content: req.body.content,
        users: req.user._id
     });

     if(req.xhr){
         return res.status(200).json({
             data: {
                 post: post
             },
             message: "Post Created!"
         })
     }

     return res.redirect('back');

   }catch(err){
       console.log('Error',err);
       return;
   }
}

// *************** CODE WITHOUT ASYNC-AWAIT FOR DELETION OF POST ***************


// module.exports.destroy = function(req,res){

//     Post.findById(req.params.id,function(err,post){
//         // .id means converting object id into string
//         if(post.users == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })

// }



// ************* MODIFIED CODE FOR DELETION WITH ASYNC-AWAIT ********

module.exports.destroy = async function(req,res){

    try{

        let post = await Post.findById(req.params.id);

        if(post.users == req.user.id){
            post.remove();

            await  Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post Deleted!'
                });
            }
            
           return res.redirect('back');
        
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error',err);
        return;
    }

}







