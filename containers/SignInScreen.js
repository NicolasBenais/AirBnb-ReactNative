import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";

// STYLE
import styles from "../Styles/SignUpStyle";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  // FORM STATES
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

        setToken(response.data.token);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          setFieldsError("Email or password incorrect");
        }
        console.log(error.message);
      }
    }
  };

  return (
    // GENERAL CONTAINER
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" />

      <View style={{ flex: 1 }}>
        {/* MAIN CONTAINER */}
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.h1}>Sign In</Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            {/* Email input */}
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

            {/* Password input */}
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

          {/* BOTTOM CONTAINER */}
          <View style={styles.bottomContainer}>
            {/* Error messages */}
            <Text style={styles.errorMessage}>{fieldsError}</Text>
            {/* Submit button */}
            <TouchableOpacity
              style={styles.submitButton}
              title="Sign in"
              onPress={handleSubmit}
            >
              <Text style={styles.textButton}>Sign In</Text>
            </TouchableOpacity>
            {/* To navigate to the signup screen */}
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
