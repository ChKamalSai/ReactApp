import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSwitchNavigator } from '@react-navigation/compat';
import LoginScreen from "./GUI/LoginScreen";
import SignupScreen from "./GUI/SignUpScreen"
import ForgotPassword from "./GUI/ForgotPassword";
import OTPVerification from "./GUI/OTPVerification";
import ResetPassword from "./GUI/ResetPassword";
import Calender from "./GUI/Calender";
const AppSwitchNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    ForgotPassword: ForgotPassword,
    ResetPassword:ResetPassword,
  },
  {
    initialRouteName: 'Login', 
  }
);
const stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="AppSwitchNavigator" component={AppSwitchNavigator} options={{ headerShown: false }} />
        <stack.Screen name="OTP" component={OTPVerification} />
        <stack.Screen name="Reset Password" component={ResetPassword} />
        <stack.Screen name="Calender" component={Calender} options={{ headerShown: false }} />
      </stack.Navigator>
    </NavigationContainer>
  );
}