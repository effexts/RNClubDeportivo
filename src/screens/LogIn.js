import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, SafeAreaView, StatusBar} from 'react-native';
import { TextInput, Button, HelperText, Text, TouchableRipple, Portal, Dialog, Paragraph, Colors } from 'react-native-paper';
import firebase from 'react-native-firebase';
import Logo from '../components/Logo';
import colors from '../assets/config/colors'

import { connect } from 'react-redux'
import { emailChanged, passwordChanged } from '../actions';


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.refEmail = React.createRef();
        this.passwd = React.createRef();
    }
    static navigationOptions = {
        header:null
    }
    
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
                            label={this.props.labelEmail}
                            value={this.props.email}
                            onChangeText={this.onEmailChanged.bind(this)}
                            mode='flat'
                            error={ this.props.email!=='' && !this.props.email.includes('@')}
                        />
                    <TextInput
                        theme={{ colors: { text:'#FFF', placeholder:'#22213f'}}}
                        ref={this.passwd}
                        style={styles.textInput}
                        mode='flat'
                        placeholder='Contraseña'
                        label='Contraseña'
                        value={this.props.password}
                        onChangeText={this.onPasswordChanged.bind(this)}
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

    onEmailChanged(text) {
        this.props.emailChanged(text);
    }
    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }
    signIn() {
        const { email, password } = this.props
        if (!email || !password) {
          alert('Los campos no deben estar vacíos');
          return
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(function(error){
            const errorCode = error.code;
            //console.log(errorCode);
            const errorMessage = error.message;
            //console.log(errorMessage);
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

const mapStateToProps = (state, ownProps) => {
        //console.log(state);
        return ({
            email: state.auth.email,
            labelEmail: state.auth.labelEmail,
            password: state.auth.password
        })
}


export default connect(mapStateToProps, { emailChanged, passwordChanged })(LogIn);