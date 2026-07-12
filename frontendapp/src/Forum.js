import { useEffect, useState } from "react";
import axios from "axios";

function Forum() {
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    user_id: 1,
    title: "",
    content: "",
  });

  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/forum/all");

      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      await axios.post("http://localhost:5000/api/forum/create", form);

      alert("Discussion posted");

      setForm({
        user_id: 1,
        title: "",
        content: "",
      });

      fetchPosts();
    } catch (err) {
      console.log(err);

      alert("Failed to post");
    }
  };

  const addReply = async (post_id) => {
    try {
      await axios.post("http://localhost:5000/api/forum/reply", {
        post_id,
        user_id: 1,
        content: replyInputs[post_id],
      });

      alert("Reply added");

      setReplyInputs({
        ...replyInputs,
        [post_id]: "",
      });

      fetchPosts();
    } catch (err) {
      console.log(err);

      alert("Failed to add reply");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Discussion Forum</h1>

      <input
        placeholder="Question Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Ask your question"
        value={form.content}
        onChange={(e) =>
          setForm({
            ...form,
            content: e.target.value,
          })
        }
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={addPost}
        style={{
          padding: "10px 20px",
          marginBottom: "30px",
        }}
      >
        Post Question
      </button>

      <hr />

      <h2>All Discussions</h2>

      {posts.map((post) => (
        <div
          key={post.post_id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <h4>Replies</h4>

          {post.replies && post.replies.length > 0 ? (
            post.replies.map((reply) => (
              <div
                key={reply.reply_id}
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                {reply.content}
              </div>
            ))
          ) : (
            <p>No replies yet</p>
          )}

          <textarea
            placeholder="Write reply"
            value={replyInputs[post.post_id] || ""}
            onChange={(e) =>
              setReplyInputs({
                ...replyInputs,
                [post.post_id]: e.target.value,
              })
            }
            style={{
              width: "100%",
              height: "70px",
              marginTop: "10px",
              padding: "10px",
            }}
          />

          <button
            onClick={() => addReply(post.post_id)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
            }}
          >
            Reply
          </button>
        </div>
      ))}
    </div>
  );
}

export default Forum;
