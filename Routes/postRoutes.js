


const express = require('express');
const auth = require('../middlewares/auth');
const Post = require('../models/post');
const User = require('../models/user');

const router = express.Router();



// adding posts.
router.post('/add', auth, async (req, res) => {
    try {
      const { title, content } = req.body;
      const author = req.user.userId;
  
      // Create a new post
      const post = new Post({ title, content, author });
      await post.save();
  
      res.status(200).json({ msg: 'Post added' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });



  // updating the  user's post.
router.patch('/update/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const author = req.user.userId;
  
      // checking that the user wants to updating the post is authenticated or not.
      const post = await Post.findOneAndUpdate({ _id: id, author }, { title, content }, { new: true });
  
      if (!post) {
        return res.status(400).json({ error: 'Post not found or unauthorized' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });  



  // deleting the  post our user.
router.delete('/delete/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const author = req.user.userId;
  
      // checking that post we wants to delete have authenticated user or not.
      const post = await Post.findOneAndDelete({ _id: id, author });
  
      if (!post) {
        return res.status(400).json({ error: 'Post not authorized' });
      }
      res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
