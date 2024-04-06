import { useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    Alert,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import styles from './FormStyles';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const logo = require('./googleLogo.png')
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false)
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const passwordRegex = /^[a-zA-Z0-9@]+$/;

    useEffect(() => {
       
        GoogleSignin.configure({
            
            androidClientId:
        });
    }, []);

    const handleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const username = userInfo.user.name;
            const emailID = userInfo.user.email;
            navigation.navigate('Calender', {
               username:username,
               email:emailID
              });
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const validateForm = () => {
        const hasNoErrors = true;
        if (!email) {
            setEmailError('Email cannot be empty');
            hasNoErrors = false
        }
        else if (!emailRegex.test(email)||email.length>100) {
            setEmailError('Incorrect email.')
            hasNoErrors = false
        }
        if (!password) {
            setPasswordError("password cannot be empty")
            hasNoErrors = false
        }
        else if (password.length < 6 || password.length > 20||!passwordRegex.test(password)) {
            setPasswordError('Length of password should not be less than 6 and more than 20')
            hasNoErrors = false
        }
        return hasNoErrors
    }
    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
        setEmail('')
        setPassword('')
    }
    const fetchResult = async () => {
        clearErrors();
        try {
            const request = await fetch("http://ipaddress:9090/sign-in/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const response = await request.json();
            // console.log(response);
            if (response.error) {
                Alert.alert(response.error);
            }
            else if (response.success === true) {
                Alert.alert("Succesfully registered");
                navigation.navigate('Calender',{
                    username:response.username,
                    email:email
                   });
            }
            else if (response.success === false) {
                Alert.alert("Email/Password incorrect");
            }
            else {
                Alert.alert("There is some issue. Please try after some time")
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleLogin = () => {
       
        if (validateForm()) {
            fetchResult()
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to your account.</Text>
            <Text style={styles.subTitle}>Please sign in to your account</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email.trim()}
                    onChangeText={setEmail}
                    placeholder="Enter Email"
                    placeholderTextColor="#A7A7A7"
                    autoCapitalize="none"
                    keyboardType='email-address'
                />
                {emailError ? (<Text style={styles.errorText}>{emailError}</Text>) : null}
                <Text style={styles.label}>Password</Text>
                <View style={styles.input}>
                    <TextInput
                        value={password.trim()}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="#A7A7A7"
                        secureTextEntry={!visible} />
                    <TouchableOpacity onPress={() => { setVisible(!visible) }} style={styles.eyeIconContainer}>
                        <MaterialIcons
                            name={!visible ? 'visibility-off' : 'visibility'}
                            size={24}
                            color="#A7A7A7"
                        />
                    </TouchableOpacity>
                </View>
                {passwordError ? (<Text style={styles.errorText}>{passwordError}</Text>) : null}
            </View>
            <TouchableOpacity style={styles.forgotPassword} onPress={() => { navigation.navigate('ForgotPassword') }}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or sign in with</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.socialButtonContainer}>
                <TouchableOpacity onPress={()=>{handleSignIn()}}
                >
                    <Image source={logo} style={styles.googleIcon} />
                </TouchableOpacity>
              
            </View>



            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.registerLink}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

