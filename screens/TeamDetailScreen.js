import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import firebase from 'firebase';
import { Font } from 'expo';

class TeamDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          playerDetails: []
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          headerTitle: params ? params.teamName : 'Team Details',
          left: true
        }
      };
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
                            self.setState({playerDetails: [...players]});

                        });
    }

    render() {
      let form = <ActivityIndicator style = {styles.activityIndicator}/>
      if(this.state.playerDetails.length>0){
        form = this.state.playerDetails.map((item,index) => {
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
                  <Text style={{marginLeft:5}}>{item.PlayerWorth}</Text>
                  <Divider style={styles.dividerStyle} />
                   
                  <Text style={{marginLeft:5}}> {item.Shortform}</Text>  
                </View>
              </View>
              </View>
            </Card>
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

export {TeamDetailScreen};