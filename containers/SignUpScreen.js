import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

import styles from "../Styles/SignUpStyle";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldsError, setFieldsError] = useState("");

  const handleSubmit = async () => {
    setFieldsError("");

    if (
      email.length < 1 ||
      username.length < 1 ||
      description.length < 1 ||
      password.length < 1 ||
      confirmPassword < 1
    ) {
      setFieldsError("Please fill all fields");
    } else if (password !== confirmPassword) {
      setFieldsError("Passwords are differents");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email,
            username,
            description,
            password,
          }
        );
        console.log("response:", response.data);
        setToken(response.token);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          setFieldsError("Email or password incorrect");
        } else if (error.message === "Request failed with status code 400") {
          setFieldsError("Email or username already used");
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View>
        <StatusBar style="dark" />
        {/* <ScrollView> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.h1}>Sign Up</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="grey"
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
              placeholder="Describe yourself in few words..."
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setDescription(text);
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="confirm password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.errorMessage}>{fieldsError}</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={{ color: "grey" }}>
                Already have an account ? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </KeyboardAwareScrollView>
  );
}
