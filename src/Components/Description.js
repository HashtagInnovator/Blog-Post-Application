import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Assets/Description.css';

export default function Description() {
  const { code } = useParams();
  const [post, setPost] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [comments, setComments] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isAdmin] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3010/posts/${code}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [code]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setName(user.name);
      setLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3010/comments?postId=${code}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [code]);

  const handleCommentSubmit = () => {
    if (!comment) {
      toast.error('Please fill in your comment.');
      return;
    }

    axios
      .post(`http://localhost:3010/comments`, {
        postId: post.id,
        Name: name,
        body: comment,
        role: loggedIn ? userRole : 'Anonymous', // Use userRole when logged in
      })
      .then(() => {
        toast.success('Comment posted successfully!');
        setComment('');
        axios.get(`http://localhost:3010/comments?postId=${code}`)
          .then((response) => {
            setComments(response.data);
          })
          .catch((error) => {
            console.error('Error fetching comments:', error);
          });
      })
      .catch((error) => {
        console.error('Error posting comment:', error);
        toast.error('Failed to post comment. Please try again later.');
      });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:3010/posts/${code}`)
        .then(() => {
          toast.success("Post deleted successfully!");
          setTimeout(() => {
            window.location.href = "/posts";
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error deleting post. Please try again later.");
          console.error("Error deleting post:", error);
        });
    }
  };

  const handleEditPost = () => {
    // Redirect to /add-posts page with post data
    const editFlag = true;
    window.location.href = `/add-posts/${post.id}/${editFlag}`;
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="description-container">
      <div className="card description-card">
        <div className="post-info">
          <p className="post-date">Date Created: {post.created_at}</p>
          <p className="post-name">Name: {post.post_user}</p>
          <p className="post-email">Email: {post.post_email}</p>
          <h3 className="card-title">{post.title}</h3>
        </div>
        <img src={post.image} className="card-img-top" alt={post.title} />
        {userRole === 'Admin' && (
          <>
            <button className="btn btn-info edit-post" onClick={handleEditPost}>
              Edit This Post
            </button>
            <button className="btn btn-danger delete-post" onClick={handleDeletePost}>
              Delete Post
            </button>
          </>
        )}
        <div className="card-body">
          <p className="card-text">{post.description}</p>

          <div className="mb-4"></div>

          {!loggedIn && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Without login, your post is considered as anonymous"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="comment" className="form-label">Your Comment</label>
            <textarea
              className="form-control"
              id="comment"
              rows="4"
              placeholder="Add your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="button" className="btn btn-primary" onClick={handleCommentSubmit}>
            Post
          </button>
          {loggedIn ? (
            isAdmin && (
              <button className="btn btn-info mx-3">
                <Link to={`/add-posts/${code}`} style={{ color: 'white', textDecoration: 'none' }}>
                  Edit Post
                </Link>
              </button>
            )
          ) : (
            <button className="btn btn-info mx-3">
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
            </button>
          )}

          <div className="container my-5">
            <div className="card comment-card">
              <div className="row">
                <div className="col card-title">
                  <h3 className="text-center comment-header d-flex">Comments</h3>
                </div>
              </div>
              <div className="row my-4">
                <ul>
                  {comments.map((comment) => (
                    <ul key={comment.id}>
                      <div className="row">
                        <div className="col mr-4">
                          <strong className='comment-name'>{comment.Name}</strong>
                        </div>
                        <div className="col comment-role ml-3">
                          <strong>~</strong>
                          {comment.role}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mt-4">
                          <p>{comment.body}</p>
                        </div>
                      </div>
                      <hr className="commentLine"></hr>
                    </ul>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
