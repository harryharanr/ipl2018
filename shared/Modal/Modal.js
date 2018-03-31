import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default class ModalTest extends Component {
    render() {
        return (
          <Modal isVisible={this.props.isModalVisible} onBackdropPress={this.props.toggleModal}>
            <View style={styles.modalContent}>
            
              <Text>{this.props.message}</Text>
              <TouchableOpacity onPress={this.props.toggleModal}>
                <View style={styles.button}>
                  <Text style={{color:'#fff'}}>{this.props.buttonText}</Text>
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
  }
});
