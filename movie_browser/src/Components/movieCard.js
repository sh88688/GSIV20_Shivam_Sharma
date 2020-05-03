import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    margin: '10px'
  },
  title:{
    float: 'left',
    fontWeight: 600,
    maxWidth: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  titleBlock:{
      display: "flow-root"
  },
  overviewBlock:{
    maxHeight: '40px',
    textOverflow: 'ellipsis',
    paddingTop: '8px',
    overflowY: 'hidden',
  },
  vote:{
    float: 'right'
  },
  contentRoot:{
    padding: '10px',
    paddingBottom : '12px !important'
  },
  media: {
    height: 160,
  },
});

export default function MovieCard(props) {
  const classes = useStyles();
  const { poster_path, title, vote_average, id, overview} = props.data;
  const image = (poster_path) ? `http://image.tmdb.org/t/p/w185/${poster_path}`: `https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg`;
  return (
    <Card className={classes.root}>
    <Link to={`/details/${id}`}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
    </CardActionArea>
    </Link>
      <CardContent className={classes.contentRoot}>
        <div className={classes.titleBlock}>
            <Typography variant="body2"  className={classes.title} color="textPrimary" component="h6">
            {title}
            </Typography>
            <Typography variant="body2" className={classes.vote} color="textSecondary" component="p">
            {vote_average ? vote_average : null}
            </Typography>
        </div>
        <div className={classes.overviewBlock}>
            <Typography variant="body2" color="textSecondary">
                {overview}
            </Typography>

        </div>

      </CardContent>
  </Card>
  );
}