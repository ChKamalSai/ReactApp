import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert,Modal,Image } from 'react-native';
import styles from './FormStyles';
import { MaterialIcons } from '@expo/vector-icons';
export default function ResetPassword({ navigation, route }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, setVisible] = useState(false)
    const [conformVisible, setConformVisible] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const logo = require('./successfullLogo.png')
    const passwordRegex = /^[a-zA-Z0-9@]+$/;
    const { email } = route.params
    const validateForm = () => {
        let hasNoErrors = true;
        if (!newPassword) {
            setPasswordError("password cannot be empty")
            hasNoErrors = false
        }
        else if (newPassword.length < 6 || newPassword.length > 20) {
            setPasswordError('Length of password should not be less than 6 and more than 20')
            hasNoErrors = false
        }
        else if (!passwordRegex.test(newPassword)) {
            setPasswordError('password can contain only alphabets, digits and @');
            hasNoErrors = false
        }
        else if (newPassword !== confirmPassword) {
            Alert.alert('passwords do not match');
            hasNoErrors = false
        }
        return hasNoErrors
    }
    const clearErrors = () => {
        setPasswordError('')
        setNewPassword('')
        setConfirmPassword('')
    }
    const fetchResult = async () => {
        clearErrors();
        try {
            const request = await fetch("http://192.168.31.78:9090/resetPassword/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: newPassword
                })
            })
            const response = await request.json();
          
            if (response.error) {
                Alert.alert("Error occured. Please try again after some time");
            }
            else {
                setIsModalVisible(true);
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
        <View style={[styles.container, { paddingTop: 40 }]}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subTitle}>
                Your new password must be different from the previously used password
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.input}>
                    <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
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
                <Text style={styles.subTitle}>Must be at least 6 character</Text>
                {passwordError ? (<Text style={styles.errorText}>{passwordError}</Text>) : null}
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.input}>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor="#A7A7A7"
                        secureTextEntry={!conformVisible} />
                    <TouchableOpacity onPress={() => { setConformVisible(!conformVisible) }} style={styles.eyeIconContainer}>
                        <MaterialIcons
                            name={!visible ? 'visibility-off' : 'visibility'}
                            size={24}
                            color="#A7A7A7"
                        />
                    </TouchableOpacity>

                </View>
                <Text style={styles.subTitle}>Both password must match</Text>
            </View>


            <Modal animationType="slide" visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.ModalContainer}>
            <View style={[styles.Topline]}/>
                    <View style={[styles.socialButtonContainer,{margin:0}]}>
                            <Image source={logo} style={{width:210,height:170}} />
                    </View>
                    <Text style={[styles.title, { textAlign: 'center' }]}>Password Changed</Text>
                    <Text style={[styles.subTitle, { textAlign: 'center' }]}>Password changed successfully, you can login again with new password</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login') }}>
                        <Text style={styles.buttonText}>Go to Login</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            <TouchableOpacity style={[styles.button, { marginTop: 100 }]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Verify Account</Text>
            </TouchableOpacity>
        </View>
    );
}