import React,{useEffect} from 'react';
import {Container, AppBar, Typography, Grow, Grid, ListItem} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import {getPosts} from './actions/posts'
import {Posts, Form} from './components'
import {memories} from './images';
import useStyles from './styles';


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])
  

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align="center"> Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <ListItem xs={12} sm={7}>
              <Posts />
            </ListItem>
            <ListItem xs={12} sm={7}>
              <Form />
            </ListItem>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App