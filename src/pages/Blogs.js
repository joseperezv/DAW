import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { db, auth } from '../firebase';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', content: '' });
  const [open, setOpen] = useState(false); // Estado para controlar la apertura y cierre del diálogo

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = db.collection('blogs');
        const snapshot = await blogsRef.get();
        const blogsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error al obtener las entradas de blog:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newBlog.title.trim() === '' || newBlog.author.trim() === '' || newBlog.content.trim() === '') {
      return;
    }

    try {
      const publishDate = new Date();

      const newBlogRef = await db.collection('blogs').add({
        title: newBlog.title,
        author: newBlog.author,
        content: newBlog.content,
        publishDate: publishDate,
      });

      setBlogs((prevBlogs) => [
        ...prevBlogs,
        { id: newBlogRef.id, title: newBlog.title, author: newBlog.author, content: newBlog.content, publishDate: publishDate },
      ]);

      setNewBlog({ title: '', author: '', content: '' }); // Restablecer los campos del formulario
      setOpen(false); // Cerrar el diálogo después de publicar el blog
    } catch (error) {
      console.error('Error al crear la entrada de blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await db.collection('blogs').doc(blogId).delete();

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error al eliminar la entrada de blog:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.paper"
        p={2}
        boxShadow={1}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Blogs
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Publicar
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Publicar blog</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Título"
                margin="normal"
                variant="outlined"
                fullWidth
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              />
              <TextField
                label="Autor"
                margin="normal"
                variant="outlined"
                fullWidth
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              />
              <TextField
                label="Contenido"
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              />
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Publicar
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        {blogs.map((blog) => (
          <Box
            key={blog.id}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="background.paper"
            p={2}
            mt={2}
            boxShadow={1}
          >
            <Typography variant="body1">{blog.title}</Typography>
            <Typography variant="body2">{blog.publishDate.toISOString()}</Typography>
            <Typography variant="body2">{blog.author}</Typography>
            <Typography variant="body2">{blog.content}</Typography>
            {auth.currentUser && auth.currentUser.uid === blog.userId && (
              <Button variant="contained" color="secondary" onClick={() => handleDelete(blog.id)}>
                Eliminar
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Blogs;

