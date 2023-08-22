import React, { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { UserLevels, UserRoles } from '../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useIdentity } from '../providers/IdentityProvider';

function SignUp() {

  const { updateIdentity } = useIdentity();
  const navigate = useNavigate();

  const [level, setLevel] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

  
  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a new user in your users collection
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        lastName: lastName,
        level: level,
        email: email,
        role: UserRoles.USUARIO
      });

      updateIdentity(user);
      navigate('/');

    } catch (error) {
      console.error('Error signing up with email and password', error);
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
          Registrarse
        </Typography>
        <TextField
          label="Nombre"
          margin="normal"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Apellido"
          margin="normal"
          variant="outlined"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="user-level-label">Nivel</InputLabel>
          <Select
            labelId="user-level-label"
            value={level}
            onChange={handleChange}
            label="Nivel"
          >
            {Object.values(UserLevels).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onChange={handlePasswordChange}
        />
        {!passwordValid && (
          <Typography variant="body2" color="error">
            La contraseña debe tener al menos 8 caracteres y al menos una letra mayúscula.
          </Typography>
        )}
        <Box mt={2}>
        <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!passwordValid}
          >
            Registrarse
          </Button>

        </Box>
        <Typography variant="body1" align="center">
          ¿Ya tienes una cuenta? <Link to="/signin">Iniciar sesión</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignUp