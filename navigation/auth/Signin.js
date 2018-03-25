import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import { Font } from 'expo';
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import ModalTest from '../../shared/Modal/Modal';
import firebase from 'firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected}/>
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default class LoginScreen2 extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {
      loginemail: '',
      loginpassword: '',
      signupemail: '',
      signuppass: '',
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      modalStatus: false,
      modalText: '',
      modalButtonText: ''
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../../assets/fonts/Georgia.ttf'),
      'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../../assets/fonts/Montserrat-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  login() {
    const {
      loginemail,
      loginpassword,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    if(this.validateEmail(loginemail) && loginpassword.length >= 8){
      firebase.auth().signInWithEmailAndPassword(loginemail, loginpassword)
              .then(() => { 
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('App');
                console.log("success");
              })
              .catch((err) => {
                console.log(err);
                switch(err.code){
                  case 'auth/user-not-found':
                    this.setState({
                      modalStatus: true,
                      modalText: 'USER NOT FOUND. SIGN UP',
                      modalButtonText: 'SIGN UP'
                    });
                    break;
                  case 'auth/wrong-password':
                    this.setState({
                      modalStatus: true,
                      modalText: 'WRONG PASSWORD.TRY LOGGING AGAIN',
                      modalButtonText: 'LOGIN AGAIN'
                    });
                  case 'auth/invalid-email':
                    this.setState({
                      modalStatus: true,
                      modalText: 'INVALID EMAIL',
                      modalButtonText: 'LOGIN AGAIN'
                    });
                  case 'auth/user-disabled':
                    this.setState({
                      modalStatus: true,
                      modalText: 'DISABLED USER',
                      modalButtonText: 'LOGIN AGAIN'
                    });
                  default:
                    this.setState({
                      modalStatus: true,
                      modalText: 'SOMETHING BAD HAPPENED',
                      modalButtonText: 'TRY AGAIN'
                    });            
                }
              });
    }
    else{
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(loginemail) || this.emailInput.shake(),
        isPasswordValid: loginpassword.length >= 8 || this.passwordInput.shake(),
      });
    }

  }

  signUp() {
    const {
      signupemail,
      signuppass,
      passwordConfirmation,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    if(this.validateEmail(signupemail) && signuppass.length >= 8){
      firebase.auth().createUserWithEmailAndPassword(signupemail, signuppass)
                    .then(() => {
                      console.log("Success"); 
                      this.setState({ error: '', loading: false }); 
                    })
                    .catch((err) => {
                      console.log(err);
                      switch(err.code){
                        case 'auth/email-already-in-use':
                          this.setState({
                            modalStatus: true,
                            modalText: 'EMAIL ALREADY REGISTERED',
                            modalButtonText: 'LOG IN'
                          });
                          break;
                        case 'auth/invalid-email':
                          this.setState({
                            modalStatus: true,
                            modalText: 'INVALID EMAIL.ENTER VALID EMAIL',
                            modalButtonText: 'TRY AGAIN'
                          });
                        case 'auth/operation-not-allowed':
                          this.setState({
                            modalStatus: true,
                            modalText: 'OPERATION NOT ALLOWED',
                            modalButtonText: 'TRY AGAIN'
                          });
                        default:
                          this.setState({
                            modalStatus: true,
                            modalText: 'SOMETHING BAD HAPPENED',
                            modalButtonText: 'TRY AGAIN'
                          });            
                      }
                    });
    }
    else{
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(signupemail) || this.emailInput.shake(),
        isPasswordValid: signuppass.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid: signuppass == passwordConfirmation || this.confirmationInput.shake(),
      });
    }
  }

  closeModal = () => {
    this.setState({
      loginemail: '',
      loginpassword: '',
      signupemail: '',
      signuppass: '',
      isLoading: false,
      modalStatus: false,
      modalText: ''
    });
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      loginemail,
      loginpassword,
      signupemail,
      signuppass,
      passwordConfirmation,
      modalStatus,
      modalText,
      modalButtonText
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    return (
      <View style={styles.container}>
        {/* <Modal isVisible={modalStatus}>
          <View style={{ flex: 1 }}>
            <Text>{modalText}</Text>
          </View>
        </Modal> */}
        
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
        {modalStatus?<ModalTest isModalVisible={modalStatus} toggleModal={this.closeModal} 
          message={modalText} buttonText={modalButtonText}/>: null}
          {this.state.fontLoaded ?
            <View>
              <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
                <View style={styles.titleContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleText}>IPL 2018</Text>
                  </View>
                  {/* <View style={{marginTop: -10, marginLeft: 10}}>
                    <Text style={styles.titleText}>VOYAGES</Text>
                  </View> */}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    disabled={isLoading}
                    clear
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{flex: 1}}
                    titleStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
                    title={'Login'}
                  />
                  <Button
                    disabled={isLoading}
                    clear
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                    containerStyle={{flex: 1}}
                    titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                    title={'Sign up'}
                  />
                </View>
                <View style={styles.rowSelector}>
                  <TabSelector selected={isLoginPage}/>
                  <TabSelector selected={isSignUpPage}/>
                </View>
                <View style={styles.formContainer}>
                  {isLoginPage && <View>
                  
                  <Input
                    icon={
                      <Icon
                        name='envelope-o'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent'}}
                      />
                    }
                    value={loginemail}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Email'}
                    containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    ref={input => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={loginemail => this.setState({ loginemail })}
                    displayError={!isEmailValid}
                    errorMessage='Please enter a valid email address'
                  />
                  <Input
                    icon={
                      <SimpleIcon
                        name='lock'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent'}}
                      />
                    }
                    value={loginpassword}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                    blurOnSubmit={true}
                    containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Password'}
                    ref={input => this.passwordInput = input}
                    onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                    onChangeText={(loginpassword) => this.setState({loginpassword})}
                    displayError={!isPasswordValid}
                    errorMessage='Please enter at least 8 characters'
                  />
                  </View>
                  }
                  {isSignUpPage &&
                    <View>
                      <Input
                    icon={
                      <Icon
                        name='envelope-o'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent'}}
                      />
                    }
                    value={signupemail}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Email'}
                    containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    ref={input => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={signupemail => this.setState({ signupemail })}
                    displayError={!isEmailValid}
                    errorMessage='Please enter a valid email address'
                  />
                  <Input
                    icon={
                      <SimpleIcon
                        name='lock'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent'}}
                      />
                    }
                    value={signuppass}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                    blurOnSubmit={true}
                    containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Password'}
                    ref={input => this.passwordInput = input}
                    onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                    onChangeText={(signuppass) => this.setState({signuppass})}
                    displayError={!isPasswordValid}
                    errorMessage='Please enter at least 8 characters'
                  />
                    <Input
                      icon={
                        <SimpleIcon
                          name='lock'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{backgroundColor: 'transparent'}}
                        />
                      }
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      keyboardAppearance='light'
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='default'
                      returnKeyType={'done'}
                      blurOnSubmit={true}
                      containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                      inputStyle={{marginLeft: 10}}
                      placeholder={'Confirm password'}
                      ref={input => this.confirmationInput = input}
                      onSubmitEditing={this.signUp}
                      onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                      displayError={!isConfirmationValid}
                      errorMessage='Please enter the same password'
                    />
                    </View>
                    }
                    <Button
                      buttonStyle={styles.loginButton}
                      containerStyle={{marginTop: 32, flex: 0}}
                      activeOpacity={0.8}
                      title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                      onPress={isLoginPage ? this.login : this.signUp}
                      titleStyle={styles.loginTextButton}
                      loading={isLoading}
                      disabled={isLoading}
                    />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.helpContainer}>
                <Button
                  title={'Need help ?'}
                  titleStyle={{color: 'white'}}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  underlayColor='transparent'
                  onPress={() => console.log('Account created')}
                />
              </View>
            </View>
          :
          <Text>Loading...</Text>
        }
        </ImageBackground>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems:'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});