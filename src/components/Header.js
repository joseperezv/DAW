import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Rutinas', 'Dietas', 'Blogs', 'Admin'];
const settings = ['Perfil', 'Cerrar Sesión'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color='primary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <IconButton
                        size="large"
                        aria-label="open navigation"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        keepMounted
                        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} component={RouterLink} to={`/${page.toLowerCase()}`}>
                                {page}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page} color="inherit" component={RouterLink} to={`/${page.toLowerCase()}`}>
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleOpenUserMenu}
                        color="inherit"
                    >
                        <Avatar alt="User Avatar" />
                    </IconButton>
                    <Menu
                        id="menu-appbar-user"
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu} component={RouterLink} to={`/${setting.toLowerCase().replace(' ', '')}`}>
                                {setting}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;