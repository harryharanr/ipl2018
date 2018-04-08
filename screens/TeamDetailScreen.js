import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Divider,SearchBar } from 'react-native-elements'
import firebase from 'firebase';
import { Font } from 'expo';

class TeamDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          playerDetails: [],
          filteredPlayerDetails: [],
          searchText: '',
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          headerTitle: params ? params.teamName : 'Team Details',
          left: true
        }
      };
    async componentDidMount() {
        await Font.loadAsync({
          'georgia': require('../assets/fonts/Georgia.ttf'),
          'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
          'light': require('../assets/fonts/Montserrat-Light.ttf'),
        });
    }
    componentWillMount(){
      var self = this;
        console.log(this.props.navigation.state.params.teamId);
        var playersRef = firebase.database().ref('Players/PlayerList');
        playersRef.orderByChild('TeamID').equalTo(this.props.navigation.state.params.teamId)
                        .on('value', function(data){
                            console.log("PlayerList");
                            console.log(data.val());
                            const playerList = Array.isArray(data.val()) ?  data.val() : Object.values(data.val());
                            let players = playerList.map((item)=>{
                              return item;
                            });
                            self.setState({
                              playerDetails: players,
                              filteredPlayerDetails: players
                            });

                        });
    }

    searchPlayer = (value) => {
      // console.log(this.state.searchText);
      // var searchText = this.state.searchText.toUpperCase();
      this.setState({searchText: value});
      var searchText = this.state.searchText.toUpperCase();
      let filterDetails = this.state.playerDetails.filter((item) => {
        return item.Players.toUpperCase().indexOf(searchText) > -1;
      });
      this.setState({
        filteredPlayerDetails : filterDetails,
      });
    }

    clearFilter = () => {
      this.setState({
        filteredPlayerDetails: this.state.playerDetails,
        searchText: ''
      })
    }



    render() {
      let form = <ActivityIndicator style = {styles.activityIndicator}/>
      if(this.state.playerDetails.length>0){
        form = this.state.filteredPlayerDetails.map((item,index) => {
          return (
            <Card key={index} containerStyle={styles.containerStyle}>
              <View style={{flex: 1, flexDirection: 'column'}}>
              <View  style={{'justifyContent':'center','alignItems':'center',flex:1}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily:'regular'}}>
                  {item.Players}
                </Text>
              </View>
              <Divider style={styles.dividerStyle} />
              <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:4,backgroundColor:'#fff',justifyContent:'center',borderRightWidth:1,borderColor:'lightgrey', 'alignItems':'center'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'regular',fontSize:15}}>{item.Role}</Text>
                </View>
                <View style={{flex:5,backgroundColor:'#fff',marginLeft:5,borderRightWidth:1,borderColor:'lightgrey'}}>
                  <Text style={{marginLeft:5,fontFamily: 'regular',fontWeight:'bold'}}> Player Worth : </Text>
                  <Text style={{marginLeft:10,fontFamily: 'regular'}}>{item.PlayerWorth}</Text>
                  <Divider style={styles.dividerStyle} />
                   
                  <Text style={{marginLeft:10,fontFamily: 'regular',fontWeight:'bold'}}>Team</Text>  
                  <Text style={{marginLeft:10,fontFamily: 'regular'}}>{item.Shortform}</Text>
                </View>
              </View>
              </View>
            </Card>
          )
        })
      }
      return (
        <View>
        <SearchBar
            value={this.state.searchText}
            lightTheme={true}
            onChangeText={(value) => this.searchPlayer(value)}
            onClear={this.clearFilter}
            clearIcon
            placeholder='Search Player...' /> 
        <ScrollView>
         {form}
        </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  containerStyle: {
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
  dividerStyle: {
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    marginTop: 7,
    marginBottom : 7
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
  
})

export {TeamDetailScreen};