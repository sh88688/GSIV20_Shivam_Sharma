import React from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

const style = theme => ({
  link:{
    color: "#fff"
  },
  headRoot:{
    backgroundColor : "#4285F4"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
});

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchText: ""
    };
  }
  handleSearch = event =>{
    this.setState({searchText : event.target.value},this.handleCallBack(event.target.value));
  }
  handleCallBack = value =>{
    if(value !== ""){
      this.props.search(value);
    }
    else{
      this.props.fetchAll();
    }
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.headRoot}>
          <Toolbar>
            {this.props.title === "search" ? 
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search"
                  onChange={this.handleSearch}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              :
               <Typography variant="h6">
                 {this.props.title}
              </Typography>}
            <div className={classes.grow} />
            <Link to="/" className={classes.link}>
                <HomeIcon />
            </Link>
           </Toolbar>
        </AppBar>
      </div>
      
    );
  }
 
}

export default withStyles(style)(Header);