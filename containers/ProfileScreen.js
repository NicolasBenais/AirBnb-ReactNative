import axios from "axios";
import { useState, useEffect } from "react";
import { TouchableOpacity, TextInput, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import IsLoading from "../components/IsLoading";

// STYLE
import styles from "../Styles/Profile";

export default function ProfileScreen({ setToken, userId, setId, userToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [description, setDescription] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const [selectedPicture, setSelectedPicture] = useState();
  const [sending, setSending] = useState(false);
  const [sendingPicture, setSendingPicture] = useState(false);

  const [isPictureUpdated, setIsPictureUpdated] = useState(false);

  // Get user's informations
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
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        if (response.data.photo) {
          setProfileImg(response.data.photo);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.data);
      }
    };
    fetchData();
  }, []);

  // Get persmission to acced to the library
  const getPermissionAndOpenLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.cancelled === false) {
        setSelectedPicture(result.uri);
        setProfileImg(result.uri);
      }
      if (!isPictureUpdated) {
        setIsPictureUpdated(true);
      }
    }
  };

  // Get permission to acced to the camera and to take a picture
  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (result.cancelled === false) {
        setSelectedPicture(result.uri);
        setProfileImg(result.uri);
      }
      if (!isPictureUpdated) {
        setIsPictureUpdated(true);
      }
    }
  };

  // To send the new profile picture
  const sendPicture = async () => {
    try {
      setSendingPicture(true);
      const tab = selectedPicture.split(".");
      const extension = tab[tab.length - 1];
      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `my_pic.${extension}`,
        type: `image/${extension}`,
      });
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setProfileImg(response.data.photo);
      setSendingPicture(false);
      setIsPictureUpdated(false);
      alert("Your profile has been updated !");
    } catch (error) {
      console.log(error.message);
    }
  };

  // To send the news informations
  const editUser = async () => {
    try {
      setSending(true);
      const obj = {};
      obj.email = email;
      obj.username = username;
      obj.description = description;

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        obj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setEmail(response.data.email);
      setUsername(response.data.username);
      setDescription(response.data.description);
      setSending(false);
      alert("Your profile has been updated.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <IsLoading />
  ) : (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.body}>
        <View style={styles.topContainer}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            {profileImg ? (
              <Image
                style={styles.profileImg}
                source={{ uri: profileImg.url }}
              />
            ) : (
              <Image
                style={styles.profileImg}
                source={require("../assets/blank_profil.png")}
              />
            )}
            <View style={styles.rightTopContainer}>
              <Ionicons
                style={{ marginBottom: 32 }}
                name="image"
                size={32}
                color="grey"
                onPress={getPermissionAndOpenLibrary}
              />
              <Ionicons
                name="camera"
                size={32}
                color="grey"
                onPress={getPermissionAndTakePicture}
              />
            </View>
          </View>
          {isPictureUpdated && (
            <TouchableOpacity
              style={styles.submitButtonPicture}
              onPress={sendPicture}
            >
              {sendingPicture ? (
                <Text style={{ color: "lightgrey" }}>
                  Updating your profile pic.
                </Text>
              ) : (
                <Text style={{ color: "grey" }}>Update your profile pic.</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="grey"
            autocapitalise="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
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
              borderColor: "#ffbac0",
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
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={editUser}>
          {sending ? (
            <Text style={styles.textButtonSending}>Updating</Text>
          ) : (
            <Text style={styles.textButton}>Update</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            setToken(null);
            setId(null);
          }}
        >
          <Text style={styles.textButton}>Log out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
