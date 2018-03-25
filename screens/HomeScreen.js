import React from 'react';
import { Text,View } from 'react-native';

class HomeScreen extends React.Component {
    render() {
      console.log({name:'MSD',age:35});
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'yellow' }}>
          <Text>Home Screen!</Text>
        </View>
      );
    }
  }

  export {HomeScreen};