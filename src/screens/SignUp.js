import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, Image, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import colors from '../assets/config/colors';
import firebase from 'react-native-firebase';
import Axios from 'axios';
import Config from 'react-native-config';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.refEmail = React.createRef();
        this.refPasswd = React.createRef();
        this.refNames = React.createRef();
    }
    state = { email: 'effexts@gmail.com', password: '123123', names: 'Kenny Rodriguez', labelEmail:'Correo Electrónico', token:'' };

    register = () => {
        const { email, password, names, token } = this.state; 

       
        if (!email || !password || !names) {
            alert('Los campos no deben estar vacíos');
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (user) => {            
            registerInFirebase(user, email, names);
            registerInWp(user, email, names);
        })
        .catch( (error) => {
            const errorCode = error.code;
            switch(errorCode) {
                case 'auth/email-already-in-use':
                    return(
                        Alert.alert("Aviso", "Correo electrónico ya está en uso",
                        [
                            {text: 'Aceptar', onPress: () => this.refEmail.current.focus() }
                        ])
                    );
                case 'auth/invalid-email':
                    return ( Alert.alert("Aviso","Correo Inválido",
                        [
                            {text: 'Aceptar', onPress: () => this.refEmail.current.focus() }
                        ]
                    ));
                case 'auth/operation-not-allowed':
                    return ( Alert.alert("Aviso", "Los registros están cerrados por el momento",
                        [
                            {text: 'Voler al inicio', onPress: () => this.props.navigation.navigate('IniciarSesion') }
                        ]
                    ));
                case 'auth/weak-password':
                    return(
                        Alert.alert("Aviso", "Contraseña muy débil, debe ser por lo menos de 6 carácteres.",
                        [
                            {text: 'Aceptar', onPress: () => this.refPasswd.current.focus() }
                        ])
                    );
            }
        });

       

    }
    
   
    render() {
        return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar
                backgroundColor={colors.primary}
            />
                <ScrollView contentContainerStyle={styles.container} style={{flex:1}}>
                    <Image
                            style={{ width:140, height:140}}
                            source={require('../assets/images/logo-blanco.png')}
                        />
                    <Text style={styles.logoText}>Ingresa los datos requeridos</Text>	
                    <View style={styles.formulario}>
                        <TextInput
                            ref={this.refNames}
                            theme={{ colors: { text:'#FFF', placeholder:'#22213f'}}}
                            style={styles.textInput}
                            placeholder='Nombres'
                            label='Nombres'
                            value={this.state.names}
                            onChangeText={names => this.setState({ names })}
                            mode='flat'                      
                        />
                        <TextInput
                            ref={this.refEmail}
                            theme={{ colors: { text:'#FFF', placeholder:'#22213f'}}}
                            style={styles.textInput}
                            placeholder='Correo'
                            label={this.state.labelEmail}
                            value={this.state.email}
                            onChangeText={email => {
                                this.setState({ email })
                                if (email!=='' && !email.includes('@')) {
                                    this.setState({ labelEmail:'No es una dirección de correo válida'});
                                } else {
                                    this.setState({ labelEmail: 'Correo Electrónico'})
                                }
                            }}
                            mode='flat'
                            error={this.state.email!=='' && !this.state.email.includes('@')}                     
                        />
                        <TextInput
                            ref={this.refPasswd}
                            theme={{ colors: { text:'#FFF', placeholder:'#22213f'}}}
                            style={styles.textInput}
                            mode='flat'
                            placeholder='Contraseña'
                            label='Contraseña'
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry
                        />
                        
                        <Button
                            theme={{ roundness:100}}
                            style={styles.buttonLogin}
                            mode='contained'
                            onPress={this.register}
                        >
                            Registrarse
                        </Button>
                    </View>
                </ScrollView>
        </SafeAreaView>
        );
    }
}

const styles = {
    container: {
        backgroundColor: colors.primary,
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: '10%'
    },
    textInput: {
        width:'100%',
    },
    buttonLogin: {
        backgroundColor: colors.primaryLight,
        marginVertical:16
    },
    logoImg: { 
        width: 140, 
        height: 140, 
        marginBottom: 50
    },
    formulario: {
        width:'100%',
        alignItems:'center',
        justifyContent:'center',

    },
    logoText : {
        marginVertical: 15,
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    }
}
registerInFirebase = (user, email, names) => {
    firebase.database().ref("Users/" + user.user._user.uid).set({
        email: email,
        nombres: names
    })
}

registerInWp = (user, email, names) => {
    Axios.post(Config.API_URL+"/wp-json/jwt-auth/v1/token",{
            "username": Config.WP_USER,
            "password": Config.WP_PASS
    })
    .then( function(response) {
        _storeData('wpToken', response.data.token);

        Axios.post(Config.API_URL+"/wp-json/wp/v2/appuser", {
            status:"publish",
            title: names,
            user_id:user.user._user.uid,
            nombres: names,
            correo: email
        },{
            headers: {
                Authorization: "Bearer " + response.data.token
            }
            
        }).then(function(response){
            console.log("usuario guardado correctamente en wp");
            console.log(response);
            console.log(response.data);
            })
        .catch(function(error){ 
            console.log("error add appuser wp");
            console.log(error);
            console.log(error.response);
        })
    })
    .catch(function (error) {
        console.log("error token axios: ");
        console.log(error);
        console.log(error.response);
    })
}

_storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem('@CDUTA:'+key, value);
    } catch (error) {
      // Error saving data
    }
  }
  
  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem('@CDUTA:'+key);
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }
     } catch (error) {
       // Error retrieving data
     }
  }


export default SignUp;