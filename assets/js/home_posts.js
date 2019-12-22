{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
  
        newPostForm.submit(function(e){
          e.preventDefault();
            $.ajax({
               type: 'post',
               url: '/posts/create',
               data: newPostForm.serialize(),    
               success: function(data){
                 console.log(data);
                  let newPost = newPostDom(data.data.post);
                  $('#fetch-post>ul').prepend(newPost);
                  // passing the delete link to delete function inside dynamically created post
                  deletePost($(" .delete-post-btn",newPost));
              }, error: function(err){
                 console.log(err.responseText);
              }
          });
        });
  
       
     }


     let newPostDom = function(i){
     
        return $(`<li id="post-${i._id}">
           <small>
               <a class="delete-post-btn" href="/posts/destroy/${i._id}">Delete</a>
           </small>
  
        <p>${i.content}</p>
        <p>${i.users.name}</p>
        <div class="post-comments">
            
              <form action="/comments/create"  method="POST">
                 <input type="text" name="content" placeholder="Type here to add comment....">
                 <input type="hidden" name="post" value="${i._id}">
                 <input type="submit" value="comment">
              </form>
               
          
              <div id="post-comment-list">
               <ul id="post-comment-${i._id}">
               </ul>
       
           </div>
        </div>
       </li>`)
    }


 // Method to delete the Post from DOM

  let deletePost = function(deleteLink){
   $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
         type: 'get',
         url: $(deleteLink).prop('href'),
         success: function(data){
               $(`#post-${data.data.post_id}`).remove();
         },error: function(error){
            console.log(error.responseText);
         }

      })
   })
}

 


  // Method to create comments

  let createComment = function(){
     newCommentForm = $('#new-comment-form');

     newCommentForm.submit(function(e){
        e.preventDefault();
        $.ajax({
           type: 'post',
           url: '/comments/create',
           data: newCommentForm.serialize(),
           success: function(data){
              console.log(data);
              let newComment = newCommentDom(data.data.comment);
              $('#post-comment-list>ul').prepend(newComment);
           },error: function(err){
              console.log(err.responseText);
           }
        });
     });
  }

 // CREATE COMMENT DOM

 let newCommentDom = function(comment){

   return $(`<li id="comment-${comment._id}">
      <small><a href="/comments/destroy/${comment._id}">X</a></small>
       <p>
          ${comment.content}
          <br>
          <small>${comment.user.name}</small>
       </p>

    </li>`)
  }


     createPost();
     createComment();
}