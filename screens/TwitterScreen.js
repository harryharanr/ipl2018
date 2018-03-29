import React from 'react';
import { Text,View,ActivityIndicator, Image, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


class TwitterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets:[],
      refreshing: false,
      accessToken: ''
    };
    this.getTweets = this.getTweets.bind(this);
  }
    componentWillMount(){
      var data = "grant_type=client_credentials";
      var self = this;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(JSON.parse(this.responseText));
          let response = JSON.parse(this.responseText);
          console.log(response.access_token);
          self.setState({accessToken: response.access_token})
          self.getTweets(response.access_token);
        }
      });

      xhr.open("POST", "https://api.twitter.com/oauth2/token");
      xhr.setRequestHeader("authorization", "Basic TlRJaFdkejRxNW9DaGcxcUUycGJtSkZFcTpIZ0pYRXlVYTJ4RkxBVzR4d1BUVW9ZWkVGbVRVWmNNT1dObUR4ZGNXdFBDZ3JDSE1zMQ==");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(data);
      
      
    }

    getTweets = (token) => {
      var data = null;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var self = this;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log('Tweets after success');
          let response = JSON.parse(this.responseText);
          console.log(response);
          self.setState({
            tweets: response.statuses,
            refreshing: false
          });
        }
      });

      xhr.open("GET", "https://api.twitter.com/1.1/search/tweets.json?q=from%3AChennaiIPL&result_type=recent");
      xhr.setRequestHeader("authorization", "Bearer "+token);
      xhr.setRequestHeader("accept-language", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(data);
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.getTweets(this.state.accessToken);
    }

    
    render() {
     let form = <ActivityIndicator />
      if(this.state.tweets.length >0){
        
        form = this.state.tweets.map((tweet,index) => {
          return (
          <Card key={index} style={styles.containerStyle}>
            <Text>
              {tweet.user.name}@{tweet.user.screen_name}
            </Text>
            <Divider style={styles.dividerStyle} />
            <Text>{tweet.text}</Text>
            {tweet.entities? tweet.entities.media? tweet.entities.media[0].type === 'photo' ?
              <Image
              style={{width:130,height:130}}
              resizeMode="cover"
              source={{ uri: tweet.entities.media[0].media_url }}
            />: null : null : null
            }
            <Divider style={styles.dividerStyle} />
            <Text>Retweets: {tweet.retweet_count}</Text>
          </Card>
          );
        });
      }
      return (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>
         }>
          {form}

        </ScrollView>
        );  
      
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  dividerStyle: {
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    marginTop: 7,
    marginBottom : 7
  }
})

export {TwitterScreen};
  