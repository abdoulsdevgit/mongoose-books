import React, {Component} from 'react';
import userService from './utils/userService';
// import {Container} from '@material-ui/core';
// import Navbar from './components/navbar/navbar';
import {Switch, Route, Redirect} from 'react-router-dom';
import SignupPage from './pages/signup/signupPage';
import Login from './pages/loginpage/login';
import BookPage from './pages/booksPage/bookpage';
import BookInfo from './pages/bookInfopage/bookInfo';
import Toolbar from './components/toolbar/toolbar';
import DrawerMenu from './components/navbar/drawermenu';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: userService.getUser(),
      errorMessage: '',
      sideMenueShowing: false,
    };
  }

  render() {

    let logged = this.state.user ? <h1> Welcome {this.state.user.name} </h1>: null;
    let error = this.state.errorMessage ? <span className="error"> {this.state.errorMessage}</span>:
    null;

    let sideDrawer = this.state.sideMenueShowing ? <DrawerMenu  user={this.state.user} 
    showing={this.state.sideMenueShowing}
    toggleSideMenu={this.toggleSideMenu}
    handleLogout={this.handleLogout}
    />:
    <DrawerMenu 
    user={this.state.user}
    showing={this.state.sideMenueShowing}
    handleLogout={this.handleLogout}
    />

    /** toggle  side menu pass them to the componets to send them in and outt*/
    return (
      <div className="main">
        
        
        <Toolbar 
          toggleSideMenu={this.toggleSideMenu} 
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        {sideDrawer}
        {logged}
        {error}
        <Switch>
          <Route exact path='/' 
            render={(props) => (
              userService.getUser()?
              <BookPage user={this.state.user}{...props} />:
              <Redirect to='/login'/>
              )} />
          <Route exact path='/login' 
            render={(props) => (
              userService.getUser() ?
            <Redirect to='/' /> :
            <Login {...props} 
            handleSignupOrLogin={this.handleSignupOrLogin}
            handleErrors={this.handleErrors}
            /> 

            )}/>
          <Route exact path='/signup' 
            render={(props) => (
              userService.getUser() ?
              <Redirect to='/' /> :
            <SignupPage {...props}
            handleSignupOrLogin={this.handleSignupOrLogin}
            />)} />

          <Route exact path='/api/books/:id'
            render={(props) => (
              userService.getUser() ?
              <BookInfo
              {...props}
              user={this.state.user}
              /> :
              <Redirect to='/' />
              )} 
            />
        </Switch>
      </div>
      
    );
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null})
  }

  handleErrors = (msg) => {
    this.setState({errorMessage: msg});
  }

  toggleSideMenu = () => {
    this.setState((prevState) => {
      return {sideMenueShowing: !prevState.sideMenueShowing}
    })
  }
}

export default App;

/**
 * 
 * <Navbar 
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
 */
