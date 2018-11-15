import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

const Welcome = () => {
    return (
        <View style={{ flex: 1, backgroundColor:'#22213f', alignItems:'center', margin:0, padding:0}}>
            <ImageBackground
                tintColor='#678fca44'
                style={{ width:'100%', height:'100%'}}
                source={require('../assets/images/logo-blanco-25.png')}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20, paddingBottom:50, alignSelf:'center' }}>Bienvenidos al Club Deportivo Digital</Text>
                    <View style={{ flexDirection:'row', justifyContent:'space-evenly', alignItems:'stretch'}}>
                        <Button mode='contained'>Ingresar</Button>
                        <Button mode='contained'>Registrarse</Button>
                    </View>
                </View>
                
            </ImageBackground>
            
        </View>
    );
}

export { Welcome };