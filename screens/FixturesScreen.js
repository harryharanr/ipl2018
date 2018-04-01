import React from 'react';
import { Text,View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Font } from 'expo';

class FixturesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      // headerTitle: 'Twitter',
      // headerRight: (
      //   <TouchableOpacity>
      //           <View style={styles.button}>
      //             <Text style={{color:'#fff'}}>Filter</Text>
      //           </View>
              
      //   </TouchableOpacity>
      // ),
      header: null
    };
  };

  constructor(props){
    super(props);
    this.state = {
      fixtures: []
    }
  }
  
  componentWillMount() {
    var self = this;
      let ref = firebase.database().ref('Fixtures/FullFixtureList/');
      console.log(ref);
      ref.on("value", function(snapshot) {
        console.log(snapshot.val());
        let fixtures = snapshot.val().map((item)=>{
          return item;
        });
        self.setState({
          fixtures: fixtures
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
    let form = <ActivityIndicator />
     if(this.state.fixtures){
       form = this.state.fixtures.map((item,index) => {
         return (
          <Card key={index} style={item.Date == '7-Apr-18'?styles.currentContainerStyle:styles.containerStyle}>
            <View style={styles.footerLeftStyle}>
              <Text style={{'justifyContent': 'flex-start'}}>{item.Date}</Text>
              <Text style={{'justifyContent': 'flex-end'}}>{item.Time}</Text>
            </View>
            <Divider style={styles.dividerStyle} />
            <View style={styles.headerStyle}>
              <Text style={{'fontWeight': 'bold','fontSize':18,'fontFamily': 'regular','padding':10}}>
                {item.Fixtures}
              </Text>
            </View>
            <Divider style={styles.dividerStyle} />
            <View style={styles.footerRightStyle}>
              <Text>{item.Venue}</Text>
            </View>
          </Card>
         );
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
  button: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
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
    fontFamily: 'regular',
  },
  currentContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'red',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    fontFamily: 'regular',
  },
  dividerStyle: {
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    marginTop: 7,
    marginBottom : 7
  },
  headerStyle : {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerLeftStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerRightStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export {FixturesScreen};