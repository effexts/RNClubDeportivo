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
    IniciarSesion: {
        screen: LogIn,
        navigationOptions: ({ navigation }) => ({ headerMode: 'none'})
    },
    Registrarse: {
        screen: SignUp,
        navigationOptions: ({ navigation }) => ({ headerMode: 'float', title: 'Registro'})
    },
    OlvidarPassdw: {
        screen: ForgotPasswd,
        navigationOptions: ({ navigation }) => ({ headerMode: 'float', title: 'Recuperar Contraseña'})
    }
});

export default PrimaryNav = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack
},{
    initialRouteName: 'AuthLoading'
})





//Drawer Stack
/* const appDrawerStack = createDrawerNavigator({
    noticias: { screen: Noticias },
    profile: { screen: Profile },
    workshops: { screen: Workshops }
}, {
    gesturesEnabled: false
});

const DrawerNavigation = createStackNavigator({
    DrawerStack: { screen: appDrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor:'#deb01f'},
        title: 'LoggedIn, Clubdeportivo',
        gesturesEnabled: false,
        headerLeft: <Text onPress={() => {
            navigation.state.index === 0 ? navigation.navigate('DrawerOpen'):navigation.navigate('DrawerClose')
        }}>Menu</Text>
    })
});

const LoginStack = createStackNavigator({
    loginScreen: { screen: LogIn },
    signUpScreen: { screen: SignUp },
    forgottenPasswordScreen: { screen: ForgotPasswd }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerStyle: { backgroundColor: 'red' },
        title: 'NotLoggedIn'
    }
})

const PrimaryNav = createStackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerNavigation }
}, {
    headerMode: 'none',
    title: 'Principal',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
})

export default PrimaryNav; */