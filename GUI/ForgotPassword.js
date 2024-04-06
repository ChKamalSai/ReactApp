import { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import styles from './FormStyles'
export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const validateForm = () => {
        let hasNoErrors = true;
        if (!email) {
            setEmailError('Email cannot be empty');
            hasNoErrors = false
        }
        else if (!emailRegex.test(email) || email.length > 100) {
            setEmailError('Incorrect email.')
            hasNoErrors = false
        }
        return hasNoErrors
    }
    const clearErrors = () => {
        setEmailError('')
        setEmail('')
    }
    const fetchResult = async () => {
        clearErrors();
        try {
            const request = await fetch("http://localhost:port/verify-email/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                })
            })
            const response = await request.json();
            // console.log(response);
            if (response.error) {
                Alert.alert(response.error);
            }
            else if (response.success === true) {
                navigation.navigate('OTP',{email:email});
            }
            else if (response.success === false) {
                Alert.alert("Email incorrect/doesn't exist");
            }
            else {
                Alert.alert("There is some issue. Please try after some time")
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleLogin = () => {
        // console.log('email:', email);
        if (validateForm()) {
            fetchResult()
        }
    };
    return (
        <View style={styles.container} >
            <Text style={styles.title}>Forgot password?</Text>
            <Text style={styles.subTitle}>Enter your email address and we'll send you a confirmation code to reset your password.</Text>
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
            </View>
            {emailError ? (<Text style={styles.errorText}>{emailError}</Text>) : null}
            <TouchableOpacity style={[styles.button, { marginTop: 100 }]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => { navigation.navigate("Login") }}>
                <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}

