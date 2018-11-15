import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText, Text, TouchableRipple } from 'react-native-paper';
import Logo from '../components/Logo';

class ForgotPasswd extends Component {
    state = { email: '', password: '', names: ''   };
    render() {
        return (
            <View style={styles.container}>
                    <Logo />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Correo'
                        label='Ingrese su dirección de Correo Electrónico'
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                        mode='outlined'
                        theme={{ background: '#22213f'}}                        
                    />

                <HelperText
                    type='info'
                    visible={ this.state.username!=='' && !this.state.username.includes('@')}
                >
                    No es una dirección de correo válida.
                </HelperText>
                <Button
                    style={styles.buttonLogin}
                    mode='contained'
                    onPress={alert('test')}
                >
                    Ingresar
                </Button>
            </View>
        );
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
        marginVertical:-8
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

export default ForgotPasswd;