import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdScreen() {
  const { params } = useRoute();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.adId}`
        );
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [params]);

  return (
    <View>
      <Text>Ad id : {params.adId}</Text>
    </View>
  );
}
