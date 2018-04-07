import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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
      secondQuery: '',
      criteria: '',
      placeCriteria: '',
      bowlerType: '',
      results: []
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
      self.setState({
        films: players,
        secondFilms: players
      })
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


  getStats = () => {
    var self =this;
    if(this.state.criteria === '4'){
      if(this.state.query !== ''){
        console.log(this.state.query);
        console.log(this.state.bowlerType);
        const bowlerType = this.state.bowlerType;
        var playersRef = firebase.database().ref('History/BowlerType/BowlerType');
        playersRef.orderByChild('Batsman').equalTo(this.state.query)
                        .on('value', function(data){
                            console.log(data.val());
                            const playerList = Array.isArray(data.val()) ?  data.val() : Object.values(data.val());
                            console.log(playerList);
                            let players = playerList.filter((item)=>{
                              return item.Bowler_Type === bowlerType;
                            });
                            console.log(players);
                            self.setState({results: [...players]});
                            self.props.navigation.navigate('Stats',{
                              playerDetails: players,
                              playerName: self.state.query,
                              criteria: self.state.bowlerType
                            })
                        });
      }
    }
  }

  render() {        
    const { query, secondQuery } = this.state;
    const films = this.findFilm(query);
    const secondFilms = this.findFilm(secondQuery);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    let form = <ActivityIndicator style = {styles.activityIndicator}/>
    let thirdValue = <View />
    console.log("Check1" +this.state.criteria)
    if(this.state.criteria !== ''){
      console.log("Check2")
      switch(this.state.criteria){
        case "1":
          thirdValue = (
            <View>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle = {styles.inputContainerStyle}
                listStyle = {styles.listStyle}
                data={secondFilms.length === 1 && comp(secondQuery, secondFilms[0].PlayerName) ? [] : secondFilms}
                defaultValue={secondQuery}
                onChangeText={text => this.setState({ secondQuery: text })}
                placeholder="Enter Player Name"
                renderItem={({ PlayerName }) => (
                  <TouchableOpacity onPress={() => this.setState({ secondQuery: PlayerName })}>
                    <Text style={styles.itemText}>
                      {PlayerName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );
          break;
        case "2":
          thirdValue = (
            <Picker
            selectedValue={this.state.placeCriteria}
            style={styles.secondPickerStyle}
            onValueChange={(itemValue, itemIndex) => this.setState({criteria: itemValue})}>
            <Picker.Item label="Select a Filter" value="" />
            <Picker.Item label="Aganist Particular Bowler" value="1" />
            <Picker.Item label="At Particular Place" value="2" />
            <Picker.Item label="At Particular Stadium" value="3" />
            <Picker.Item label="Aganist Particular Bowler Type" value="4" />
          </Picker>
          );
          break;
        case "3":
          thirdValue = (
            <Picker
            selectedValue={this.state.placeCriteria}
            style={styles.secondPickerStyle}
            onValueChange={(itemValue, itemIndex) => this.setState({criteria: itemValue})}>
            <Picker.Item label="Select a Filter" value="" />
            <Picker.Item label="Aganist Particular Bowler" value="1" />
            <Picker.Item label="At Particular Place" value="2" />
            <Picker.Item label="At Particular Stadium" value="3" />
            <Picker.Item label="Aganist Particular Bowler Type" value="4" />
          </Picker>
          );
          break;
        case "4":
          thirdValue = (
            <Picker
            selectedValue={this.state.bowlerType}
            style={styles.secondPickerStyle}
            onValueChange={(itemValue, itemIndex) => this.setState({bowlerType: itemValue})}>
            <Picker.Item label="Select a Filter" value="" />
            <Picker.Item label="Left Arm Fast" value="Left Arm Fast" />
            <Picker.Item label="Right Arm Fast" value="Right Arm Fast" />
            <Picker.Item label="Right Arm legbreak" value="Right Arm legbreak" />
            <Picker.Item label="Right Arm offbreak" value="Right Arm offbreak" />
            <Picker.Item label="Left-arm orthodox" value="Left-arm orthodox" />
            <Picker.Item label="Left-arm chinaman" value="Left-arm chinaman" />
          </Picker>
          );
          break;
        default:
          thirdValue = <View />
        
      }
    }
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
        <View>{thirdValue}</View>
        <View style={this.state.criteria == '1'?styles.buttonContainer: ''}>
        <TouchableOpacity
           onPress={this.getStats}>
                <View style={styles.button}>
                  <Text style={{color:'#fff'}}>GET STATS</Text>
                </View>
        </TouchableOpacity>
        </View>
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
  autoScompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
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
  secondPickerStyle:{
    width: '100%'
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
  buttonContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 55
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