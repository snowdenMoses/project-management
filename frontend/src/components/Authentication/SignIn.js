import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation, useQuery, gql } from '@apollo/client';
import Profile from '../Profile';
import { useHistory } from 'react-router-dom'
import CustomizedSnackbars from '../CustomizedSnackbar';

const LOGIN_MUTATION = gql`
mutation($email: String!, $password: String!){
  login(data:{
    email: $email,
    password: $password
  }) {
    token
    message
    clientDetails {
    id
  }
  }
}
`;


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [flashMessageState, setFlashMessageState] = useState()
  const [flashMessage, setFlashMessage] = useState(null)

  const history = useHistory()

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { email, password } })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem("jwtToken", response.data.login.token)
        setFlashMessage(response.data.login.message)
        setFlashMessageState('success')
        setTimeout(() => {
          setFlashMessageState('')
          if (response?.data?.login) {
            history.push({
              pathname: "/client-dashboard",
              state: {
                client_id: response.data.login.clientDetails.id,
                login_message: response.data.login.message
              }
            })
          }
        }, 2000)

      }).catch(errors => {
        for (error in errors) {
          setFlashMessage(error + " " + errors[error][0])
          setFlashMessageState('error')
          setTimeout(() => {
            setFlashMessageState('')
          }, 4000)
        }
      }
      )
  };



  return (
    <>
      {flashMessageState && flashMessage !== null ?
        <div className='flash_message'>
          <CustomizedSnackbars severity={flashMessageState} message={flashMessage} />
        </div>
        : ""}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={(e) => handleEmailChange(e)}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => handlePasswordChange(e)}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />

        </Container>
      </ThemeProvider>
    </>
  );
}