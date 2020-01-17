import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import Unsplash, { toJson } from 'unsplash-js/native';

// const unsplash = new Unsplash({ 
//   accessKey: "86b4ee0cd6081f1885541c9148eb71df3defca3ef318adef25c6cb20c1189bc0",
//   secret: "5ae90270bb9d65ecfff3365646fe16a79dca6f9a113353e005aa9c0095343cfe"
//  });



export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      isLoading: true
    }
  }

  renderItem = (title) => {
    return (
      <View >
        <Text>{title.alt_description}</Text>
        <Image
            style={{flex: 1, width: 80, height: 100}}
            source={{ uri: title.urls.regular }}
          />
      </View>
    );
  }

  getPictures = () => {
    // unsplash.photos.listPhotos(2, 15, "latest")
    // .then(toJson)
    // .then((json) => {
    //   this.setState({
    //     allPhotos: json
    //   })
    //   // json.map((photo) => {
    //   //   console.log(photo.urls.regular)
    //   // })
    // })
    // .catch(err => {
    //   console.log(err)
    // });

    axios.get('https://api.unsplash.com/photos/random?count=30&client_id=86b4ee0cd6081f1885541c9148eb71df3defca3ef318adef25c6cb20c1189bc0')
    .then((response) => {
      this.setState({
        images: response.data
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }

  componentDidMount = () => {
    this.getPictures()
  }

  render() {
    console.log(this.state.images)
    return (
      <SafeAreaView style={styles.container}>
        <Text>Unsplash API Example</Text>
        <FlatList
          data={this.state.images}
          renderItem={(({ item }) => this.renderItem(item)) }
          keyExtractor={item => item.id}
        />
        
      </SafeAreaView>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});