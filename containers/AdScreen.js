import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

// COMPONENTS
import Rate from "../components/Rate";
import IsLoading from "../components/IsLoading";

// STYLE
import styles from "../Styles/Ad";

export default function AdScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showText, setShowText] = useState(false);
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
    // LOADING STATE
    <IsLoading />
  ) : (
    // GENERAL CONTAINER
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      {/* CAROUSEL */}
      <View>
        <SwiperFlatList
          style={{ position: "relative" }}
          showPagination
          data={data.photos}
          // keyExtractor={(elem) => elem._id} NE FONCTIONNE PAS
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

      {/* INFORMATIONS CONTAINER */}
      <View style={styles.informations}>
        {/* INFORMATIONS UNDER THE CAROUSEL */}
        <View style={styles.bottomContainer}>
          <View style={styles.bottomLeftContainer}>
            {/* Title */}
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            {/* Rates container */}
            <View style={styles.rates}>
              <View style={styles.starsRates}>
                <Rate data={data} />
              </View>
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
          {/* Avatar's owner */}
          <Image
            style={styles.userPhoto}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
        {/* Description's ad */}
        <TouchableOpacity
          onPress={() => {
            setShowText(!showText);
          }}
        >
          <Text style={styles.description} numberOfLines={showText ? null : 3}>
            {data.description}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        style={{ height: 300, width: Dimensions.get("window").width }}
        initialRegion={{
          longitude: data.location[0],
          latitude: data.location[1],
          longitudeDelta: 0.1,
          latitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            longitude: data.location[0],
            latitude: data.location[1],
          }}
        />
      </MapView>
    </ScrollView>
  );
}
