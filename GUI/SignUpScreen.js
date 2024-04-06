import { useState,useEffect } from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Checkbox } from 'react-native-paper'
import styles from './FormStyles';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
WebBrowser.maybeCompleteAuthSession();
const logo = require('./googleLogo.png')
export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(false)
    const [agree, setAgree] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
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
                username: username,
                email: emailID
            });
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };
    const validateForm = () => {
        let hasNoErrors = true;
        if (!email) {
            setEmailError('Email cannot be empty');
            hasNoErrors = false
        }
        else if (!emailRegex.test(email)) {
            setEmailError('Email should be of @gmail.com')
            hasNoErrors = false
        }
        else if(email.length>100){
            setUsername('Email should not be more than 100 characters')
            hasNoErrors = false
        }
        if (!username) {
            setUsernameError("Username cannot be empty")
            hasNoErrors = false
        }
        else if (!usernameRegex.test(username)) {
            setUsernameError('Username should contain only alphabets and digits')
            hasNoErrors = false
        }
        else if(username.length>30){
            setUsername('Username should not be more than 30 characters')
            hasNoErrors = false
        }

        if (!password) {
            setPasswordError("password cannot be empty")
            hasNoErrors = false
        }
        else if (password.length < 6 || password.length > 20) {
            setPasswordError('Length of password should not be less than 6 and more than 20')
            hasNoErrors = false
        }
        else if (!passwordRegex.test(password)) {
            setPasswordError('password can contain only alphabets, digits and @');
            hasNoErrors = false
        }
        return hasNoErrors
    }
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('')
        setUsernameError('')
        setEmail('');
        setPassword('');
        setUsername('')
    }
    const fetchResult = async () => {
        clearErrors();
        try {
            const request = await fetch("http://localhost:port/sign-up/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                })
            })
            const response = await request.json();
            // console.log(response);
            if (response.error) {
                Alert.alert(response.error);
            }
            else if (response.email) {
                Alert.alert("Email already exists")
            }
            else if (response.success === true) {
                Alert.alert("Succesfully registered");
                navigation.navigate('Login');
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
        <View style={[styles.container,{justifyContent:'center',paddingTop:10}]}>
            <Text style={styles.title}>Create your new account</Text>
            <Text style={styles.subTitle}>Create an account to start looking for the food you like</Text>
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
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username.trim()}
                    onChangeText={setUsername}
                    placeholder="Enter Username"
                    placeholderTextColor="#A7A7A7"
                />
                {usernameError ? (<Text style={styles.errorText}>{usernameError}</Text>) : null}
                <Text style={styles.label}>Password</Text>
                <View style={styles.input}>
                    <TextInput
                        value={password.trim()}
                        onChangeText={setPassword}
                        placeholder="Enter Password"
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
                <View style={styles.checkBox} >
                    <Checkbox.Android status={agree ? 'checked' : 'unchecked'} color='#FFA500' onPress={() => { setAgree(!agree) }} />
                    <Text>
                        I Agree with
                    </Text>

                    <TouchableOpacity>
                        <Text style={[styles.registerLink]} >
                            Terms of Service
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        {' '}
                        and
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.registerLink} >
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={agree?handleLogin:null} disabled={!agree} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or sign in with</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.socialButtonContainer}>
                <TouchableOpacity onPress={() => { handleSignIn() }}>
                    <Image source={logo} style={styles.googleIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.registerLink}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

