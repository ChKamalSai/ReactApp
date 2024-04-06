import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './FormStyles';
import { FontAwesome } from '@expo/vector-icons';
let interval;
export default function OTPVerification({ navigation, route }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(540);
  const { email } = route.params
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    return `${minutes.toString()}:${remainingSeconds
      .toString()
      }`;
  };

  const fetchResult = async () => {
    try {
      const request = await fetch("http://192.168.31.78:9090/sendCode/", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      })
      const response = await request.json();
      console.log(response);
      if (response.error) {
        Alert.alert("Error sending code.Please try after some time");
        // navigation.navigate('Login')
      }
      clearInterval(interval);
      setTimer(540)
      startTimer();
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { fetchResult() }, []);
  const validateForm = () => {
    if (!otp[0] || !otp[1] || !otp[2] || !otp[3]) {
      return false
    }
    else if(isNaN(parseInt(otp[0]))||isNaN(parseInt(otp[1]))||isNaN(parseInt(otp[2]))||isNaN(parseInt(otp[3]))){
      Alert.alert("Enter valid Otp.");
      return false;
    }
    return true
  }
  const sendData = async () => {
    try {
      const parserOTP=parseInt(otp.join(''));
      const request = await fetch("http://192.168.31.78:9090/verifyCode/", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp: parserOTP
        })
      })
      const response = await request.json();
      console.log(response,parserOTP);
      if (response.error) {
        Alert.alert(response.error);
        navigation.navigate('Login')
      }
      else if (response.success === true) {
        navigation.navigate('Reset Password',{email:email})
      }
      else{
      Alert.alert("Invalid Verification Code");}
    } catch (error) {
      console.log(error)
    }
  }
  const verifyCode = () => {
    if (validateForm()) {
      sendData()
    }
  }

  return (

    <View style={[styles.container, { paddingTop: 20 }]}>
      <Text style={styles.title}>Email verification</Text>
      <Text style={[styles.subTitle, { marginBottom: 0 }]}>
        Enter the verification code we sent you on:
      </Text>
      <Text style={styles.subTitle}>{email}</Text>

      <View style={styles.codeContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.inputCode}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <View style={[styles.checkBox, { justifyContent: "center", padding: 30 }]}>
        <Text style={styles.orText}>
          Didn't recieve code?
        </Text>
        <TouchableOpacity onPress={fetchResult}>
          <Text style={styles.registerLink} >
            Resend
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialButtonContainer}>
        <Text style={[styles.orText]}>
          <FontAwesome  name="clock-o" size={20} />
          {' '}{formatTime()}
        </Text>
      </View>
      <TouchableOpacity style={[styles.button, { marginTop: 50 }]} onPress={timer !== 0 ? verifyCode : null}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}