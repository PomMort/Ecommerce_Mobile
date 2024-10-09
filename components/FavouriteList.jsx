import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import FavoritesContext from '../context/FavoritesContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FavouriteList() {
  const { favorites, removeFavorites, removeMultipleFavorites } = useContext(FavoritesContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút "Clear All" */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favourite</Text>
        {favorites.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={removeMultipleFavorites}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.containerDescription}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={styles.detailsContainer}>
                <Text numberOfLines={2} style={styles.artName}>
                  {item.artName}
                </Text>
                <Text style={styles.brand}>{item.brand}</Text>
                {item.limitiedTimeDeal ? (
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>
                      {item.price.toFixed(2)} $
                    </Text>
                    <Text style={styles.discountedPrice}>
                      {(item.price - item.price * item.limitedTimeDeal).toFixed(2)} $
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.price}>
                    {item.price.toFixed(2)} $
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeFavorites(item.id)}
              style={styles.deleteButton}
            >
              <Icon name="trash" size={22} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 30
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAllButton: {
    backgroundColor: '#ff424e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  containerDescription: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  artName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 13,
    color: '#ff424e',
    fontWeight: '600',
  },
  price: {
    fontSize: 13,
    color: '#ff424e',
    fontWeight: '600',
  },
  brand: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
