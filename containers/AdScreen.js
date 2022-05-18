import { useRoute } from "@react-navigation/core";
import { Text, View, ScrollView, Image, Dimensions } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { AntDesign } from "@expo/vector-icons";

import Rate from "../components/Rate";

// STYLE
import styles from "../Styles/Ad";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.adId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [params]);

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <ScrollView style={styles.container}>
      <View>
        <SwiperFlatList
          style={{ position: "relative" }}
          showPagination
          data={data.photos}
          renderItem={({ item }) => (
            <View>
              <Image
                style={{
                  height: 300,
                  width: Dimensions.get("window").width,
                }}
                source={{ uri: item.url }}
              />
            </View>
          )}
        />
        <Text style={styles.price}>{data.price} €</Text>
      </View>
      <View style={styles.informations}>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomLeftContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            <View style={styles.rates}>
              <View style={styles.starsRates}>
                <Rate data={data} />
              </View>
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
          <Image
            style={styles.userPhoto}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {data.description}
        </Text>
      </View>
    </ScrollView>
  );
}
