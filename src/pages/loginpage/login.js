import React, {Component} from 'react';
import {Input, Button} from '@material-ui/core';
import userService from '../../utils/userService';
import styles from './login.module.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    render() {

        return(
            <div>
            <form className={styles.form}>
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
                    <Button onClick={this.handleSubmit}> Login </Button>
                </form>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // if the fields are empty return.
        if(!this._checkfields()) {
            return;
        }

        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            this.setState({
                name: '',
                password: ''
            });
            this.props.history.push('/');
        } catch(err) {
            this.props.handleErrors('Bad Credentials');
            //throw new Error(err);
        }
    }

    _checkfields = () => {
        if (this.state.email.trim().length < 1 && this.state.password.trim().length < 1) {
            return false;
        }
        return true;
    }
}


export default Login;