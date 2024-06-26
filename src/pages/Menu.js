import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProdutoRegistro from '../components/produto/ProdutoRegistro';
import ProdutoVincular from '../components/produto/ProdutoVincular';
import ProdutoLista from '../components/produto/ProdutoLista';
import ProdutoListaVinculados from '../components/produto/ProdutoListaVinculados';
import CategoriaRegistro from '../components/categoria/CategoriaRegistro';
import CategoriaLista from '../components/categoria/CategoriaLista';
import { Container } from '@mui/material';
import { Add, AddLink, Category, ViewList } from '@mui/icons-material';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),

}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Menu() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [visivel, setVisivel] = React.useState(5)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function seletorDeComponentes() {
        if (visivel === 1) {
            return <ProdutoRegistro texto={"Cadastro de novos equipamentos"} />
        } else if (visivel === 2) {
            return <ProdutoLista texto={"Lista de Equipamentos Cadastrados"} />
        } else if (visivel === 3) {
            return <CategoriaRegistro texto={"Cadastro de Categorias"} />
        } else if (visivel === 4) {
            return <CategoriaLista texto={"Lista de Categorias"} />
        } else if (visivel === 5) {
            return <ProdutoVincular texto={"Vinculação"} />
        } else {
            return <ProdutoListaVinculados texto={"Lista de Players Vinculados"} />
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                    <img src="https://neooh.com.br/wp-content/themes/neooh/assets/img/logo-white.svg" alt="Logo NEOOH" style={{ width: 300 }} />
                </div>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Gerenciador de Equipamentos - TI
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem onClick={() => { setVisivel(5) }} key={5} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Category />
                            </ListItemIcon>
                            <ListItemText primary={"Vinculação "} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => { setVisivel(6) }} key={6} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Category />
                            </ListItemIcon>
                            <ListItemText primary={"Lista de Vinculados "} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => { setVisivel(1) }} key={1} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddLink />
                            </ListItemIcon>
                            <ListItemText primary={"Cadastro de Equipamentos"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => { setVisivel(2) }} key={2} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary={"Lista de Equipamentos"} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => { setVisivel(3) }} key={3} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ViewList />
                            </ListItemIcon>
                            <ListItemText primary={"Cadastro de Categorias"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => { setVisivel(4) }} key={4} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Category />
                            </ListItemIcon>
                            <ListItemText primary={"Lista de Categorias "} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Container>
                    {
                        seletorDeComponentes()
                    }
                </Container>

            </Main>
        </Box>
    );
}
