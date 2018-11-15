import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import LogIn from './screens/LogIn';
import Noticias from './screens/Noticias';
import Profile from './screens/Profile';
import Workshops from './screens/Workshops';
import SignUp from './screens/SignUp';
import ForgotPasswd from './screens/ForgotPasswd';
import AuthLoadingScreen from './screens/AuthLoadingScreen'

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
});

const AppDrawer = createDrawerNavigator({
    Inicio: Noticias,
    Perfil: Profile,
    Talleres: Workshops
});

const AuthStack = createStackNavigator({
    IniciarSesion: LogIn,
    Registrarse: {
        screen: SignUp,
        navigationOptions: {
            title: 'Registro',
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#22213f'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    OlvidarPassdw: ForgotPasswd
},{
    headerMode:'float'
});

export default PrimaryNav = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack
},{
    initialRouteName: 'Auth',

})