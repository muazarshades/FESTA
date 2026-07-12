const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL POSTS WITH REPLIES

router.get("/all", (req, res) => {
  const sql = `
    SELECT * FROM ForumPosts
    ORDER BY post_id DESC
  `;

  db.query(sql, (err, posts) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }

    const replySql = `
      SELECT * FROM ForumReplies
    `;

    db.query(replySql, (err, replies) => {
      if (err) {
        console.log(err);
        return res.json([]);
      }

      const formattedPosts = posts.map((post) => {
        return {
          ...post,
          replies: replies.filter((reply) => reply.post_id === post.post_id),
        };
      });

      res.json(formattedPosts);
    });
  });
});

// CREATE POST

router.post("/create", (req, res) => {
  const { user_id, title, content } = req.body;

  const sql = `
    INSERT INTO ForumPosts
    (
      user_id,
      title,
      content
    )
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, title, content], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
      });
    }

    res.json({
      success: true,
      message: "Post added successfully",
    });
  });
});

// ADD REPLY

router.post("/reply", (req, res) => {
  const { post_id, user_id, content } = req.body;

  const sql = `
    INSERT INTO ForumReplies
    (
      post_id,
      user_id,
      content
    )
    VALUES (?, ?, ?)
  `;

  db.query(sql, [post_id, user_id, content], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
      });
    }

    res.json({
      success: true,
      message: "Reply added successfully",
    });
  });
});

module.exports = router;
