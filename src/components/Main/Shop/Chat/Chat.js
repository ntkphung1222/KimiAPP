import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Dimensions,
} from 'react-native';
//import Echo from 'laravel-echo';
//import socketio from 'socket.io-client';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import chat from '../../../../api/chat';

// const echo = new Echo({
//   host: 'http://kimimylife',
//   broadcaster: 'socket.io',
//   client: socketio,
// });

// echo
//   .channel('chats.1')
//   .listen('ChatMessageCreated', ev => console.log(ev.message.text));

export default function Chat({ navigation, route }) {
    const [chatUser] = useState({
        name: 'Nhà thuốc Kim Minh',
        profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
        last_seen: 'online',
    });
    const { user } = route.params;

    const [messages, setMessages] = useState([]);

    const send = async () => {
        chat(user.kh_ma, inputMessage).then(() => {});
    };

    const [inputMessage, setInputMessage] = useState('');

    function getTime(date) {
        const hours = moment(date).hour();
        let minutes = moment(date).minute();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        //hours %= 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        const strTime = `${hours}:${minutes} ${ampm}`;
        return strTime;
    }

    // function getTime(date) {
    //     let hours = date.getHours();
    //     let minutes = date.getMinutes();
    //     const ampm = hours >= 12 ? 'PM' : 'AM';
    //     // eslint-disable-next-line no-const-assign
    //     hours %= 12;
    //     // eslint-disable-next-line no-const-assign
    //     hours = hours || 12;
    //     minutes = minutes < 10 ? `0${minutes}` : minutes;
    //     const strTime = `${hours}:${minutes} ${ampm}`;
    //     return strTime;
    // }

    function sendMessage() {
        if (inputMessage === '') {
            return setInputMessage('');
        }
        send(user.kh_ma, inputMessage);
        setMessages([
            ...messages,
            {
                trangthai: '1',
                c_noidung: inputMessage,
                //time: getTime(new Date()),
                c_thoigian: new Date(),
            },
        ]);

        setInputMessage('');
    }
    const loadMessage = async () => {
        // eslint-disable-next-line no-undef
        fetch(`http://kimimylife.site/api/chat/loadMessage?kh_ma=${user.kh_ma}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setMessages(responseJson.results);
                //console.log(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        // setInterval(() => {
        //     loadMessage();
        // }, 1000);
        loadMessage();
    }, []);
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
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: '700',
                                    fontSize: 18,
                                }}
                            >
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
                    //data={messages}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback>
                            <View style={{ marginTop: 6 }}>
                                <View
                                    style={{
                                        maxWidth:
                                            Dimensions.get('screen').width *
                                            0.8,
                                        //backgroundColor: color.primary,
                                        backgroundColor:
                                            item.trangthai === '1'
                                                ? color.primary
                                                : color.white,
                                        alignSelf:
                                            item.trangthai === '1'
                                                ? 'flex-end'
                                                : 'flex-start',
                                        marginHorizontal: 15,
                                        padding: 10,
                                        borderRadius: 8,
                                        borderBottomLeftRadius:
                                            item.trangthai === '1' ? 8 : 0,
                                        borderBottomRightRadius:
                                            item.trangthai === '1' ? 0 : 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            //color: color.white,
                                            color:
                                                item.trangthai === '1'
                                                    ? color.white
                                                    : color.text,
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.c_noidung}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#dfe4ea',
                                            fontSize: 14,
                                            alignSelf: 'flex-end',
                                        }}
                                    >
                                        {getTime(item.c_thoigian)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
                <View
                    style={{
                        paddingVertical: 10,
                        backgroundColor: color.backgroundColor,
                    }}
                >
                    <View style={styles.messageInputView}>
                        <TextInput
                            defaultValue={inputMessage}
                            style={styles.messageInput}
                            placeholder="Nhập tin nhắn"
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
                            <Icon
                                name="send"
                                type="material"
                                color={color.primary}
                            />
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
