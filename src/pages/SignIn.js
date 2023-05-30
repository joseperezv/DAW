import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useIdentity } from '../providers/IdentityProvider';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { updateIdentity } = useIdentity();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            updateIdentity(user); // Update the identity with the signed-in user
            navigate('/'); // Navigate to the root path
        } catch (error) {
            console.error('Error signing in with email and password', error);
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
                    Iniciar sesión
                </Typography>
                <TextField
                    label="Correo electrónico"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Iniciar sesión
                    </Button>
                </Box>
                <Typography variant="body1" align="center">
                    ¿No tienes una cuenta? <Link to="/signup">Registrarse</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default SignIn;
