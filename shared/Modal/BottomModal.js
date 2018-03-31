import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Picker } from "react-native";
import Modal from "react-native-modal";

export default class BottomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: 1
        };
      }
    render() {
        return (
          <Modal isVisible={this.props.isModalVisible} 
                onBackdropPress={() => this.props.toggleModal(this.state.selectedTeam)} style={styles.bottomModal}>
            <View style={styles.modalContent}>
            
              <Text style={{'fontWeight':'bold','fontSize':18}}>Filter Tweets</Text>
              
              <View style={styles.contentStyle}>
                <Text style={{'fontWeight':'bold','fontSize':18,'marginRight':10}}>Team:</Text>
                <Picker selectedValue={this.state.selectedTeam} style={{'width':'75%'}}
                      onValueChange={(itemValue, itemIndex) => this.setState({selectedTeam: itemValue})}>
                        {this.props.teams.map((item,index)=>{
                              return <Picker.Item key={index} label={item.TeamName} value={item.TeamID} />  
                        })}
                
                </Picker>
              </View>
              <TouchableOpacity>
                <View style={styles.button}>
                  <Text style={{color:'#fff'}} onPress={() => this.props.toggleModal(this.state.selectedTeam)}>{this.props.buttonText}</Text>
                </View>
              
              </TouchableOpacity>      
                
            </View>
          </Modal>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentStyle:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  }
});
