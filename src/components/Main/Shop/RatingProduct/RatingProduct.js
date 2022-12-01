import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import ratingProduct from '../../../../api/ratingProduct';
import color from '../../../../../assets/color';
import Header from '../Header';
import font from '../../../../../assets/font';

export default function RatingProduct({ navigation, route }) {
    const { product } = route.params;
    const [noidungdg, setNoiDungDG] = useState('');
    const { container, wrapper, input } = styles;
    const [defaultRating, setDefaultRating] = useState(5);
    
    // To set the max number of Stars
    const [maxRating] = useState([1, 2, 3, 4, 5]);

    // Filled Star. You can also give the path from local
    const starImageFilled =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    const CustomRatingBar = () => (
        <View style={styles.customRatingBarStyle}>
            {maxRating.map((item) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={item}
                        onPress={() => setDefaultRating(item)}
                    >
                        <Image
                            style={styles.starImageStyle}
                            source={
                                item <= defaultRating
                                    ? { uri: starImageFilled }
                                    : { uri: starImageCorner }
                            }
                        />
                    </TouchableOpacity>
                ))}
        </View>
    );

    // eslint-disable-next-line camelcase, no-shadow
    function handleSubmit(hdx_ma, sp_ma, dg_sosao, dg_noidung) {
        // eslint-disable-next-line no-undef
        ratingProduct(hdx_ma, sp_ma, dg_sosao, dg_noidung).then((res) => {
            if (res.success) {
                Alert.alert('Cảm ơn bạn đã đánh giá sản phẩm.');
                navigation.goBack();
            } else {
                Alert.alert('Đánh giá sản phẩm lỗi òi.');
            }
        });
    }
    return (
        <View style={container}>
            <Header title="Đánh giá sản phẩm" navigation={navigation} />
            <ScrollView style={wrapper}>
                <View key={product.sp_ma}>
                    <View style={styles.itemView}>
                        <View style={styles.leftItemView}>
                            <Image
                                style={styles.itemImage}
                                resizeMode="contain"
                                source={{ uri: `http://kimimylife.site/sp_hinhanh/${product.sp_hinhanh}` }}

                            />
                        </View>
                        <View style={styles.rightItemView}>
                            <Text style={font.textNormal}>{product.sp_ten}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 0 }}>
                        <CustomRatingBar />
                    </View>
                    {/* <View style={{ marginTop: 0 }}>
                        <CustomRatingBar />
                    </View> */}
                    <View style={{ paddingHorizontal: 20 }}>
                        <TextInput
                            placeholder="Nhập đánh giá của bạn"
                            style={input}
                            value={noidungdg}
                            onChangeText={(text) => setNoiDungDG(text)}
                            keyboardType="default"
                            multiline
                            numberOfLines={10}
                        />
                    </View>
                </View>

                {/* <Text>{JSON.stringify(product)}</Text> */}
                <TouchableOpacity
                    style={styles.ratingButton}
                    onPress={() => {
                        console.log(product.hdx_ma, JSON.parse(product.sp_ma), 5, noidungdg);
                        handleSubmit(
                           product.hdx_ma,
                            JSON.parse(product.sp_ma),
                            defaultRating,
                            noidungdg
                        );
                    }}
                >
                    <Text style={styles.textRatingButton}>Đánh giá</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.backgroundColor,
        paddingVertical: 10,
    },
    itemView: {
        // marginVertical: 10,
        flexDirection: 'row',
        width,
        padding: 5,
        backgroundColor: color.white,
    },
    leftItemView: {
        width: width * 0.25,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    rightItemView: {
        paddingHorizontal: 10,
        width: width * 0.75,
    },
    input: {
        marginVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: color.line,
        height: 150,
        width: width - 40,
        justifyContent: 'flex-start',
        padding: 10,
        fontSize: 16,
        fontFamily: 'SFProDisPlayRegular',
        textAlignVertical: 'top',
        backgroundColor: color.white,
    },
    ratingButton: {
        elevation: 8,
        backgroundColor: color.primary,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 20,
        width: width - 40,
        marginBottom: 10,
    },
    textRatingButton: {
        fontSize: 18,
        color: color.white,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});
