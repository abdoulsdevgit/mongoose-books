import React, {Component} from 'react';
import {Input, Button} from '@material-ui/core';
import styles from './signup.module.css';
import userService from '../../utils/userService';

class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            passwordError: false,
        };
    }

    render() {
        return (
            <div>
            
                <form className={styles.form}>
                    <Input 
                        placeholder="Name" 
                        required 
                        inputProps={{ 'aria-label': 'description'}}
                        onChange={this.handleChange}
                        value={this.state.name}
                        name="name"
                    />
                    <Input 
                        placeholder="Email" 
                        required 
                        type="email"
                        inputProps={{ 'aria-label': 'description' }} 
                        onChange={this.handleChange}
                        value={this.state.email}
                        name="email"
                    />
                    <Input 
                        placeholder="Password" 
                        required 
                        inputProps={{ 'aria-label': 'description' }}
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        type="password"
                        error ={this.state.passwordError}
                    />
                    <Input 
                        placeholder="Verify Password" 
                        required 
                        inputProps={{ 'aria-label': 'description' }}
                        onChange={this.handleChange}
                        value={this.state.repeat}
                        name="repeat"
                        type="password"
                        error ={this.state.passwordError}
                    />
                    <Button onClick={this.handleSubmit}> Submit </Button>
                </form>
            </div>
        );
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        // if passwords don't match tell user
        if (!this._checkPassword() && this._checkNameLength() && this._checkValidEmail()) {
            this.setState({passwordError: true})
            return;
        }
        this.setState({passwordError: false});

        try {
            await userService.signup(this.state);
            // Let <App> know a user has signed up!
            this.props.handleSignupOrLogin();
            // Successfully signed up - show GamePage
            this.props.history.push('/');
        } catch (err) {
            // Invalid user data (probably duplicate email)
            //this.props.updateMessage(err.message);
            console.log('Something went wrong', err);
        }

        this.setState({
            name: '',
            email: '',
            password: '',
            repeat: '',
            passwordError: false,
        })
        
        
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    _checkPassword = () => {
        return this.state.password === this.state.repeat;
    }

    _checkNameLength = () => {
        return this.state.name.length >= 2;
    }

    _checkValidEmail = () => {
        
        if(this.state.email.split('').indexOf('@') === -1) {
            return false;
        }
    }

}

export default SignupPage;