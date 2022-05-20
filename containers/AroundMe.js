import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import axios from "axios";
import IsLoading from "../components/IsLoading";
import * as Location from "expo-location";

export default function AroundMe() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  //   User locations
  // const [userCoords, setUserCoords] = useState();
  const [latitude, setLatidude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const getPermissionAndLocationAndFetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        let response;
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLatidude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&lontidude=${location.coords.longitude}`
          );
        } else {
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPermissionAndLocationAndFetchData();
  }, []);

  return isLoading ? (
    <IsLoading />
  ) : (
    <MapView
      showUserLocation={true}
      style={{ flex: 1 }}
      initialRegion={{
        // latitude: userCoords.latitude,
        // longitude: userCoords.longitude,
        latitude: latitude ? latitude : 48.866667,
        longitude: longitude ? longitude : 2.333333,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {data.map((item) => {
        return (
          <MapView.Marker
            key={item._id}
            coordinate={{
              longitude: item.location[0],
              latitude: item.location[1],
            }}
          />
        );
      })}
    </MapView>
  );
}
