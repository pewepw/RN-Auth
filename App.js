import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import Header from './src/components/common/Header';
import LoginForm from './src/components/LoginForm';
import Button from './src/components/common/Button';
import CardSection from './src/components/common/CardSection';
import Spinner from './src/components/common/Spinner';

export default class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: "AIzaSyDygX2ZyX0kx-S8ZMdeGF5xRTK9WE0uN0I",
        authDomain: "signin-bb3fd.firebaseapp.com",
        databaseURL: "https://signin-bb3fd.firebaseio.com",
        projectId: "signin-bb3fd",
        storageBucket: "signin-bb3fd.appspot.com",
        messagingSenderId: "828773676350"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    }); 
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true: 
      return(
        <CardSection>
          <Button 
          title="Log Out"
          onPress={() => firebase.auth().signOut()}/>
        </CardSection>)
      case false: 
        return(
        <LoginForm/>)
      default: 
        return(
        <View>
          <Spinner size="small"/>
        </View>)
    }

  }

  render() {
    return (
      <View>
        <Header headerText="LOGIN"/>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  spinnerContainerStyle: {
    justifyContent: "center",
    alignItems: "center"
  }
});
