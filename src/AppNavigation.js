import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View, Alert } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import LogIn from './screens/LogIn';
import Noticias from './screens/Noticias';
import Profile from './screens/Profile';
import Workshops from './screens/Workshops';
import SignUp from './screens/SignUp';
import ForgotPasswd from './screens/ForgotPasswd';
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import PostDetail from './screens/PostDetail';
import colors from './assets/config/colors';
import firebase from 'react-native-firebase';

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
            title:'Noticias'
        }
    },
    Perfil: Profile,
    Talleres: Workshops
},  {
    contentComponent:(props) => (
      <View style={{flex:1}}>
          <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.container}>
                    <Image
                        style={{ width:140, height:140}}
                        source={ require('./assets/images/logo-blanco.png') }
                    />
                    <Text style={styles.logoText}>Club Deportivo UTA</Text>	
  			</View>
            <DrawerItems {...props} />
            <TouchableOpacity style={{flex:1, justifyContent:'flex-end', marginBottom:16}} onPress={()=>
              Alert.alert(
                'Cerrar Sesión',
                '¿Estás seguro de querer terminar la sesión?',
                [
                  {text: 'Cancelar', onPress: () => {return null}},
                  {text: 'Confirmar', onPress: () => {
                    firebase.auth().signOut();
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold',color: colors.black}}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);


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
    Auth: AuthStack,
    PostDetail: PostDetail,
},{
    initialRouteName: 'AuthLoading',
    headerMode:'none'

})


const styles = StyleSheet.create({
    container : {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: colors.secondary
    },
    logoText : {
        marginVertical: 15,
        fontSize:18,
        color:'rgb(255, 255, 255)'
    }
  });