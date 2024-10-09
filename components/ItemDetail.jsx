import {
  View, Text, StyleSheet, Image, StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavoritesContext from '../context/FavoritesContext';

export default function ItemDetail({ route }) {
  const [liked, setLiked] = useState(false);
  const { item } = route.params;
  const { addFavorites, favorites, removeFavorites } = useContext(FavoritesContext);

  const isFavorites = (item) => {
    return favorites.some(favItem => favItem.id === item.id);
  }

  // Logic render star
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5;
    const starsArray = Array(fullStars).fill('star');
    if (halfStars) {
      starsArray.push('star-half');
    }
    while (starsArray.length < 5) {
      starsArray.push('star-o');
    }
    return starsArray.map((star, index) => (
      <Icon key={index} name={star} size={18} color="#ffd700" style={styles.star} />
    ))
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => (!isFavorites(item) ? addFavorites(item) : removeFavorites(item.id))} style={styles.heartIconContainer}>
        <Icon
          name="heart"
          size={24}
          color={isFavorites(item) ? "#ff0000" : "#ccc"} // Toggle color based on liked state
          style={styles.heartIcon}
        />
      </TouchableOpacity>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <Text style={styles.artName} numberOfLines={2}>{item?.artName}</Text>

      {item.limitedTimeDeal ? (
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{item.price.toFixed(2)} $</Text>
          <Text style={styles.discountedPrice}>{(item.price - (item.price * item.limitedTimeDeal)).toFixed(2)} $</Text>
        </View>
      ) : (
        <Text style={styles.price}>{item.price.toFixed(2)} $</Text>
      )}
      <View style={styles.containerSurface}>
        <Text style={styles.brand}>Brand: {item.brand}</Text>
        <Text style={styles.surface}>Glass Surface: {item.glassSurface ? 'No' : 'Yes'}</Text>
      </View>

      <Text style={styles.description}>{item?.description}</Text>
      <View>
        <Text style={styles.review}>Review</Text>
        <View style={styles.reviewComment}>
          {item.rate.length > 0 ? (
            item.rate.map((item, index) => (
              <View key={index} style={styles.reviewContainer}>
                <Text style={styles.username}>{item.username}</Text>
                <View style={styles.rating}>{renderStars(item.stars)}</View>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text style={styles.commentAt}>{item.commentAt}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReview}>No review and comment here !!!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'center',
  },
  artName: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 10
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 100
  },
  originalPrice: {
    fontSize: 18,
    marginTop: 10,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 18,
    marginTop: 10,
    color: '#d9534f',
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    marginTop: 10,
    color: '#d9534f',
    fontWeight: '600',
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
  brand: {
    fontSize: 17,
    color: 'gray',
    marginTop: 10,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 18,
    fontSize: 15,
  },
  review: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
  containerSurface: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  surface: {
    marginTop: 10,
    fontSize: 17,
    color: 'gray',
    fontWeight: 'bold'
  },
  reviewContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '100%'
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'flex-start',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    width: '100%',
    marginBottom: 5,
  },
  commentAt: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    width: '100%',
  },
  noReview: {
    fontStyle: 'italic',
    color: '#555'
  },
  star: {
    marginRight: 2
  },
  reviewComment: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  }
});
