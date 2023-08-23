import React, { useState, useEffect } from 'react';

import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { collection, getDocs, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useIdentity } from '../providers/IdentityProvider';

function Blogs() {
  const { user } = useIdentity();
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogText, setNewBlogText] = useState('');
  const [editingBlogId, setEditingBlogId] = useState('');
  const [editedBlogText, setEditedBlogText] = useState('');
  const [editedBlogTitle, setEditedBlogTitle] = useState('');

  const handlePublish = async () => {
    if (newBlogText.trim() !== '') {
      try {
        await addDoc(collection(db, 'blogs'), {
          title: newBlogTitle,
          text: newBlogText,
          createdAt: serverTimestamp(),
          createdBy: user.email,
        });
        setNewBlogTitle('');
        setNewBlogText('');
        fetchBlogs();
      } catch (error) {
        console.error('Error creating blog:', error);
      }
    }
  };

  const fetchBlogs = async () => {
    try {
      const blogsRef = collection(db, 'blogs');
      const snapshot = await getDocs(blogsRef);
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleEdit = (blogId, currentText, currentTitle) => {
    setEditingBlogId(blogId);
    setEditedBlogText(currentText);
    setEditedBlogTitle(currentTitle);
  };

  const handleSaveEdit = async (blogId) => {
    try {
      const blogRef = doc(db, 'blogs', blogId);
      await updateDoc(blogRef, {
        text: editedBlogText,
      });
      setEditingBlogId('');
      setEditedBlogText('');
      setEditedBlogTitle('');
      fetchBlogs();
    } catch (error) {
      console.error('Error saving edited blog:', error);

    }
  };

  const handleDelete = async (blogId) => {
    try {

      await deleteDoc(doc(db, 'blogs', blogId));
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center' }}>
        Blogs
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Title"
          value={newBlogTitle}
          onChange={(e) => setNewBlogTitle(e.target.value)}
        />
        <br />
        <textarea
          value={newBlogText}
          onChange={(e) => setNewBlogText(e.target.value)}
          placeholder="Write your blog..."
          rows="4"
          cols="50"
        />
        <br />
        {editingBlogId ? (
          <Button variant="contained" color="primary" onClick={() => handleSaveEdit(editingBlogId)}>
            Save
          </Button>
        ) : (
          <button onClick={handlePublish}>Publish</button>
        )}
      </div>
      <div>
        {blogs.map((blog) => (
          <Card key={blog.id} style={{ margin: '10px 0' }}>
            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body1" gutterBottom>
                {blog.text}
              </Typography>
              <Typography variant="caption">
                Created At: {blog.createdAt ? blog.createdAt.toDate().toLocaleString() : 'N/A'}
                {' by '}
                {blog.createdBy}
              </Typography>
              {user && blog.createdBy === user.email && (
                <div>
                  {editingBlogId === blog.id ? (
                    <div>
                      <input
                        type="text"
                        value={editedBlogTitle}
                        onChange={(e) => setEditedBlogTitle(e.target.value)}
                      />
                      <br />
                      <textarea
                        value={editedBlogText}
                        onChange={(e) => setEditedBlogText(e.target.value)}
                        rows="4"
                        cols="50"
                      />
                      <br />
                      <Button variant="contained" color="primary" onClick={() => handleSaveEdit(blog.id)}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(blog.id, blog.text, blog.title)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(blog.id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Blogs;
