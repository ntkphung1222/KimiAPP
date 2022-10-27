import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  // ScrollView,
  FlatList,
  Dimensions,
  //Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

export default function Chat({ navigation }) {
  const [chatUser] = useState({
    name: 'Nhà thuốc Kim Minh',
    profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });

  const [messages, setMessages] = useState([
    { sender: 'John Doe', message: 'Hey there!', time: '6:01 PM' },
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: '😊😇',
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: "Can't wait to meet you.",
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: "That's great, when are you coming?",
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: 'This weekend.',
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: 'Around 4 to 6 PM.',
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: "Great, don't forget to bring me some mangoes.",
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: 'Sure!',
      time: '6:05 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [inputMessage1, setInputMessage1] = useState('');
  function getTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // eslint-disable-next-line no-const-assign
    hours %= 12;
    // eslint-disable-next-line no-const-assign
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    const t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }
  function sendMessage1() {
    if (inputMessage1 === '') {
      return setInputMessage1('');
    }
    const t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: chatUser.name,
        message: inputMessage1,
        time: t,
      },
    ]);
    setInputMessage1('');
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                name="angle-left"
                type="font-awesome"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <Image
              style={styles.userProfileImage}
              source={{ uri: chatUser.profile_image }}
            />
            <View
              style={{
                paddingLeft: 10,
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
                {chatUser.name}
              </Text>
              <Text style={{ color: '#fff', fontWeight: '300' }}>
                {chatUser.last_seen}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => navigation.navigate('Chat1')}
          >
            <Icon name="call" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ backgroundColor: color.backgroundColor }}
          inverted
          showsVerticalScrollIndicator={false}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    //backgroundColor: color.primary,
                    backgroundColor: 
                    item.sender === currentUser.name ? color.primary : color.white,
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 15,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 8 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 8,
                  }}
                >
                  <Text
                    style={{
                      //color: color.white,
                      color:
                      item.sender === currentUser.name ? color.white : color.text,
                      fontSize: 16,
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{ paddingVertical: 10, backgroundColor: color.backgroundColor }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage1}
              style={styles.messageInput}
              placeholder="Message"
              onChangeText={(text) => setInputMessage1(text)}
              onSubmitEditing={() => {
                sendMessage1();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMessage1();
              }}
            >
              <Icon name="send" type="material" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingVertical: 10, backgroundColor: color.backgroundColor }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder="Message"
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                sendMessage();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMessage();
              }}
            >
              <Icon name="send" type="material" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 22,
    backgroundColor: color.primary,
    flexDirection: 'row',
  },
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    marginLeft: 170,
    justifyContent: 'center',
  },
  userProfileImage: { height: 30, aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
