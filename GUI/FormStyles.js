import { StyleSheet, StatusBar } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 90,
        //justifyContent: "center",
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 30,
        color: '#A7A7A7'
    },
    label: {
        fontSize: 16,
        fontWeight: "bold"
    },
    inputContainer: {
        // flex:1,
        marginBottom: 20,
        justifyContent: "center"
    },
    input: {
        fontSize: 16,
        height: 50,
        borderColor: '#A7A7A7',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        justifyContent: "center"
    },
    button: {
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginBottom: 30
    },
    forgotPasswordText: {
        textAlign: "right",
        fontSize: 14,
        color: '#FE8C00',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#A7A7A7',
        //marginHorizontal: 10,
    },
    orText: {
        fontSize: 16,
        color: '#A7A7A7',
        marginLeft: 5,
        marginRight: 5
        // fontWeight: 'bold',
    },
    googleIcon: {
        width: 30,
        height: 30,
    },
    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        margin: 10
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center',
    },
    registerText: {
        fontSize: 14,
        color: 'black',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#A7A7A7',
        marginBottom: 10,
        paddingRight: 24, 
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 0,
        paddingRight: 8,
    },
    registerLink: {
        marginLeft: 5,
        color: '#FE8C00',
        fontSize: 14,
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: "center",
        // justifyContent:"center",
        // textAlign:"center",
        // verticalAlign:"middle"
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        paddingBottom: 10
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
    },
    codeContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    inputCode: {
        borderWidth: 1,
        borderColor: '#A7A7A7',
        borderRadius: 10,
        padding: 10,
        width: 80,
        height: 80,
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 30
    },
    calenderWindow: {
        width: 350,
        height: 400,
        top: 372,
        left: 32,
        borderRadius: 48,
        // justifyContent:'center',
        // textAlign:'center',
        alignItems: 'center',
        backgroundColor: '#FE8C00',
        fontSize: 40,
        padding: 20,
        color: 'black'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center'
    },
    circleContainer: {
        alignItems: 'flex-end',
    },
    circle: {
        fontSize: 24,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 50,
    },
    ModalContainer: {
        // alignItems:'center',
        // alignContent:'center',
        backgroundColor:'white',
        position: 'absolute',
        // top: 400,
        height: "60%",
        // flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 10,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        bottom: 0,
        left: 0,
        right: 0,
        gap: 32
    },
    Topline: {
        // flex: 1,
        height: 3,
        backgroundColor: '#A7A7A7',

        alignSelf: 'center',
        width: '20%', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    buttonText: {
        fontSize: 19,
        color: 'white',
    },
    background: {
        flex: 1,
        resizeMode: 'stretch', 
    },
});

export default styles;
