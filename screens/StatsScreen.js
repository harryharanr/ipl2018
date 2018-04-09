import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  Picker,
  Dimensions
} from 'react-native';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Font } from 'expo';
import { stadiumList } from './../constants/Stadium';
import { placeList } from './../constants/State';
import ModalTest from '../shared/Modal/Modal';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: '',
      secondQuery: '',
      criteria: '',
      bowlerType: '',
      results: [],
      stadiumSelected: '',
      stadium: stadiumList,
      place: placeList,
      placeSelected: '',
      modalStatus: false,
      modalText: ''
    };
  }

  static navigationOptions = {
    //header: null,
    title: 'Stats',
    headerStyle: {paddingBottom:20,height: winHeight * 0.07}
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

  refreshFormValues = () => {
    this.setState({
      secondQuery: '',
      criteria: '',
      bowlerType: '',
      results: [],
      stadiumSelected: '',
      stadium: stadiumList,
      place: placeList,
      placeSelected: '',
      query: ''
    })
  }


  getStats = () => {
    var self =this;
    if(this.state.criteria === '4'){
      if(this.state.query !== '' && this.state.bowlerType !== ''){
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
                              criteria: self.state.bowlerType,
                              displayCriteria: 'Vs'
                            })
                        });
      }
      else{
        this.setState({
          modalStatus: true,
          modalText: 'PLEASE CHOOSE A BOWLER TYPE'
        })
      }
    }
    else if(this.state.criteria === '3'){
      if(this.state.query !== '' && this.state.stadiumSelected !== ''){
        console.log(this.state.query);
        console.log(this.state.stadiumSelected);
        const stadiumSelected = this.state.stadiumSelected;
        var playersRef = firebase.database().ref('Fixtures/StadiumList/Stadium');
        playersRef.orderByChild('Batsman').equalTo(this.state.query)
                        .on('value', function(data){
                            console.log(data.val());
                            const playerList = Array.isArray(data.val()) ?  data.val() : Object.values(data.val());
                            console.log(playerList);
                            let players = playerList.filter((item)=>{
                              return item.Stadium === stadiumSelected;
                            });
                            console.log(players);
                            self.setState({results: [...players]});
                            self.props.navigation.navigate('Stats',{
                              playerDetails: players,
                              playerName: self.state.query,
                              criteria: self.state.stadiumSelected,
                              displayCriteria: 'In'
                            })
                        });
      }
      else{
        this.setState({
          modalStatus: true,
          modalText: 'PLEASE CHOOSE A STADIUM'
        })
      }
    }
    else if(this.state.criteria === '2'){
      if(this.state.query !== '' && this.state.placeSelected !== ''){
        console.log(this.state.query);
        console.log(this.state.placeSelected);
        const placeSelected = this.state.placeSelected;
        var playersRef = firebase.database().ref('TeamDetails/PlaceList/Place');
        playersRef.orderByChild('Batsman').equalTo(this.state.query)
                        .on('value', function(data){
                            console.log(data.val());
                            const playerList = Array.isArray(data.val()) ?  data.val() : Object.values(data.val());
                            console.log(playerList);
                            let players = playerList.filter((item)=>{
                              return item.Place === placeSelected;
                            });
                            console.log(players);
                            self.setState({results: [...players]});
                            self.props.navigation.navigate('Stats',{
                              playerDetails: players,
                              playerName: self.state.query,
                              criteria: self.state.placeSelected,
                              displayCriteria: 'In'
                            })
                        });
      }
      else{
        this.setState({
          modalStatus: true,
          modalText: 'CHOOSE A PLACE'
        })
      }
    }
    else if(this.state.criteria === '1'){
      if(this.state.query !== '' && this.state.secondQuery){
        console.log(this.state.query);
        console.log(this.state.secondQuery);
        const bowlerSelected = this.state.secondQuery;
        var playersRef = firebase.database().ref('Players/BowlerList/Bowlers');
        playersRef.orderByChild('Batsman').equalTo(this.state.query)
                        .on('value', function(data){
                            console.log(data.val());
                            const playerList = Array.isArray(data.val()) ?  data.val() : Object.values(data.val());
                            console.log(playerList);
                            let players = playerList.filter((item)=>{
                              return item.Bowler === bowlerSelected;
                            });
                            console.log(players);
                            self.setState({results: [...players]});
                            self.props.navigation.navigate('Stats',{
                              playerDetails: players,
                              playerName: self.state.query,
                              criteria: self.state.secondQuery,
                              displayCriteria: 'Vs'
                            })
                        });
      }
      else{
        this.setState({
          modalStatus: true,
          modalText: 'PLAYER NAME IS MANDATORY'
        })
      }
    }
    else{
      if(this.state.query === ''){
        this.setState({
          modalStatus: true,
          modalText: 'PLAYER NAME IS MANDATORY'
        })
      }else{
        this.setState({
          modalStatus: true,
          modalText: 'CHOOSE A FILTER CRITERIA'
        })
      }
    }
  }

  closeModal = () => {
    this.setState({
      modalStatus: false,
      modalText: ''
    });
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
            selectedValue={this.state.placeSelected}
            style={styles.secondPickerStyle}
            onValueChange={(itemValue, itemIndex) => this.setState({placeSelected: itemValue})}>
            <Picker.Item label="Select a Filter" value="" />
            {this.state.place.map((item,index)=>{
                              return <Picker.Item key={item.id} label={item.Place} value={item.Place} />  
                        })}
          </Picker>
          );
          break;
        case "3":
          thirdValue = (
            <Picker
            selectedValue={this.state.stadiumSelected}
            style={styles.secondPickerStyle}
            onValueChange={(itemValue, itemIndex) => this.setState({stadiumSelected: itemValue})}>
            <Picker.Item label="Select a Filter" value="" />
            {this.state.stadium.map((item,index)=>{
                              return <Picker.Item key={item.id} label={item.Stadium} value={item.Stadium} />  
                        })}
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
        <TouchableOpacity
           onPress={this.refreshFormValues}>
                <View style={styles.clearButton}>
                  <Text style={{color:'black'}}>CLEAR FILTER</Text>
                </View>
        </TouchableOpacity>
        </View>
      </View>
      );
    }
    return (
      <View style={{flex:1,justifyContent:'center',backgroundColor: '#F5FCFF'}}>
        {this.state.modalStatus?<ModalTest isModalVisible={this.state.modalStatus} toggleModal={this.closeModal} 
          message={this.state.modalText} buttonText="CLOSE"/>: null}
        {form}
        <View style={{marginBottom: 0,justifyContent:'center',alignItems:'center',backgroundColor:'lightgray'}}>
            <Text style={{fontSize:12}}>*Note : Stats from 2012-2017</Text>
        </View>
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
  clearButton:{
    backgroundColor: 'lightgray',
    padding: 12,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'black'
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
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});

export {StatsScreen};