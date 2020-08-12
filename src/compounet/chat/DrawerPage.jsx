import React from 'react'
import { connect } from 'react-redux'

import {createCHAT,openChat,deleteChat,fetchChats,signOut,changeLeg } from '../../action'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Icon, Button } from '@material-ui/core';
import history from '../../history';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    alignItems:'center',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(6),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function DrawerPage (props){

 


        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(true);

 
        const handleDrawerOpen = () => {
          setOpen(true);
        };
      
        const handleDrawerClose = () => {
          setOpen(false);
        };
        // const renderImgLeg=()=>{
        //   if(props.leg==='eng'){
        //     return <img src='heb.png' onClick={()=>props.changeLeg('heb')} className='imgLeg' alt='icon for change leg right now eng' />
        //   }
        //   return <img src='uk.png' onClick={()=>props.changeLeg('eng')} className='imgLeg' alt='icon for change leg right now hebrew' />



        // }
 
        const renderLogOut=()=>{
          if(!props.isLogin) return null

       else
       console.log('show')
         return    <ListItem onClick={()=>{history.push('/'); props.signOut()}} button key={'logOut'}>
          <Icon className="fa fa-plus-circle" style={{ fontSize: 30 }} />
          <Button variant="contained" color="secondary" disableElevation>
        Logout
      </Button>
              </ListItem>

        }
        const AddFrindButton=()=>{
          if(!props.isLogin||!props.user) return null
          return    <ListItem onClick={()=>history.push('addFrind')} button key={'addFrind'}>
          <Icon className="fa fa-plus-circle" style={{ fontSize: 30 }} />
          <Button variant="contained" color="primary" disableElevation>
            Add frind
          </Button>
        </ListItem>
        }

        const renderFrindsList=()=>{
          if(!props.isLogin||!props.user) return null
          if(!props.user.frindes) return null
          return props.user.frindes.map((user, index) => (
            <ListItem button key={user._id}>
              <img src={user.imageIcon} alt='profile ' />
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </ListItem>
          ))
        }
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
          {/* {renderImgLeg()}  */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >

                  <MenuIcon />
             
                </IconButton>
         
                <Typography variant="h6" noWrap>
             </Typography>
               
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
         
            
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />

              {renderLogOut()}
              <Divider />

              {AddFrindButton()}
        
              <Divider />
              <List>
              {renderFrindsList()}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
               <div className={classes.drawerHeader} />
              {props.children}
            </main>
          </div>
        );
         
        
        


}
    const mapStateToProps = (state) => ({
        user:state.user,
        isLogin:state.auth.isSignedIn,
        leg:state.leg
    })
    
    

export default connect(mapStateToProps,{changeLeg,createCHAT,openChat,deleteChat,fetchChats,signOut})(DrawerPage);