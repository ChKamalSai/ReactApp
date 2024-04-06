import { useEffect, useState } from "react";
import { Text, View, Modal, TouchableOpacity, Image,ImageBackground, StatusBar } from "react-native";
import styles from "./FormStyles";

export default function Calender({ navigation, route }) {
    const { username, email } = route.params
    const [result, setResult] = useState('');
    const logo = require('./successfullLogo.png')
    const fetchResult = async () => {
        console.log("hlep", username, email)
        try {
            const request = await fetch("http://localhost:port/create-event/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    email: email
                })
            })
            const response = await request.json();
            console.log(response);
            setResult(response.message);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { fetchResult() }, [])
    return (
        
        <View style={[styles.container,{paddingHorizontal:0,paddingTop:0}]}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground
          source={require('./image.png')} 
          style={styles.background}
        >
           
                <View style={styles.ModalContainer}>
                    <View style={[styles.Topline]} />
                    <View style={[styles.socialButtonContainer, { margin: 0 }]}>
                        <Image source={logo} style={{ width: 210, height: 170 }} />
                    </View>
                    <Text style={[styles.title, { textAlign: 'center' }]}>Login Successfull</Text>
                    <Text style={[styles.subTitle, { textAlign: 'center' }]}>An event has been created and an invite has been sent to you</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login') }}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
        </View>
    );
}

