import React from 'react';
import { Text,View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Font } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Divider } from 'react-native-elements';

class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      fixtures: [],
      pointsTable: []
    }
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {height: 40}
  }

  componentWillMount() {
    var self = this;
    var m_names = new Array("Jan", "Feb", "Mar", 
        "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
        "Oct", "Nov", "Dec");
        
        var d = new Date();
        var curr_date = d.getDate()<10?('0'+d.getDate()):d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear().toString().substr(-2);
        var todaysDate = curr_date + "-" + m_names[curr_month] + "-" + curr_year;
        console.log(todaysDate)
      let ref = firebase.database().ref('Fixtures/FullFixtureList/FullFixtureList');
      console.log(ref);
      ref.on("value", function(snapshot) {
        let fixtures = snapshot.val().filter((item)=>{
          return item.Date === todaysDate;
        });
        console.log(fixtures);
        self.setState({
          fixtures: fixtures
        });
        self.getPointsTable();
     }, function (error) {
        console.log("Error: " + error.code);
     });
  }

  getPointsTable = () => {
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
    if(this.state.fixtures.length>0 && this.state.pointsTable.length>0){
      form = (
        <View>
        <Card containerStyle={styles.containerStyle}>
          <View>
            <Text style={{'justifyContent': 'flex-start',fontFamily: 'regular',fontSize: 18,padding:5}}>
              Today's Match
            </Text>
          </View>
          <Divider style={styles.dividerStyle} />
          {
            this.state.fixtures.map((fixture,index) => {
              return (
                <View key={index}>
                  <View style={{justifyContent: 'center',alignItems:'center'}}>
                    <Text style={{fontFamily: 'regular',fontSize: 17,padding:5}}>{fixture.Fixtures}</Text>
                    <Text style={{fontFamily: 'regular',fontSize: 13,padding:5}}>{fixture.Venue}</Text>
                  </View>
                  <Divider style={styles.dividerStyle} />
                </View>
              );
            })
          }
          <View style={styles.footerRightStyle}>
            <TouchableOpacity>
                  <View style={styles.button}>
                    <Text style={{color:'#fff'}}>GO TO FIXTURES >></Text>
                  </View>
                
            </TouchableOpacity> 
          </View>
        </Card>
        <Card containerStyle={styles.containerStyle}>
          <View>
            <Text style={{'justifyContent': 'flex-start',fontFamily: 'regular',fontSize: 18,padding:5}}>
              Table Toppers
            </Text>
          </View>
          <Divider style={styles.dividerStyle} />
          <View>
            <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{flex:1,fontFamily:'regular',justifyContent:'center',alignItems:'center',padding:5}}>Team</Text>
                <Text style={{flex:1,fontFamily:'regular',justifyContent:'center',alignItems:'center',padding:5}}>Won</Text>
                <Text style={{flex:1,fontFamily:'regular',justifyContent:'center',alignItems:'center',padding:5}}>Points</Text>
            </View>
          </View>
          <View>
            <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{flex:1,fontFamily:'regular',padding:10}}>
                  {this.state.pointsTable[0].Team}
                </Text>
                <Text style={{flex:1,fontFamily:'regular',padding:10}}>
                {this.state.pointsTable[0].Won}
                </Text>
                <Text style={{flex:1,fontFamily:'regular',padding:10}}>
                {this.state.pointsTable[0].Points}
                </Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{flex:1,fontFamily:'regular',padding:10}}>
                  {this.state.pointsTable[1].Team}
                </Text>
                <Text style={{flex:1,fontFamily:'regular',padding:10}}>
                {this.state.pointsTable[1].Won}
                </Text>
                <Text style={{flex:1,fontFamily:'regular',padding:10}}>
                {this.state.pointsTable[1].Points}
                </Text>
            </View>
            
          </View>
          <Divider style={styles.dividerStyle} />
          <View style={styles.footerRightStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PointsTable')}>
                  <View style={styles.button}>
                    <Text style={{color:'#fff'}}>FULL POINTS TABLE >></Text>
                  </View>
                
            </TouchableOpacity> 
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
  footerRightStyle: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  button: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    padding: 7,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
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

export {HomeScreen};