import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage} from 'react-native';
import Header from '../components/Header';
import { FAB, Headline, Subheading } from 'react-native-paper';
import Axios from 'axios';
import Config from 'react-native-config';



class MisActividadesDep extends Component {
  constructor(props) {
    super(props);
    this.state = {
        act_count:0
    };
  }

  render() {
    return (
    <View style={{flex:1}}>
        <Header title="Mis Actividades Deportivas" navigation={this.props.navigation}/>
        <ScrollView contentContainerStyle={styles.content}>
            { this.state.act_count === 0 && 
                <View>
                    <Headline>Aún no tienes ninguna actividad deportiva inscrita. </Headline>
                    <Subheading>Inscribete en una haciendo click en el botón +</Subheading>
                </View>
            }
            {/*         {this.state.posts.map((post, index) => (
            <Posts key={post.id} posts={post} navigation={this.props.navigation} />
            ))
            } */}
        </ScrollView>
        <FAB
            style={styles.fab}
            small
            icon="add"
            onPress={() => console.log('Pressed')}
        />
        </View>
    );
  }

  getActividadesDep = () => {
      Axios.get(Config.V2+"actividades_deportiv")
      .then()
  }
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
});
export default MisActividadesDep;
