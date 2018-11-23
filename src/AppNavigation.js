import React from 'react';
import { Text, Animated, Easing, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import LogIn from './screens/LogIn';
import Noticias from './screens/Noticias';
import Profile from './screens/Profile';
import Workshops from './screens/Workshops';
import SignUp from './screens/SignUp';
import ForgotPasswd from './screens/ForgotPasswd';
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import colors from './assets/config/colors';

/* const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
}); */

const AppDrawer = createDrawerNavigator({
    Inicio: {
        screen: Noticias,
        navigationOptions:{
            headerMode:'screen',
            title:'Noticia'
        }
    },
    Perfil: Profile,
    Talleres: Workshops
},{
    drawerBackgroundColor:'#678fca'
});


const AuthStack = createStackNavigator({
    IniciarSesion: LogIn,
    Registrarse: {
        screen: SignUp,
        navigationOptions: {
            title: 'Registro',
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: colors.primaryLight
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
    initialRouteName: 'AuthLoading',
    headerMode:'none'

})