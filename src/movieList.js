import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import Header from './Components/header';
import MovieCard from './Components/movieCard';
import { apiKey } from './Configs/appConfig';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

function fetchMovies(){
  
  return dispatch => {
    console.log('FETC => ',dispatch);
  const url = new URL(`https://api.themoviedb.org/3/list/1?api_key=${apiKey}`);
  const fetchCallOptions = {
  method: "GET",
  headers: {
  'Content-Type': 'application/json',
  },
  };
  fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
    console.log('DATA',data);
    dispatch({type : 'MOVIE_LIST',movieList : data.items,loading : false});
  }).catch((error) => {
    console.error('Error:', error);
  });

  }
}
function  searchMovies(searchInput){
  return dispatch => {
    console.log('SETC => ',dispatch);
      if(searchInput !== ""){
        const url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`);
        const fetchCallOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        };
        fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
          dispatch({type : 'SEARCH_MOVIE',movieList : data.results,loading : false});
        }).catch((error) => {
          console.error('Error:', error);
        });
      }
  }
}
class MovieList extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      movieList : [],
      loading : true
    };
  }

  componentDidMount(){
    this.props.fetchMovies();
  }

  render(){
    const { classes } = this.props;
    const loader = this.props.loading ? <div className={classes.loader}><CircularProgress color="secondary" /></div>: null;
    return (
            <>
                <Header title="search" fetchAll={this.props.fetchMovies} search={this.props.searchMovies}  />
                {loader}
                <Grid container className={classes.root} justify="center" spacing={1}>
                {this.props.movieList.map((movie, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                    <MovieCard data={movie} />
                  </Grid>
                ))}
                {(!this.props.movieList.length && !this.props.loading) &&
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
const mapStateToProps = state => {
  console.log('map state to prop ',state);
  return {
    loading: state.loading,
    movieList: state.movieList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies : bindActionCreators(fetchMovies, dispatch),
    searchMovies : bindActionCreators(searchMovies, dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(MovieList));