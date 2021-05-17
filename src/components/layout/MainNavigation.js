import {
  AppBar,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    padding: 0,
  },
  appBarText: {
    fontFamily: '"Montserrat"',
    letterSpacing: 3,
    flexGrow: 1,
    color: '#fff',
    textDecoration: 'none',
  },
  list: {
    width: 250,
  },
  closeBtn: {
    fontSize: 40,
  },
  openBtn: {
    fontSize: 30,
  },
  menuLink: {
    color: theme.palette.secondary.dark,
    textDecoration: 'none',
  },
}));

const MainNavigation = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navigate = (uri) => () => {
    handleDrawerClose();
    history.push(uri);
  };

  const itemsList = [
    {
      text: 'Add delivery',

      onClick: navigate('/deliveries/add'),
    },
    {
      text: 'Contact',
      onClick: navigate('/asd'),
    },
  ];

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container fixed>
        <Toolbar className={classes.toolBar}>
          <Typography
            variant="h6"
            className={classes.appBarText}
            component={Link}
            to="/"
          >
            VIDDL
          </Typography>
          <IconButton onClick={handleDrawerOpen} color="inherit">
            <MenuIcon className={classes.openBtn} />
          </IconButton>
          <Drawer
            variant="persistent"
            className={classes.drawer}
            anchor="right"
            open={drawerOpen}
          >
            <div>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon className={classes.closeBtn} />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.list}>
              {itemsList.map((item) => {
                const { text, onClick } = item;
                return (
                  <ListItem button key={text} onClick={onClick}>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavigation;
