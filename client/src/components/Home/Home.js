import React,{useEffect,useState} from 'react';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


import {Posts, Form, Pagination} from '../../components';
import {getPosts,getPostsBySearch} from '../../actions/posts';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

 
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  };
  const handleDeleteChip = (chip) => {
    setTags(tags.filter((tag) => tag!== chip));
  };
  return (
    <Grow in>
    <Container maxWidth='xl'>
      <Grid container  justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}} />     
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
          </AppBar>
          <Form  currentId={currentId} setCurrentId={setCurrentId} />
           <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
            </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home