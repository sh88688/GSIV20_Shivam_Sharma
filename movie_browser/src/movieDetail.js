import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import Header from './Components/header';
import { apiKey } from './Configs/appConfig';
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';

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
class MovieDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        movie : null,
        cast : null,
        loading: true
    }

  }
  componentDidMount(){
    this.fetchMovieDetail(this.props.match.params).then(data =>{
      this.setState({movie : data[0], cast : data[1], loading : false});
    });
  }
  fetchMovieDetail = ({ id }) =>{
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    const urlCast = new URL(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
    const fetchCallOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let promiseArr = [];
    promiseArr.push(
      new Promise((resolve, reject) =>{
        fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
          resolve(data);
    
        }).catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
      }));
    promiseArr.push(
      new Promise((resolve, reject) =>{
        fetch(urlCast , fetchCallOptions).then(res => res.json()).then(data =>{
          resolve(data.cast);
    
        }).catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
      }));
    return Promise.all(promiseArr);
  }

  render(){
    const { classes } = this.props;
    const loader = this.state.loading ? <div className={classes.loader}><CircularProgress color="secondary" /></div>: null;
     return (
            <>
                <Header title="Movie Detail" search={this.searchMovies} />
                {loader}
                {(this.state.movie && !this.state.loading) && 
                <Grid container className={classes.root} justify="center" spacing={0}>
                  <Grid item xs={12} sm={4} lg={2} md={3}>
                     <img src={`http://image.tmdb.org/t/p/w185/${this.state.movie.poster_path}`} alt='f' />
                  </Grid>
                  <Grid item xs={12} sm={8} lg={10} md={9}>
                    <div className={classes.flexBlock}>
                        <Typography className={classes.flex02} variant="h6" >
                          {this.state.movie.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`(${this.state.movie.vote_average})`}
                        </Typography>
                    </div>
                    <div className={classes.flexBlock}>
                        <Typography className={classes.flex02} variant="body2" >
                          {`${this.state.movie.release_date} | ${runtime(this.state.movie.runtime)} | Director`}
                        </Typography>
                    </div>
                    <div className={classes.flexBlock}>
                        <Typography className={classes.cast} variant="body2" >
                        <b>Cast </b>{this.state.cast && this.state.cast.reduce((cast , prev) => `${cast} ${prev.name},`,':')}
                        </Typography>
                    </div>
                        <Typography variant="body2" className={classes.flex02} >
                        <b>Description : </b> <span style={{color: '#504d4d'}}>{this.state.movie.overview}</span>
                        </Typography>
                  </Grid>
                </Grid>}
            </>
    );
  }
 
}

export default withStyles(style)(withRouter(MovieDetail));