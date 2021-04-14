import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from 'md5';
class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is invalid' }
      this.setState({ errors: errors.concat(error) })
    }
    else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, confirmPassword }) => {
    return !username.length || !email.length || !password.length || !confirmPassword.length;
  };

  isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    }
    else if (password !== confirmPassword) {
      return false;
    }
    else {
      return true;
    }
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleOnchange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) { 
      this.setState({errors: [], loading: true});
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user.updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          })
          .then(() => {
            this.saveUser(createdUser).then(() => {
              console.log('User saved');
            });
            this.setState({loading: false});
          })
          .catch((err) => {
            console.log(err);
            this.setState({errors: this.state.errors.concat(err), loading: false});
          });
          //
        })
        .catch((err) => {
          console.log(err);
          this.setState({errors: this.state.errors.concat(err), loading: false});
        });
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };
  

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  };

  render() {
    const { username, email, password, confirmPassword, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Regiter for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleOnchange}
                value={username}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleOnchange}
                value={email}
                className={this.handleInputError(errors, 'email')}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleOnchange}
                value={password}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Form.Input
                fluid
                name="confirmPassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleOnchange}
                value={confirmPassword}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Register;
