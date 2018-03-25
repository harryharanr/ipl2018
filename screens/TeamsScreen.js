import React from 'react';
import { Text,View } from 'react-native';

class TeamsScreen extends React.Component {
    render() {
      console.log({name:'MSD',age:35});
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Teams Screen!</Text>
        </View>
      );
    }
  }

  export {TeamsScreen};