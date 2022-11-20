import React from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Header from '../Header';
import userAvatar from '../../../../images/userAvatar.png';
import color from '../../../../../assets/color';

export default function AllRatingByProduct({ route, navigation }) {
    const { tcdg } = route.params;
    return (
        <View style={styles.container}>
            <Header title="Tất cả đánh giá" navigation={navigation} />
            <ScrollView style={styles.wrapper}>
                <View>
                    {tcdg.map((itemDG, i) => (
                        <View key={i} style={styles.itemRatingView}>
                            <View style={styles.leftView}>
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                    }}
                                    source={userAvatar}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.rightView}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text style={styles.userName}>
                                        {itemDG.name}
                                    </Text>
                                    <Text>
                                        {/* {moment(
                                                    new Date(itemDG.dg_ngay)
                                                ).format('DD/MM/YYYY')} */}
                                        {itemDG.dg_ngay}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <AirbnbRating
                                        size={15}
                                        starContainerStyle={{
                                            marginRight: 0,
                                        }}
                                        isDisabled
                                        showRating={false}
                                        defaultRating={itemDG.dg_sao}
                                    />
                                </View>
                                <Text>
                                    {itemDG.dg_noidung !== null
                                        ? itemDG.dg_noidung
                                        : 'Không chứa nội dung.'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
const { width } = Dimensions.get('window');
const itemWidth = width - 40;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 20
    },
    itemRatingView: {
        flexDirection: 'row',
        width: itemWidth,
        paddingVertical: 5,
        borderBottomColor: color.greylight,
        borderBottomWidth: 1,
    },
    leftView: {
        paddingVertical: 5,
        alignItems: 'center',
        width: itemWidth * 0.12,
    },
    rightView: {
        width: itemWidth * 0.85,
    },
});
