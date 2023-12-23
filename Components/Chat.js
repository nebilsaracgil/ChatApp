import React, { useState, useRef, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({name}) => {
    
    const Messages = (props) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => handleDeleteMessage()}>
                    <Text style={styles.itemText}>{props.text}</Text>
            </TouchableOpacity>

        );
    };
    
    const [message, setMessage] = useState();
    const [messageItems, setMessageItems] = useState([]);
    const scrollViewRef = useRef();
    
    const handleSendMessage = () => {
        if (message == null || message.trim().length == 0) {
        return;
        } else {
        setMessageItems([...messageItems, message]);
        setMessage(null);
        AsyncStorage.setItem('messages', JSON.stringify([...messageItems, message]))
        .then(() => console.log('Messages stored successfully'))
        .catch((error) => console.error('Error storing messages:', error));
        }
    }
    
    const handleDeleteMessage = (indexToRemove) => {
      // Create a copy of the messages array
      const updatedMessages = [...messageItems];
      
      // Remove the specific message
      updatedMessages.splice(indexToRemove, 1);
      
      // Update state
      setMessageItems(updatedMessages);
      
      // Update AsyncStorage
      AsyncStorage.setItem('messages', JSON.stringify(updatedMessages))
      .then(() => console.log('Message removed successfully'))
      .catch((error) => console.error('Error removing message:', error));
    };
    
    useEffect(() => {
      AsyncStorage.getItem('messages')
        .then(messagesString => messagesString ? JSON.parse(messagesString) : [])
        .then(messages => setMessageItems(messages))
        .catch((error) => console.error('Error retrieving messages:', error));
    }, []);
    return (
        <View style={styles.container}>

          
          <ScrollView style={{width: '100%', flex: 1}} contentContainerStyle={styles.messages}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
          {
              messageItems.map((item, index) => {
                return (
                  <Messages key={index} text={item.text}/>
                  )
              })
          }
          </ScrollView>
          <KeyboardAvoidingView style={styles.messageBar}>
            <TouchableOpacity>
              <Ionicons name="camera" size={30} color="#b88e07" />
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder='Write a message' value={message} onChangeText={text => setMessage(text)}/>
            <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage()}>
              <Ionicons name="send" size={26} color="#b88e07" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
}

    const Chat_1 = ({navigation}, {name = 'BasedSigma'}) => {
      
      return (
          <Chat name={name} />
      )
    };

    const Chat_2 = ({navigation}, {name = 'GigaChad'}) => {
      
      return (
          <Chat name={name} />
      )
  };



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      header: {
        width: '100%',
        padding: 15,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
      },
      messages: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 10,
      },
      messageBar: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.3,
        borderTopColor: 'grey',
      },
      input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 30,
        borderWidth: 0.5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        width: '70%',
        backgroundColor: '#f0eee9',
      },
      sendButton: {
        padding: 10,
        borderRadius: 5,
      },
    item: {
        backgroundColor: '#b88e07',
        borderRadius: 20,
        padding: 10,
        color: 'white',
        marginRight: 10,
        marginBottom: 5
    },
    itemText: {
        color: 'white',
        fontSize: 16,
    }
});

export default Chat;
export {Chat_1, Chat_2};