import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { withNavigation } from 'react-navigation';


class Posts extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { posts } = this.props;
        //console.log(posts);
        let image;
        if(posts._embedded['wp:featuredmedia']) {
            image = posts._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url;
        }
        else {
            image ='https://picsum.photos/700';
        }

        return (
            <Card style={{margin:8}} theme={{roundness:4}}>
                <Card.Content>
                    <Title>{posts.title.rendered}</Title>
                    <Card.Cover source={{uri:image}} style={{flex:1}} key = {posts.id}/>
                    <Paragraph>{posts.excerpt.plaintext}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode='outlined' onPress={() => {
                        this.props.navigation.navigate('PostDetail', {
                            post: posts,
                            navigation: this.props.navigation
                        });
                    }} >Leer Más</Button>
                </Card.Actions>
            </Card>
        );
    }
}

export default withNavigation(Posts);
