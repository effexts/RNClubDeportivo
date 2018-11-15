import React, { Component } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { TextInput, Button, HelperText, Text, TouchableRipple } from 'react-native-paper';
import firebase from 'react-native-firebase';
import Logo from '../components/Logo';


class LogIn extends Component {
    static navigationOptions = {
        header:null
    }
    state = { email: 'effexts@gmail.com', password: '123123', names: '', labelEmail:'Correo Electrónico'   };
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Logo />
                <TextInput
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
            </ScrollView>
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
            console.log(error)
        });
    }
    onLoginSuccess() {
        console.log('correcto')
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#22213f',
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center'
    },
    textInput: {
        width:'80%',
    },
    buttonLogin: {
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