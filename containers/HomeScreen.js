import {
  Text,
  View,
  FlatList,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";

// COMPONENTS
import Rate from "../components/Rate";
import IsLoading from "../components/IsLoading";

// STYLE
import styles from "../Styles/Home";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    // LOADING STATE
    <IsLoading />
  ) : (
    // GENERAL CONTAINER
    <View style={styles.main}>
      <StatusBar style="dark" />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate("Ad", { adId: item._id });
              }}
            >
              {/* MAIN PICTURE AND PRICE */}
              <View style={styles.topContainer}>
                <Image
                  style={styles.containerImg}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={styles.price}>{item.price} €</Text>
              </View>

              {/* BOTTOM'S CONTAINER */}
              <View style={styles.bottomContainer}>
                <View style={styles.bottomLeftContainer}>
                  {/* Title */}
                  <Text numberOfLines={1} style={styles.titleContainer}>
                    {item.title}
                  </Text>
                  {/* Rates container */}
                  <View style={styles.rates}>
                    <View style={styles.starsRates}>
                      <Rate data={item} />
                    </View>
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
                {/* Avatar's owner */}
                <Image
                  style={styles.userPhoto}
                  source={{ uri: item.user.account.photo.url }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
