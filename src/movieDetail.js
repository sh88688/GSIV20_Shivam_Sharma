import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import Header from './Components/header';
import { apiKey } from './Configs/appConfig';
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const style = theme => ({
root:{
  width: '100%',
  marginTop: "70px",
  padding: "20px"
},
flex02:{
  flexGrow : 0.02
},
cast:{
  maxWidth: "300px",
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
},
loader:{
  textAlign: 'center',
  marginTop: '80px',
},
flexBlock:{
  display:"flex",
  marginBottom:"10px",
  alignItems: "center"
}
});
function runtime(time){
  return `${Math.floor(time/60)}h ${(time%60)}m`;
}
function fetchMovieDetail(id){
  return dispatch => {
    dispatch({type: "PROCESSING_START",loading : true});
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    const fetchCallOptions = {
    method: "GET",
    headers: {
    'Content-Type': 'application/json',
    },
    };
    fetch(url , fetchCallOptions).then(res => res.json()).then(dataMovie =>{
      console.log('DATA_MOVIE', dataMovie);
      dispatch({type : 'MOVIE_DETAIL', movie : dataMovie});
    }).catch((error) => {
          console.error('Error:', error);
    });
  }
}
function fetchMovieCast(id){
  return dispatch => { 
    const urlCast = new URL(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
    const fetchCallOptions = {
    method: "GET",
    headers: {
    'Content-Type': 'application/json',
    },
    };
    fetch(urlCast , fetchCallOptions).then(res => res.json()).then(dataCast =>{
      dispatch({type : 'MOVIE_CAST',cast: dataCast.cast,loading : false});
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
class MovieDetail extends React.Component {

  componentDidMount(){
    this.props.fetchMovieDetail(this.props.match.params.id);
    this.props.fetchMovieCast(this.props.match.params.id);
  }
  render(){
    const { classes } = this.props;
    const loader = this.props.loading ? <div className={classes.loader}><CircularProgress color="secondary" /></div>: null;
     return (
            <>
                <Header title="Movie Detail" search={this.searchMovies} />
                {loader}
                {(this.props.movie !== null && !this.props.loading) && 
                <Grid container className={classes.root} justify="center" spacing={0}>
                  <Grid item xs={12} sm={4} lg={2} md={3}>
                     <img src={`http://image.tmdb.org/t/p/w185/${this.props.movie.poster_path}`} alt='f' />
                  </Grid>
                  <Grid item xs={12} sm={8} lg={10} md={9}>
                    <div className={classes.flexBlock}>
                        <Typography className={classes.flex02} variant="h6" >
                          {this.props.movie.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`(${this.props.movie.vote_average})`}
                        </Typography>
                    </div>
                    <div className={classes.flexBlock}>
                        <Typography className={classes.flex02} variant="body2" >
                          {`${this.props.movie.release_date} | ${runtime(this.props.movie.runtime)} | Director`}
                        </Typography>
                    </div>
                    <div className={classes.flexBlock}>
                        <Typography className={classes.cast} variant="body2" >
                        <b>Cast </b>{this.props.cast && this.props.cast.reduce((cast , prev) => `${cast} ${prev.name},`,':')}
                        </Typography>
                    </div>
                        <Typography variant="body2" className={classes.flex02} >
                        <b>Description : </b> <span style={{color: '#504d4d'}}>{this.props.movie.overview}</span>
                        </Typography>
                  </Grid>
                </Grid>}
            </>
    );
  }
 
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    cast: state.cast,
    movie: state.movie
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovieDetail : bindActionCreators(fetchMovieDetail, dispatch),
    fetchMovieCast : bindActionCreators(fetchMovieCast, dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(withRouter(MovieDetail)));