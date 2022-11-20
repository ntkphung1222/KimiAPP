import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function PostDetail({ navigation, route }) {
    const { post } = route.params;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.itemView}>
                    <TouchableOpacity
                        style={styles.headerIcon}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Icon
                            name="angle-left"
                            type="font-awesome"
                            size={30}
                            color={color.primary}
                        />
                    </TouchableOpacity>
                    <View>
                        <Image
                            style={styles.itemImagePost}
                            resizeMode="contain"
                            source={{
                                uri: `http://kimimylife.site/bv_anhbia/${post.bv_anhbia}`,
                            }}
                        />
                    </View>
                    <View style={styles.postNameView}>
                        <Text style={font.textTitle1}>{post.bv_ten}</Text>
                    </View>
                    <View style={styles.postContentView}>
                        <Text style={font.label}>{post.bv_noidung}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    wrapper: {
        flex: 1,
    },
    itemView: {
        borderRadius: 20,
        backgroundColor: color.white,
    },
    headerIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    itemImagePost: {
        width: width - 40,
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    postNameView: {},
    postContentView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});
