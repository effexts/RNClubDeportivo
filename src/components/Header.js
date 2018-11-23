import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'

const Header = props => {
    //const {navigate} = props.navigation
    return (
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={() => props.navigation.toggleDrawer()} />

            <Appbar.Content
                title={props.title}
                
            />
        </Appbar.Header>
/*         <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()}>
                <Icon 
                    name="bars"
                    color="white"
                    size={25}
                />
            </TouchableWithoutFeedback>
            <View style={{alignSelf:'center', flex:1}}><Text style={styles.headerTitle}>{props.title}</Text></View>
        </View> */
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor: '#22214f',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    logo: {
        width: 120,
        height: 40
    },
    headerTitle:{
        color: '#FFF',
        alignSelf: 'center',
        fontSize: 20
    }
})

export default Header