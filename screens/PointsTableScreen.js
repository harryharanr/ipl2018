import React from 'react';
import { Text,View, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Font } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Divider } from 'react-native-elements';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;


class PointsTableScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          pointsTable: []
        }
      }
    
      static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          headerTitle: 'Points Table',
          left: true,
          headerStyle: {paddingBottom:15,height: winHeight*0.07}
        }
      };

      componentWillMount() {
        var self = this;
        let ref = firebase.database().ref('Fixtures/FullFixtureList/PointsTable/PointsTable');
          console.log(ref);
          ref.on("value", function(snapshot) {
            console.log(snapshot.val());
            let fixtures = snapshot.val().map((item)=>{
              return item;
            });
            self.setState({
              pointsTable: fixtures
            });
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
        if(this.state.pointsTable.length>0){
          form = (
            <View>
                <Card containerStyle={styles.containerStyle}>
                 <View>
                    <Text style={{'justifyContent': 'flex-start',fontFamily: 'regular',fontSize: 18,padding:5}}>
                    Standings
                    </Text>
                 </View>
                <Divider style={styles.dividerStyle} />
                <View>
                    <View style={{flex:1,flexDirection:'row',backgroundColor: '#f1f8ff' }}>
                        <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}></Text>
                        <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>M</Text>
                        <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>W</Text>
                        <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>L</Text>
                        <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>P</Text>
                        <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>N/R</Text>
                    </View>
                </View>
                
                <View>
                    {
                        this.state.pointsTable.map((team,index) => {
                            return (
                            <View key={index} style={{flex:1,flexDirection:'row'}}>
                                <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',backgroundColor: '#f1f8ff',padding:10,fontFamily:'regular'}}>
                                    {team.Team}
                                </Text>
                                <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>
                                    {team.Matches}
                                </Text>
                                <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>
                                    {team.Won}
                                </Text>
                                <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>
                                    {team.Lost}
                                </Text>
                                <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>
                                    {team.Points}
                                </Text>
                                <Text style={{flex:1,borderWidth:1,borderColor:'lightgrey',padding:10,fontFamily:'regular'}}>
                                    {team.RR.substr(0, 4)}
                                </Text>
                            </View>
                            );
                        })
                    }
                </View>
              </Card>
            </View>
          );  
        }
        return (
            <ScrollView>
              {form}
            </ScrollView>
          );
     }
}

const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
    },
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
      marginBottom: 10
    },
    dividerStyle: {
        shadowOpacity: 0.75,
        shadowRadius: 1,
        shadowColor: 'lightgrey',
        shadowOffset: { height: 0, width: 0 },
        marginTop: 7,
        marginBottom : 7
      }
  });
  
  export {PointsTableScreen};