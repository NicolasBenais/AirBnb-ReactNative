import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { AntDesign } from "@expo/vector-icons";

// STYLE
import styles from "../Styles/Home";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
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
              <View style={styles.topContainer}>
                <Image
                  style={styles.containerImg}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={styles.price}>{item.price} €</Text>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomLeftContainer}>
                  <Text numberOfLines={1} style={styles.titleContainer}>
                    {item.title}
                  </Text>
                  <View style={styles.rates}>
                    <View style={styles.starsRates}>
                      <AntDesign
                        name="star"
                        size={16}
                        color={item.ratingValue > 0 ? "gold" : "lightgrey"}
                      />
                      <AntDesign
                        name="star"
                        size={16}
                        color={item.ratingValue > 1 ? "gold" : "lightgrey"}
                      />
                      <AntDesign
                        name="star"
                        size={16}
                        color={item.ratingValue > 2 ? "gold" : "lightgrey"}
                      />
                      <AntDesign
                        name="star"
                        size={16}
                        color={item.ratingValue > 3 ? "gold" : "lightgrey"}
                      />
                      <AntDesign
                        name="star"
                        size={16}
                        color={item.ratingValue > 4 ? "gold" : "lightgrey"}
                      />
                    </View>
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
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
