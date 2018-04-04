import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import firebase from 'firebase';
import { Font } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';  
import Zion from 'react-native-vector-icons/Zocial';

class TeamsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: []
    }
  }

  static navigationOptions = {
    //header: null,
    title: 'Teams',
  }

  componentWillMount() {
    var self = this;
    let ref = firebase.database().ref('TeamDetails/Teams/');
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      let teams = snapshot.val().map((item)=>{
        return item;
      });
      self.setState({teams: teams})
   }, function (error) {
      console.log("Error: " + error.code);
   });
  }

  async componentDidMount() {
      await Font.loadAsync({
        'georgia': require('../assets/fonts/Georgia.ttf'),
        'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'light': require('../assets/fonts/Montserrat-Light.ttf'),
      });
  }

  render() {
      let form = <ActivityIndicator style = {styles.activityIndicator}/>
      if(this.state.teams.length>0){
        form = this.state.teams.map((item,index) => {
          return (
            <TouchableOpacity key={index}  onPress={() => this.props.navigation.navigate('TeamDetails',{
              teamId: item.TeamID,
              teamName: item.TeamName,
            })}>
            <Card containerStyle={styles.containerStyle}>
              
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex:4,backgroundColor:'#fff',justifyContent:'center',borderRightWidth:1,borderColor:'lightgrey'}}>
                    <Text style={{fontWeight:'bold',fontFamily:'regular',fontSize:15}}>{item.TeamName}</Text>
                </View>
                <View style={{flex:5.3,backgroundColor:'#fff',marginLeft:5,borderRightWidth:1,borderColor:'lightgrey'}}>
                <View style={{flexDirection:'row'}}><Zion name='persona' size={15} /><Text style={{marginLeft:5}}>{item.Coach}</Text></View>
                  <Divider style={styles.dividerStyle} />
                   
                  <View style={{flexDirection:'row'}}><Icon name='trophy' size={15} /><Text style={{marginLeft:5}}> {item.Highlights}</Text></View>
                  <Divider style={styles.dividerStyle} />
                  <View style={{flexDirection:'row'}}><Icon name='users' size={15} /><Text style={{marginLeft:5}}>{item.Players}</Text></View>
                </View>
                <View style={{flex:0.7,backgroundColor:'#fff',marginLeft:5,justifyContent:'center' }}
                  >
                    <Ionicons name='ios-arrow-dropright-outline' size={26} 
                        onPress={() => this.props.navigation.navigate('TeamDetails',{
                          teamId: item.TeamID,
                          teamName: item.TeamName,
                        })}/>
                </View>
              </View>
            </Card>
            </TouchableOpacity>
          )
        })
      }
      return (
        <ScrollView>
          {form}
        </ScrollView>
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

  export {TeamsScreen};