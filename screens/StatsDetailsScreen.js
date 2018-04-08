import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import firebase from 'firebase';
import { Font } from 'expo';

class StatsDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          playerDetails: null,
          runsScored: 0,
          caught: 0,
          bowled: 0,
          ballsFaced: 0,
          caughtAndBowled: 0,
          lbw: 0,
          runOut: 0,
          hitWicket: 0,
          fieldObstruction: 0,
          retiredHurt: 0,
          stumped: 0,
          playerName: '',
          criteria: ''
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          headerTitle: params ? params.playerName : 'Stats Details',
          left: true,
          headerStyle: {height: 40}
        }
      };

    async componentDidMount() {
        await Font.loadAsync({
          'georgia': require('../assets/fonts/Georgia.ttf'),
          'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
          'light': require('../assets/fonts/Montserrat-Light.ttf'),
        });
    }
    componentDidMount(){
        console.log(this.props.navigation.state.params);
        var self =this;
        var runsScored = 0;
        var caught = 0;
        var bowled = 0;
        var ballsFaced = 0;
        var caughtAndBowled = 0;
        var lbw = 0;
        var runOut = 0;
        var hitWicket = 0;
        var fieldObstruction = 0;
        var retiredHurt = 0;
        var stumped = 0;
        for(var i=0; i<this.props.navigation.state.params.playerDetails.length;i++){
            if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'NA'){
                    runsScored = runsScored + this.props.navigation.state.params.playerDetails[i].Runs_Scored;
                    ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;   
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'caught'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                caught = caught + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'bowled'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                bowled = bowled + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'caught and bowled'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                caughtAndBowled = caughtAndBowled + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'lbw'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                lbw = lbw + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'run out'){
                runsScored = runsScored + this.props.navigation.state.params.playerDetails[i].Runs_Scored;
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                runOut = runOut + this.props.navigation.state.params.playerDetails[i].Balls_Faced   
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'hit wicket'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                hitWicket = hitWicket + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'obstructing the field'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                fieldObstruction = fieldObstruction + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'retired hurt'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                retiredHurt = retiredHurt + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }
            else if(this.props.navigation.state.params.playerDetails[i].Dismissal_Type === 'stumped'){
                ballsFaced = ballsFaced + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
                stumped = stumped + this.props.navigation.state.params.playerDetails[i].Balls_Faced;
            }

        }
        this.setState({
          playerDetails: this.props.navigation.state.params.playerDetails,
          playerName: this.props.navigation.state.params.playerName,  
          runsScored: runsScored,
          caught: caught,
          bowled: bowled,
          ballsFaced: ballsFaced,
          caughtAndBowled: caughtAndBowled,
          lbw: lbw,
          runOut: runOut,
          hitWicket: hitWicket,
          fieldObstruction: fieldObstruction,
          retiredHurt: retiredHurt,
          stumped: stumped,
          criteria: this.props.navigation.state.params.criteria,
          displayCriteria: this.props.navigation.state.params.displayCriteria
        });
        console.log(this.state);
    }

    render() {
      let form = <ActivityIndicator style = {styles.activityIndicator}/>
      if(this.state.playerDetails !== null){
        form = (
            <Card containerStyle={styles.containerStyle}>
              <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{'justifyContent':'center','alignItems':'center',flex:1}}>
                <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily:'regular'}}>
                    {this.state.playerName} <Text>{this.state.displayCriteria}</Text> {this.state.criteria}
                    </Text>
                </View>
                <Divider style={styles.dividerStyle} />
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:2,backgroundColor:'#fff',justifyContent:'center',borderRightWidth:1,borderColor:'lightgrey', 'alignItems':'center'}}>
                        <Text style={{fontFamily:'regular'}}>Runs Scored : {this.state.runsScored}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>
                            Strike Rate : {((this.state.runsScored/this.state.ballsFaced)*100).toFixed(2)>0 ? ((this.state.runsScored/this.state.ballsFaced)*100).toFixed(2):0}
                        </Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>Caught & Bowled : {this.state.caughtAndBowled}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>Run-Outs : {this.state.runOut}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>LBW : {this.state.lbw}</Text>
                    </View>
                    <View style={{flex:2,backgroundColor:'#fff',justifyContent:'center',borderRightWidth:1,borderColor:'lightgrey', 'alignItems':'center'}}>
                        <Text style={{fontFamily:'regular'}}>Balls Faced : {this.state.ballsFaced}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>Caught : {this.state.caught}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>Bowled : {this.state.bowled}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>Stumped : {this.state.stumped}</Text>
                        <Divider style={styles.dividerStyle} />
                        <Text style={{fontFamily:'regular'}}>Hit-Wicket : {this.state.hitWicket}</Text>
                    </View>
                </View>
              </View>
             </View>
            </Card>
          );
        //})
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
    marginBottom: 10
  },
  dividerStyle: {
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'lightgrey',
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

export {StatsDetailScreen};