import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, SafeAreaView, StatusBar} from 'react-native';
import { TextInput, Button, HelperText, Text, TouchableRipple, Portal, Dialog, Paragraph, Colors } from 'react-native-paper';
import firebase from 'react-native-firebase';
import Logo from '../components/Logo';
import colors from '../assets/config/colors'


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.refEmail = React.createRef();
        this.passwd = React.createRef();
    }
    static navigationOptions = {
        header:null
    }
    state = { email: 'effexts@gmail.com', password: '123123', names: '', labelEmail:'Correo Electrónico'   };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={colors.primary}
                />

                    <Logo />
                    <TextInput
                            theme={{ colors: { text:'#FFF', placeholder:'#22213f'}}}
                            ref={this.refEmail}
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
                            error={ this.state.email!=='' && !this.state.email.includes('@')}
                        />
                    <TextInput
                        theme={{ colors: { text:'#FFF', placeholder:'#22213f'}}}
                        ref={this.passwd}
                        style={styles.textInput}
                        mode='flat'
                        placeholder='Contraseña'
                        label='Contraseña'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                    <Button
                        style={styles.buttonLogin}
                        mode='contained'
                        onPress={this.signIn.bind(this)}
                        theme={{ roundness:100 }}
                    >
                        Ingresar
                    </Button>
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.registroText}>¿No tienes una cuenta?  </Text>
                        <TouchableRipple
                            onPress={() => this.props.navigation.navigate('Registrarse')}
                            rippleColor="rgba(222, 176, 31, .82)">
                            <Text style={styles.registroButton}>Registrate!</Text>
                        </TouchableRipple>
                    </View>

            </SafeAreaView>
        );
    }

    signIn() {
        const { email, password } = this.state;
        if (!email || !password) {
          alert('Los campos no deben estar vacíos');
          return
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(function(error){
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            switch (errorCode) {
                case 'auth/invalid-email':
                    return ( Alert.alert("Aviso","Correo Inválido",
                        [
                            {text: 'Aceptar', onPress: () => this.refEmail.current.focus() }
                        ]
                    ));
                case 'auth/user-disabled':
                    return ( Alert.alert("Aviso","Usuario deshabilitado") );
                case 'auth/user-not-found':
                    return Alert.alert("Error", "No existe un usuario registrado para ese correo",
                      [
                        
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: '¿Registrarse?', onPress: () => this.props.navigation.navigate('Registrarse') },
                      ],
                      { cancelable: false }
                            ); 
                case 'auth/wrong-password':
                    return ( Alert.alert("Aviso", "La contraseña introducida es incorrecta") );           
                default:
                    break;
            }
        }.bind(this));
    }

    onLoginSuccess() {
        this.props.navigation.navigate('Inicio');
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: '10%'
    },
    textInput: {
        width:'100%',
        color: "#33dd55",
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
    bottomTextContainer: {
        flexGrow:1,
        flexDirection: 'row',
        alignItems:'flex-end',
        paddingVertical:16
    },
    registroText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    registroButton: {
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'500'
    }
});

export default LogIn;