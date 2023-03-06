import React,{useState} from 'react';
import{Avatar,Button,Grid,Paper,Typography,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

import Input from './Input';
import {signin, signup} from '../../actions/auth';
import useStyles from './Styles';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();
 
  const handleSubmit= (e)=>{
    e.preventDefault();
    if(isSignUp){
      dispatch(signup(formData, history))
    }else{
      dispatch(signin(formData, history))
    }
  }
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }
  const handleShowPassword = () =>{
    setShowPassword((prevShowPassword)=> !prevShowPassword);
  }

  const SwitchMode = () => {
    setIsSignUp((previousIsSignup)=> !previousIsSignup)
  }
  
  const googleSuccess = async (res) =>{
    var result = jwt_decode(res?.credential); 
    let token = res?.credential;
    try {
      dispatch({type : 'AUTH', data:{ result, token}});

      history.push('/');
    } catch (error) {
      console.log(error)
    }

  }
  const googleError = (err) => {
    console.log(err)
    console.log("Google sign in was unsuccessful. Try again Later");
  }

  return (
    <Container component='main' with='md' >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp? 'Sign up' : 'Sign in'} </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          { isSignUp && (
            <>
                <Input name='firstName' label='first name' handleChange={handleChange} autoFocus half />
                <Input name='LastName' label='last name' handleChange={handleChange}  half />
            </>
          )}
           <Input name='email' label='email address' handleChange={handleChange}  type='email' />
           <Input name='password' label='Password' handleChange={handleChange}  type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
          {isSignUp && (
            <Input name='confirmPassword' label='repeat password' handleChange={handleChange} type='password' />
          )}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
          <Grid container justifyContent = "center" >
            <GoogleLogin 
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </Grid>
          <Grid container justifyContent='flex-end' >
              <Grid item>
                <Button onClick={SwitchMode}>
                  {isSignUp ? 'already have an account? Login' : 'Don\'t have an account yet? Sign up'}
                </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth