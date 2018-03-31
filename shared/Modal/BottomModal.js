import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Picker } from "react-native";
import Modal from "react-native-modal";

export default class BottomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: ''
        };
      }
    render() {
        return (
          <Modal isVisible={this.props.isModalVisible} 
                onBackdropPress={this.props.toggleModal} style={styles.bottomModal}>
            <View style={styles.modalContent}>
            
              <Text>Filter Tweets</Text>
              <TouchableOpacity onPress={this.props.toggleModal}>
                <View>
                    {/* <Picker
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker> */}
                    <Picker
                        selectedValue={this.state.selectedTeam}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedTeam: itemValue})}>
                            {this.props.teams.map((item,index)=>{
                            return <Picker.Item key={index} label={item.TeamName} value={item.TeamID} />  
                            })}
                    </Picker>
                    <View style={styles.button} onPress={this.props.toggleModal(this.state.selectedTeam)}>
                        <Text style={{color:'#fff'}}>Filter</Text>
                    </View>
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
  }
});
