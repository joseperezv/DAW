import React, { useState, useEffect } from 'react';
import {

  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { UserLevels, UserRoles } from '../constants/constants';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Admin() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = async (userEmail) => {
    try {
      const userQuery = collection(db, 'users');
      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs.find((doc) => doc.data().email === userEmail);

      if (userDoc) {
        await deleteDoc(doc(db, 'users', userDoc.id));
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (userEmail) => {
    const userToEdit = users.find((user) => user.email === userEmail);
    setEditingUser(userToEdit);
  };

  const handleSaveEdit = async () => {
    try {
      const userQuery = collection(db, 'users');
      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs.find((doc) => doc.data().email === editingUser.email);

      if (userDoc) {
        const userRef = doc(db, 'users', userDoc.id);
        await setDoc(userRef, {
          name: editingUser.name,
          lastName: editingUser.lastName,
          role: editingUser.role,
          level: editingUser.level,
          email: editingUser.email,
        });

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.email === editingUser.email ? editingUser : user))
        );

        setEditingUser(null);
      } else {
        console.error('User not found.');
      }
    } catch (error) {
      console.error('Error saving edited user:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Administración de Usuarios
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Correo electrónico</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  {editingUser && editingUser.email === user.email ? (
                    <input
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser.email === user.email ? (
                    <input
                      value={editingUser.lastName}
                      onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    />
                  ) : (
                    user.lastName
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser.email === user.email ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                      {Object.values(UserRoles).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser.email === user.email ? (
                    <select
                      value={editingUser.level}
                      onChange={(e) => setEditingUser({ ...editingUser, level: e.target.value })}
                    >
                      {Object.values(UserLevels).map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.level
                  )}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {editingUser && editingUser.email === user.email ? (
                    <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                      Guardar
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(user.email)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(user.email)}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Admin;
