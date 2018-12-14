import React from 'react'
import { Appbar } from 'react-native-paper';

const Header = props => {
    //const {navigate} = props.navigation
        if(props.title === 'Noticias' || props.title === 'Mis Actividades Deportivas'){
            return (
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => props.navigation.toggleDrawer()} />
                    <Appbar.Content
                        title={props.title}
                    />
                </Appbar.Header>
            )
        }
        else {
            return (
                <Appbar.Header>
                    <Appbar.Action icon="arrow-back" onPress={() => props.navigation.toggleDrawer()} />
                    <Appbar.Content
                        title={props.title}
                    />
                </Appbar.Header>
            )
        }
    

}

export default Header