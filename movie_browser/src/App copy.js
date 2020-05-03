import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import Header from './Components/header';
import MovieCard from './Components/movieCard';
import { apiKey } from './Configs/appConfig';
import { Typography } from '@material-ui/core';

const style = theme => ({
root:{
  width: '100%'
}
});

class List extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      movieList : []
    };
  }
  componentDidMount(){
    this.fetchMovies();
  }
  fetchMovies = () =>{
    const url = new URL(`https://api.themoviedb.org/3/list/1?api_key=${apiKey}`);
    const fetchCallOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
      console.log('DATA',data);
      this.setState({movieList : data.items});
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  searchMovies = searchInput => {
    if(searchInput !== ""){
      const url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`);
      const fetchCallOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
        this.setState({movieList : data.results});
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
    else{
      this.fetchMovies();
    } 
  }
  render(){
    const { classes } = this.props;
    return (
            <>
                <Header search={this.searchMovies} />
                <Grid container className={classes.root} justify="center" spacing={1}>
                {this.state.movieList.map((movie, index) => (
                  <Grid key={index} item xs={2}>
                   <MovieCard data={movie} />
                  </Grid>
                ))}
                {!this.state.movieList.length &&
                  <Grid item xs={12}>
                    <Typography variant="body2" component="h5">
                    No record found.
                    </Typography>
                  </Grid>
                }
                </Grid>
            </>
    );
  }
 
}

export default withStyles(style)(List);