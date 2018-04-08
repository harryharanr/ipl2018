import React from 'react';
import { Text,View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigator } from 'react-navigation';
import NextMatchScreen from './HomeScreenFeatures/NextMatch';
import PointsTableScreen from './HomeScreenFeatures/PointsTable';
import FixturesScreen from './HomeScreenFeatures/Fixtures';

export class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1}}>
            <Animatable.View 
            animation="zoomIn" iterationCount={5}
            onPress={() => this.props.navigation.navigate('PointsTable')}
            style={styles.nextMatch}>
              <Text>Next Match</Text>
            </Animatable.View>

            <Animatable.View 
            animation="zoomInDown" iterationCount={5}
            style={styles.pointsTable}>
              <Text>Points Table</Text>
            </Animatable.View>

            <Animatable.View 
            animation="zoomInUp" iterationCount={5}
            style={styles.fixtures}>
              <Text>Fixtures</Text>
            </Animatable.View>
        </View>
      );
    }
  }

  export default StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    NextMatch: {
      screen: NextMatchScreen
    },
    PointsTable :{
      screen: PointsTableScreen
    },
    Fixtures: {
      screen: FixturesScreen
    }
  });

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
