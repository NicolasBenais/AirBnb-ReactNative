import axios from "axios";
import { useState, useEffect } from "react";
import { TouchableOpacity, TextInput, View, Text } from "react-native";

import IsLoading from "../components/IsLoading";

export default function ProfileScreen({
  setToken,
  userId,
  setUserId,
  userToken,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [description, setDescription] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setIsLoading(false);
      } catch (error) {
        console.log(error.data);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <IsLoading />
  ) : (
    <View>
      <TextInput
        placeholder="email"
        placeholderTextColor="grey"
        autocapitalise="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="usernam"
        placeholderTextColor="grey"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        style={{
          borderWidth: 2,
          marginBottom: 32,
          borderColor: "#FF5A5F",
          height: 80,
          padding: 8,
          textAlignVertical: "top",
        }}
        multiline={true}
        value={description}
        placeholder="Describe yourself in few words..."
        placeholderTextColor="grey"
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setToken(null);
          setUserId(null);
        }}
      >
        <Text>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

// onPress={() => {
//   setToken(null);
//   setUserId(null);
