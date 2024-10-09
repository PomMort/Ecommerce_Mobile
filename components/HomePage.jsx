import React, { useEffect, useState, useContext } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FavoritesContext from '../context/FavoritesContext';
import { Dropdown } from 'react-native-element-dropdown';

const HomePage = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const [filter, setFilter] = useState('');
    const { addFavorites, favorites, removeFavorites } = useContext(FavoritesContext);
    const isFavorites = (item) => {
        return favorites.some(favItem => favItem.id === item.id);
    }

    // Hàm filter theo brand
    const getBrand = (data) => {
        const brand = data.map(item => item.brand);
        return [...new Set(brand)];
    }

    const handleFilterBrand = () => {
        if (filter === '' || filter === 'ALL') {
            return data; // Return all data if no filter is applied
        } else {
            return data.filter(item => item.brand === filter); // Filter data by selected brand
        }
    };

    // Hàm tính toán rating star
    const handleGetAvargeStar = (rate) => {
        if (!rate || rate.length === 0) return 0; // Kiểm tra nếu rate là null/undefined hoặc mảng trống

        const totalStar = rate.reduce((sum, review) => {
            const star = review.stars || 0; // Kiểm tra nếu stars không tồn tại
            return sum + star;
        }, 0);

        return (totalStar / rate.length).toFixed(1); // Tránh NaN bằng cách đảm bảo phép chia cho số hợp lệ
    };
    useEffect(() => {
        // Sử dụng axios thay cho fetch
        axios.get("https://65321e684d4c2e3f333da188.mockapi.io/api/v1/categories")
            .then((response) => {
                setData(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dropdownContainer}>
                <Text style={styles.filterText}>Filter by Brand: </Text>
                <Dropdown
                    style={styles.dropdown}
                    data={[{ lable: 'ALL', value: 'ALL' }, ...getBrand(data).map(brand => ({ lable: brand, value: brand }))]}
                    labelField="lable"
                    valueField="value"
                    placeholder='Select a brand please !!!'
                    value={filter}
                    onChange={item => setFilter(item.value)}
                >
                </Dropdown>
            </View>
            <View style={styles.list}>
                <FlatList
                    horizontal={false}
                    numColumns={2}
                    data={handleFilterBrand()}
                    renderItem={({ item }) => (
                        <Pressable style={styles.item} onPress={() => navigation.navigate('Detail', { item })}>
                            {/* Heart Icon positioned at top-right */}
                            <TouchableOpacity onPress={() => (!isFavorites(item) ? addFavorites(item) : removeFavorites(item.id))} style={styles.heartIconContainer}>
                                <Icon
                                    name="heart"
                                    size={24}
                                    color={isFavorites(item) ? "#ff0000" : "#ccc"} // Toggle color based on liked state
                                    style={styles.heartIcon}
                                />
                            </TouchableOpacity>
                            <Image
                                style={styles.image}
                                source={{ uri: item.image }}
                            />
                            <Text style={styles.artName} numberOfLines={2}>{item.artName}</Text>
                            <Text style={styles.brand}>{item.brand}</Text>
                            {item.limitedTimeDeal ? (
                                <View style={styles.priceContainer}>
                                    <Text style={styles.originalPrice}>{item.price.toFixed(2)} $</Text>
                                    <Text style={styles.discountedPrice}>{(item.price - (item.price * item.limitedTimeDeal)).toFixed(2)} $</Text>
                                </View>
                            ) : (
                                <Text style={styles.price} >{item.price - (item.price * item.limitedTimeDeal).toFixed(2)} $</Text>
                            )}

                            <View style={styles.contianerSale}>
                                <View>
                                    <Text style={styles.rate}>{handleGetAvargeStar(item.rate)} ⭐</Text>
                                </View>
                                <View>
                                    <Text style={styles.sold}> Đã bán: {item.sold}k</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#f2f2f2',
        paddingBottom: 50,
        paddingLeft: 12,
        paddingRight: 10
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: '2%',
        padding: 20,
        flexBasis: '45%'
    },
    artName: {
        fontSize: 15,
        color: '#000000',
        textAlign: 'auto',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 100
    },
    originalPrice: {
        fontSize: 13,
        marginTop: 5,
        color: '#999',
        textDecorationLine: 'line-through',
        marginRight: 10,
    },
    discountedPrice: {
        fontSize: 13,
        marginTop: 5,
        color: '#d9534f',
        fontWeight: '600',
    },
    price: {
        fontSize: 13,
        marginTop: 5,
        color: '#d9534f',
        fontWeight: '600',
    },
    brand: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'contain',
        marginVertical: 10,
        borderRadius: 10,
    },
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        borderRadius: 20,
        padding: 5,
    },
    heartIcon: {
        cursor: 'pointer',
    },
    rate: {
        marginTop: 5,
    },
    sold: {
        textAlign: 'center',
        marginTop: 5,
    },
    contianerSale: {
        flexDirection: 'row',
        justifyContent: "space-between",
        gap: 20,
        marginTop: 5
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterText: {
        fontSize: 18
    },
    dropdown: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});
export default HomePage;