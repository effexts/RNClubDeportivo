import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Logo from '../components/Logo';

class SignUp extends Component {
    state = { email: '', password: '', names: '', labelEmail:'Correo Electrónico' };
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                        style={{ width:140, height:140}}
                        source={require('../assets/images/logo-blanco.png')}
                    />
                <Text style={styles.logoText}>Ingresa los datos requeridos</Text>	
                <View style={styles.formulario}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Nombres'
                        label='Nombres'
                        value={this.state.names}
                        onChangeText={names => this.setState({ names })}
                        mode='flat'
                        theme={{ background: '#22213f'}}                        
                    />
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
                        error={this.state.email!=='' && !this.state.email.includes('@')}                     
                    />
                    <TextInput
                        style={styles.textInput}
                        mode='flat'
                        theme={{ background: '#22213f'}}
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
                    >
                        Registrarse
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        backgroundColor:'#22213f',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
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

export default SignUp;