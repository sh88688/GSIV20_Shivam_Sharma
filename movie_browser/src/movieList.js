import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import Header from './Components/header';
import MovieCard from './Components/movieCard';
import { apiKey } from './Configs/appConfig';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = theme => ({
root:{
  width: '100%',
  marginTop: "70px"
},
alignc:{
  textAlign: 'center',
},
loader:{
  textAlign: 'center',
  marginTop: '80px',
},
});

class MovieList extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      movieList : [],
      loading : true
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
      this.setState({movieList : data.items, loading : false});
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
    const loader = this.state.loading ? <div className={classes.loader}><CircularProgress color="secondary" /></div>: null;
    return (
            <>
                <Header title="search" search={this.searchMovies} />
                {loader}
                <Grid container className={classes.root} justify="center" spacing={1}>
                {this.state.movieList.map((movie, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                    <MovieCard data={movie} />
                  </Grid>
                ))}
                {(!this.state.movieList.length && !this.state.loading) &&
                  <Grid item xs={12}>
                    <Typography className={classes.alignc} variant="h6" component="h6">
                    No record found.
                    </Typography>
                  </Grid>
                }
                </Grid>
            </>
    );
  }
 
}

export default withStyles(style)(MovieList);