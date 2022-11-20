import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import getNewPost from '../../../../api/getNewPost';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';

const bgColor = [color.primary, '#615DD9', '#019E8B', '#FD6C57'];

export default function Post({ navigation }) {
    const [dataPost, setDataPost] = useState([]);
    function loadDataPost() {
        getNewPost()
            .then((responseJson) => {
                //Successful response from the API Call
                setDataPost(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const { container, header, headerTitle } = styles;
    useEffect(() => {
        loadDataPost();
    }, []);
    return (
        <View style={container}>
            <View style={header}>
                <Text style={headerTitle}>Bài viết</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.wrapper}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginHorizontal: 20 }}
                >
                    {dataPost.map((item, i) => (
                        <TouchableOpacity
                            key={item.bv_ma}
                            style={{
                                borderRadius: 8,
                                marginRight: 5,
                                marginVertical: 5,
                                paddingHorizontal: 10,
                                paddingVertical: 3,
                                backgroundColor: bgColor[i],
                            }}
                        >
                            <Text style={font.label16white}>{item.bv_ten}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* <Text style={font.label16blackbold}>Bài viết gần đây</Text> */}
                <View style={{ marginHorizontal: 20 }}>
                    {dataPost
                    .sort(() => -1)
                    .map((item) => (
                        <TouchableOpacity
                            key={item.bv_ma}
                            onPress={() =>
                                navigation.navigate('PostDetail', {
                                    post: item,
                                })
                            }
                            style={styles.itemPost}
                        >
                            <Image
                                style={styles.itemImagePost}
                                resizeMode="cover"
                                source={{
                                    uri: `http://kimimylife.site/bv_anhbia/${item.bv_anhbia}`,
                                }}
                            />
                            <View style={styles.itemNamePostView}>
                            <Text style={font.label16blackbold}>
                                {item.bv_ten}
                            </Text>
                            </View>
                          
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
//const bgColor = ['red', 'blue'];

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    header: {
        marginTop: 22,
        height: 50,
        alignItems: 'flex-start',
        backgroundColor: color.primary,
    },
    headerTitle: {
        fontSize: 20,
        color: color.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    wrapper: {
        backgroundColor: color.backgroundColor,
    },
    itemPost: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: color.white,
        elevation: 8
    },
    itemImagePost: {
        width: width - 40,
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    itemNamePostView: {

    },
    itemNamePost: {

    },
});
