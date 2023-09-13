import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function AddPosts() {
  const { postId, edit } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    description: "",
  });

  // Store original post creator's data
  const [originalPostData, setOriginalPostData] = useState({
    post_email: "",
    post_name: "",
    created_at: "",
  });

  useEffect(() => {
    if (edit === "true" && postId) {
      axios
        .get(`http://localhost:3010/posts/${postId}`)
        .then((response) => {
          const post = response.data;
          setFormData({
            title: post.title,
            category: post.category,
            imageUrl: post.image,
            description: post.description,
          });

          // Store original post creator's data
          setOriginalPostData({
            post_email: post.post_email,
            post_name: post.post_user,
            created_at: post.created_at,
          });
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [edit, postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userEmail = "";
    let userName = "";
    let createdDate = "";

    const userString = localStorage.getItem("user");

    if (!userString) {
      console.error("User data is not set in localStorage.");
      // Handle this case appropriately.
      return;
    }

    const user = JSON.parse(userString);

    // Now you can access user.email and user.name.
    userEmail = user.email;
    userName = user.name;

    if (edit === "true") {
      // When editing, use the original post creator's data
      userEmail = originalPostData.post_email;
      userName = originalPostData.post_name;
      createdDate = originalPostData.created_at;

      // Make a PUT request to update the existing post
      axios
        .put(`http://localhost:3010/posts/${postId}`, {
          title: formData.title,
          category: formData.category,
          image: formData.imageUrl,
          description: formData.description,
          post_email: userEmail,
          post_user: userName,
          created_at: createdDate, // Ensure that created_at is sent in the PUT request
        })
        .then((response) => {
          toast.success("Post edited successfully!");
          console.log("Post edited successfully:", response.data);
        })
        .catch((error) => {
          toast.error("Error editing post. Please try again later.");
          console.error("Error editing post:", error);
        });
    } else {
      createdDate = formatDate(new Date().toISOString()); // Format the date

      // Make a POST request to create a new post
      axios
        .post("http://localhost:3010/posts", {
          title: formData.title,
          category: formData.category,
          image: formData.imageUrl,
          description: formData.description,
          created_at: createdDate,
          post_email: userEmail,
          post_user: userName,
        })
        .then((response) => {
          toast.success("Post created successfully!");
          console.log("Post created successfully:", response.data);
        })
        .catch((error) => {
          toast.error("Error creating post. Please try again later.");
          console.error("Error creating post:", error);
        });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="AddPosts">
      <div className="container post-container">
        <div className="card addPostCard">
          <div className="card-title">
            <h2 className="addPostHeader">{edit === "true" ? "Edit Post" : "Create Post"}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group post-group row mt-4">
              <div className="col-sm-12">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={formData.title}
                  style={{ width: "500px" }}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group post-group row mt-4">
              <div className="col-sm-12">
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: "500px" }}
                >
                  <option value="technical">Technical</option>
                  <option value="trading">Trading</option>
                  <option value="astronomy">Astronomy</option>
                  <option value="global-news">Global News</option>
                </select>
              </div>
            </div>
            <div className="form-group post-group row mt-4">
              <div className="col-sm-12">
                <input
                  type="text"
                  name="imageUrl"
                  className="form-control"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  style={{ width: "500px" }}
                />
              </div>
            </div>
            <div className="form-group post-group row mt-4">
              <div className="col-sm-12">
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ height: "150px", width: "500px" }}
                  required
                ></textarea>
              </div>
            </div>
            {edit === "true" && (
              <div className="form-group post-group row mt-4">
                <div className="col-sm-12">
                  <label>Created Date:</label>
                  <input
                    type="text"
                    name="created_at"
                    className="form-control"
                    value={formatDate(originalPostData.created_at)}
                    style={{width:"500px"}}
                    readOnly
                  />
                </div>
              </div>
            )}
            <div className="form-group  row mt-4">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-lg"
                >
                  {edit ? "Edit" : "Create"} Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
