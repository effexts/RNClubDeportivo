import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header';
import axios from 'axios';
import Posts from '../components/Posts';

class Noticias extends Component {
  state = { posts: [], isLoading:true };

  componentWillMount() {
    axios.get('http://clubdeportivo.rincondeantonia.cl/wp-json/wp/v2/posts?_embed')
    .then(response => {
      this.setState({ posts: response.data, isLoading:false });
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  render () {

      if (this.state.isLoading == true) {
        return (
          <View style={{ flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center',}}>
            <ActivityIndicator size="large"color="#1C97F7"/>
          </View>
        )
      }
      else {
        return (
          <ScrollView>
            <Header title="Noticias" navigation={this.props.navigation}/>
            {this.state.posts.map((post, index) => (
              <Posts key={post.id} posts={post} />
              ))
            }
          </ScrollView>
        )
      }
    }
  }
export default Noticias;