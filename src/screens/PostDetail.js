import HTML from 'react-native-render-html';
import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { withNavigation } from 'react-navigation';


class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.post = '';
  }
 

  render() {
    this.post=this.props.navigation.getParam('post','post');
    this.navigation = this.props.navigation.getParam('navigation',null);
    let image='';
    if(this.post._embedded['wp:featuredmedia']) {
        image = this.post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url;
    }
    else {
        image ='https://picsum.photos/700';
    }
    console.log(image);
    console.log(this.post.title);
    console.log(this.post.content)
    return (

      <View style={{flex:1}}>
        <Header title={this.post.title.rendered} navigation={this.navigation}/>
        <ScrollView>
          <Card style={{margin:8}} theme={{roundness:4}}>
            <Card.Cover source={{ uri: image }} />
            <Card.Content>
              <Title>{this.post.title.rendered}</Title>
              <Paragraph>{this.post.content.plaintext}</Paragraph>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>

    );
  }
}

export default withNavigation(PostDetail);