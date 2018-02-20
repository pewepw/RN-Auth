import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input'
import Spinner from './common/Spinner'

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        error: "",
        loading: false
    };

     onButtonPress() {
        const {email, password} = this.state;

        this.setState({error: "", loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))

        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
             .then(this.onLoginSuccess.bind(this))
             .catch(this.onLoginFail.bind(this))
        });
    }

    onLoginFail() {
        this.setState({
            error: "Authentication Failed",
            loading: false
        })
    }

    onLoginSuccess() {
        this.setState({
            email: "",
            password: "",
            error: "",
            loading: false
        })
    }
    
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }

        return(
            <Button 
            title="Login"
            onPress={this.onButtonPress.bind(this)}>
            </Button>
        );
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                    label="Email"
                    placeholder="user@mail.com"
                    value={this.state.email}
                    onChangeText={text => this.setState({email: text})}/>
                </CardSection>

                <CardSection>
                    <Input
                    secureTextEntry={true}
                    label="Password"
                    placeholder="password"
                    value={this.state.password}
                    onChangeText={text => this.setState({password: text})}/>
                </CardSection>

                <Text style={styles.errorTextStyle}>{this.state.error}</Text>

                <CardSection>
                  {this.renderButton()} 
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 15,
        alignSelf: "center",
        color: "red",
        marginTop: 5,
    }
}

export default LoginForm;