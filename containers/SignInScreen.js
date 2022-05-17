import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

import styles from "../Styles/SignUpStyle";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldsError, setFieldsError] = useState("");
  const [visiblePasswordInput, setVisiblePasswordInput] = useState(false);

  const handleSubmit = async () => {
    setFieldsError("");

    if (email.length < 1 || password.length < 1) {
      setFieldsError("Please fill all fields");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        console.log("response:", response.data);
        setToken(response.token);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          setFieldsError("Email or password incorrect");
        }
        console.log(error.message);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.h1}>Sign In</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="grey"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <View style={styles.passwordView}>
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor="grey"
                secureTextEntry={!visiblePasswordInput}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <AntDesign
                style={styles.eyeo}
                name={visiblePasswordInput ? "eye" : "eyeo"}
                size={24}
                color="grey"
                onPress={() => {
                  setVisiblePasswordInput(!visiblePasswordInput);
                }}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.errorMessage}>{fieldsError}</Text>
            <TouchableOpacity
              style={styles.submitButton}
              title="Sign in"
              onPress={handleSubmit}
            >
              <Text style={styles.textButton}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ color: "grey" }}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
