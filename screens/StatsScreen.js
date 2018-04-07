import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Picker
} from 'react-native';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Font } from 'expo';

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: '',
      criteria: 'java'
    };
  }

  static renderFilm(film) {
    // const { title, director, opening_crawl, episode_id } = film;
    // const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;

    return (
      <View>
        <Text style={styles.titleText}>{film}</Text>
        {/* <Text style={styles.directorText}>({director})</Text>
        <Text style={styles.openingText}>{opening_crawl}</Text> */}
      </View>
    );
  }
  static navigationOptions = {
    //header: null,
    title: 'Stats',
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
    });
  }

  componentWillMount() {
    var self = this;
    let ref = firebase.database().ref('History/Players/');
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      let players = snapshot.val().map((item)=>{
        return item;
      });
      self.setState({films: players})
   }, function (error) {
      console.log("Error: " + error.code);
   });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.PlayerName.search(regex) >= 0);
  }


  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    let form = <ActivityIndicator style = {styles.activityIndicator}/>
    if(this.state.films.length>0){
      form = (
        <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle = {styles.inputContainerStyle}
          listStyle = {styles.listStyle}
          data={films.length === 1 && comp(query, films[0].PlayerName) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Player Name"
          renderItem={({ PlayerName }) => (
            <TouchableOpacity onPress={() => this.setState({ query: PlayerName })}>
              <Text style={styles.itemText}>
                {PlayerName}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
         
          <Picker
            selectedValue={this.state.criteria}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) => this.setState({criteria: itemValue})}>
            <Picker.Item label="Select a Filter" value="" />
            <Picker.Item label="Aganist Particular Bowler" value="1" />
            <Picker.Item label="At Particular Place" value="2" />
            <Picker.Item label="At Particular Stadium" value="3" />
            <Picker.Item label="Aganist Particular Bowler Type" value="4" />
          </Picker>
        </View>
        
        <TouchableOpacity onPress={() => this.props.toggleModal(this.state.selectedTeam)}>
                <View style={styles.button}>
                  <Text style={{color:'#fff'}}>GET STATS</Text>
                </View>
        </TouchableOpacity>      
        {/* <View style={styles.descriptionContainer}>
            {
              this.state.criteria == '' ? '' : this.state.criteria == '1' ? '' : 
              <Picker
                selectedValue={this.state.criteria}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => this.setState({criteria: itemValue})}>
                  <Picker.Item label="Select a Filter" value="" />
                  <Picker.Item label="Aganist Particular Bowler" value="1" />
                  <Picker.Item label="At Particular Place" value="2" />
                  <Picker.Item label="At Particular Stadium" value="3" />
                  <Picker.Item label="Aganist Particular Bowler Type" value="4" />
              </Picker>
            }
        </View> */}
      </View>
      );
    }
    return (
      <View style={{flex:1,justifyContent:'center',backgroundColor: '#F5FCFF',}}>
        {form}
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
    margin: 30
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  pickerStyle:{
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  listStyle: {
    padding: 10
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export {StatsScreen};