import React from 'react';
import { Text,View,ActivityIndicator, Image, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import BottomModal from './../shared/Modal/BottomModal';
import firebase from 'firebase';

class TwitterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Twitter',
      headerRight: (
        <Button onPress={params.openFilterModal} title="Filter" color='rgba(232, 147, 142, 1)' />
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      tweets:[],
      refreshing: false,
      accessToken: '',
      modalStatus: false,
      modalText: '',
      modalButtonText: '',
      teams: [],
      selectedTeam: '',
      searchString: 'IPL'
    };
    this.getTweets = this.getTweets.bind(this);
  }
    componentWillMount(){
      this.props.navigation.setParams({ openFilterModal: this.openFilterModal });

      var data = "grant_type=client_credentials";
      var self = this;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          let response = JSON.parse(this.responseText);
          self.setState({accessToken: response.access_token})
          self.getTweets(response.access_token,self.state.searchString);
        }
      });

      xhr.open("POST", "https://api.twitter.com/oauth2/token");
      xhr.setRequestHeader("authorization", "Basic TlRJaFdkejRxNW9DaGcxcUUycGJtSkZFcTpIZ0pYRXlVYTJ4RkxBVzR4d1BUVW9ZWkVGbVRVWmNNT1dObUR4ZGNXdFBDZ3JDSE1zMQ==");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(data);
    }

    getTweets = (token,searchString) => {
      var data = null;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var self = this;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          let response = JSON.parse(this.responseText);
          self.setState({
            tweets: response.statuses,
            refreshing: false
          });
        }
      });

      xhr.open("GET", "https://api.twitter.com/1.1/search/tweets.json?q=from%3A"+searchString+"&result_type=recent");
      xhr.setRequestHeader("authorization", "Bearer "+token);
      xhr.setRequestHeader("accept-language", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(data);
      self.getTeams();
    }

    getTeams = () => {
      var self = this;
      let ref = firebase.database().ref('Teams/');
      ref.on("value", function(snapshot) {
        console.log(snapshot.val());
        let teams = snapshot.val().map((item)=>{
          return {"TeamID": item.TeamID,"TeamName": item.TeamName}
        });
        self.setState({teams: teams})
     }, function (error) {
        console.log("Error: " + error.code);
     });
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.getTweets(this.state.accessToken,this.state.searchString);
    }

    closeModal = (value) => {
      console.log('value from dropdown');
      console.log(value);
      this.setState({
        modalStatus: false,
        modalText: ''
      });
    }

    openFilterModal = () =>{
      console.log('Modal Test');
      this.setState({
        modalStatus: true,
        modalText: 'Filter',
        modalButtonText: 'Filter'
      });
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
              style={{flex:1 , width: '100%', height: '100%'}}
              resizeMode="contain"
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
          {this.state.modalStatus?<BottomModal isModalVisible={this.state.modalStatus} toggleModal={this.closeModal} 
          teams={this.state.teams} buttonText={this.state.modalButtonText}/>: null}
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
  