import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import IsLoading from "../components/IsLoading";
import * as Location from "expo-location";

export default function AroundMe() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserLocation, setIsLoadingUserLocation] = useState(true);
  const [data, setData] = useState(null);

  //   User locations
  const [userCoords, setUserCoords] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const askPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          const obj = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setUserCoords(obj);
          setIsLoadingUserLocation(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error.response.message);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <IsLoading />
  ) : (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: userCoords.latitude,
        longitude: userCoords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showUserLocation={true}
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
