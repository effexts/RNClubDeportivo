import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import HTML from 'react-native-render-html';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { posts } = this.props;
        console.log(posts);
        let image;
        if(posts._embedded['wp:featuredmedia']) {
            image = posts._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url;
        }
        else {
            image ='https://picsum.photos/700';
        }

        return (
            <Card>
                <Card.Content>
                    <Title>{posts.title.rendered}</Title>
                    <Card.Cover source={{uri:image}} style={{flex:1}} key = {posts.id}/>
                    <Paragraph>{posts.excerpt.plaintext}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode='outlined'>Leer Más</Button>
                </Card.Actions>
            </Card>
        );
    }
}

export default Posts;
