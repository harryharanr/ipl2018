import React from 'react';
import { Text,View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      headerTitle: params ? params.teamName : 'Team Details',
      left: true
    }
  };
    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'yellow' }}>
        //   <Text>Home Screen!</Text>
        // </View>
        <View style={{ flex: 1}}>
            <Animatable.View 
            animation="fadeInLeft" iterationCount={1}
            style={styles.nextMatch}>
              <Text>Next Match</Text>
            </Animatable.View>

            <Animatable.View 
            animation="fadeInRight" iterationCount={1}
            style={styles.pointsTable}>
              <Text>Points Table</Text>
            </Animatable.View>

            <Animatable.View 
            animation="fadeInUp" iterationCount={1}
            style={styles.fixtures}>
              <Text>Fixtures</Text>
            </Animatable.View>
        </View>
      );
    }
  }

  export {HomeScreen};

  const styles = StyleSheet.create({
    nextMatch:{
      flex:1,
      backgroundColor:'darkblue',
      justifyContent:'center',
      alignItems:'center'
    },
    pointsTable: {
      flex:1,
      backgroundColor:'skyblue',
      justifyContent:'center',
      alignItems:'center'
    },
    fixtures:{
      flex:1,
      backgroundColor:'blue',
      justifyContent:'center',
      alignItems:'center'
    }
  });