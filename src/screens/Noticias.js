import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header';
import Axios from 'axios';
import Posts from '../components/Posts';

class Noticias extends Component {
  constructor(props) {
    super(props);
    colors  = props.theme;
  }
  
  state = { posts: [], isLoading:true };

  componentWillMount() {
    //axios.get('http://clubdeportivo.uta.cl/?rest_route=/wp/v2/posts&_embed')
    Axios.get('http://clubdeportivo.rincondeantonia.cl/wp-json/wp/v2/posts?_embed')
    .then(response => {
      this.setState({ posts: response.data, isLoading:false });
      //console.log(response.data);
    })
    .catch((error) => {
      //console.error(error);
    });
  }


  render () {

      if (this.state.isLoading == true) {
        return (
          <View style={{ flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center',}}>
            <ActivityIndicator size="large" color="#deb01f"/>
          </View>
        )
      }
      else {
        return (
          <View style={{flex:1}}>
            <Header title="Noticias" navigation={this.props.navigation}/>
          <ScrollView>

            {this.state.posts.map((post, index) => (
              <Posts key={post.id} posts={post} navigation={this.props.navigation} />
              ))
            }
          </ScrollView>
          </View>
        )
      }
    }
  }
export default Noticias;