import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';

import getNewPost from '../../../../api/getNewPost';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';

//const bgColor = [color.primary, '#615DD9', '#019E8B', '#FD6C57'];

export default function Post({ navigation }) {
    const [dataPost, setDataPost] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');
    const [masterDataPost, setMasterDataPost] = useState([]);

    function loadDataPost() {
        getNewPost()
            .then((responseJson) => {
                //Successful response from the API Call
                setDataPost(responseJson.results);
                setMasterDataPost(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const { container, header, headerTitle } = styles;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadDataPost();
        setRefreshing(false);
    }, []);
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataPost.filter((item) => {
                // Applying filter for the inserted text in search bar
                const itemData = item.bv_ten
                    ? item.bv_ten.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setDataPost(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setDataPost(masterDataPost);
            setSearch(text);
        }
    };
    useEffect(() => {
        loadDataPost();
    }, []);
    return (
        <View style={container}>
            <View style={header}>
                <Text style={headerTitle}>Bài viết</Text>
            </View>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchPostInput}
                    placeholder="Nhập tên bài viết"
                    value={search}
                    onChangeText={(text) => searchFilterFunction(text)}
                />
                {search ? (
                    <TouchableOpacity
                        onPress={() => setSearch('')}
                        style={styles.iconSearch}
                    >
                        <Icon name="close" size={25} color={color.primary} />
                    </TouchableOpacity>
                ) : null}
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={styles.wrapper}
            >
                {/* <ScrollView
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
                </ScrollView> */}
                {/* <Text style={font.label16blackbold}>Bài viết gần đây</Text> */}
                <View style={{ marginHorizontal: 20 }}>
                    {dataPost
                        //.sort(() => -1)
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
                                    <Text
                                        style={font.textBold}
                                        adjustsFontSizeToFit
                                    >
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
        paddingTop: 5,
    },
    itemPost: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: color.white,
        elevation: 8,
    },
    itemImagePost: {
        width: width - 40,
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    itemNamePostView: {
        paddingHorizontal: 10,
    },
    itemNamePost: {},
    searchView: {
        backgroundColor: color.backgroundColor,
        paddingVertical: 10,
        width,
    },
    searchPostInput: {
        borderWidth: 1,
        borderColor: color.primary,
        marginHorizontal: 20,
        borderRadius: 20,
        backgroundColor: color.white,
        paddingLeft: 20,
        paddingRight: 40,
        paddingVertical: 5,
    },
    iconSearch: {
        position: 'absolute',
        right: 28,
        top: 17,
        borderRadius: 20,
    },
});
