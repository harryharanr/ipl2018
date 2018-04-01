import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, TabBarTop} from 'react-navigation';

import { 
      HomeScreen ,
      TeamsScreen,
      FixturesScreen,
      StatsScreen,
      TwitterScreen
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

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Teams: { screen: TeamsScreen },
    Fixtures: { screen: FixturesTab },
    Stats: { screen: StatsScreen },
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
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      scrollEnabled: false,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false
  }
);
