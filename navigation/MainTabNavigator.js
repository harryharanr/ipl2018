import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, TabBarTop, StackNavigator} from 'react-navigation';

import { 
      HomeScreen ,
      TeamsScreen,
      FixturesScreen,
      StatsScreen,
      TwitterScreen,
      TeamDetailScreen,
      StatsDetailScreen
    } from '../screens/index';

  const FixturesTab = TabNavigator(
      {
        Fixtures: {
          screen: FixturesScreen,
        },
        Results: {
          screen: FixturesScreen,
        },
      },
      {
        tabBarOptions: {
          style: {
            backgroundColor: '#fff',
          },
          indicatorStyle: {
            backgroundColor:'black',
          },
          labelStyle:{
            color:'black',
            fontWeight: 'bold'
          }
        },
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true
      }
    );

    const TeamStack = StackNavigator(
      {
        Team: {
          screen: TeamsScreen,
        },
        TeamDetails: {
          screen: TeamDetailScreen,
        },
      },
      {
        initialRouteName: 'Team',
        headerMode:'screen'
      },
    );

    const StatsStack = StackNavigator({
      GetStats: {
        screen: StatsScreen,
      },
      Stats: {
        screen: StatsDetailScreen,
      },
    },{
      initialRouteName: 'GetStats',
        headerMode:'screen'
    })

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Teams: { screen: TeamStack,
      navigationOptions:{
        header: null
    }},
    Fixtures: { screen: FixturesTab },
    Stats: { screen: StatsStack, navigationOptions:{
      header: null
    }}, 
    Twitter: { screen: TwitterScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Teams') {
          iconName = `ios-shirt${focused ? '' : '-outline'}`;
        } else if (routeName === 'Fixtures') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Stats') {
          iconName = `ios-briefcase${focused ? '' : '-outline'}`;
        } else if (routeName === 'Twitter') {
          iconName = `logo-twitter${focused ? '' : ''}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#F5725B',
      inactiveTintColor: 'gray',
      scrollEnabled: false,
      style:{
        height:65,
        padding:5
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false
  }
);
