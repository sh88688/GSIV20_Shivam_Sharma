import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import Header from './Components/header';
import { apiKey } from './Configs/appConfig';
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router";

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
        cast : null
    }

  }
  componentDidMount(){
    this.fetchMovieDetail(this.props.match.params);
    this.fetchMovieCast(this.props.match.params);
  }
  fetchMovieDetail = ({ id }) =>{
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    const fetchCallOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
      console.log('Movie DATA',data);
      this.setState({movie : data});

    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  fetchMovieCast= ({ id }) =>{
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
    const fetchCallOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url , fetchCallOptions).then(res => res.json()).then(data =>{
      console.log('Movie DATA',data);
      this.setState({cast : data.cast});

    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  render(){
    const { classes } = this.props;
     return (
            <>
                <Header title="Movie Detail" search={this.searchMovies} />
                {this.state.movie &&  <Grid container className={classes.root} justify="center" spacing={0}>
                  <Grid item xs={2}>
                     <img src={`http://image.tmdb.org/t/p/w185/${this.state.movie.poster_path}`} alt='f' />
                  </Grid>
                  <Grid item xs={10}>
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