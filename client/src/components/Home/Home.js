import React,{useEffect,useState} from 'react';
import {Container, Grow, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import {Posts, Form} from '../../components';
import {getPosts} from '../../actions/posts';
import useStyles from './styles';

const Home = () => {

  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,dispatch])

  return (
    <Grow in>
    <Container>
      <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} md={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Form  currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home