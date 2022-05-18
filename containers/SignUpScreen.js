import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";

// STYLE
import styles from "../Styles/SignUpStyle";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  // FORM STATES
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldsError, setFieldsError] = useState("");
  const [visiblePasswordInput, setVisiblePasswordInput] = useState(false);
  const [visibleConfirmPasswordInput, setVisibleConfirmPasswordInput] =
    useState(false);

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
    // GENERAL CONTAINER
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" />

      <View>
        {/* MAIN CONTAINER */}
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.h1}>Sign Up</Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            {/* Email input */}
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            {/* Username input */}
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />

            {/* Description input */}
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

            {/* Password input */}
            <View style={styles.passwordView}>
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor="grey"
                secureTextEntry={!visiblePasswordInput}
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

            {/* Confirm password input */}
            <View style={styles.passwordView}>
              <TextInput
                style={styles.input}
                placeholder="confirm password"
                placeholderTextColor="grey"
                secureTextEntry={!visibleConfirmPasswordInput}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              />
              <AntDesign
                style={styles.eyeo}
                name={visibleConfirmPasswordInput ? "eye" : "eyeo"}
                size={24}
                color="grey"
                onPress={() => {
                  setVisibleConfirmPasswordInput(!visibleConfirmPasswordInput);
                }}
              />
            </View>
          </View>

          {/* BOTOM CONTAINER */}
          <View style={styles.bottomContainer}>
            {/* Error messages */}
            <Text style={styles.errorMessage}>{fieldsError}</Text>
            {/* Submit button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            {/* To navigate to the signin screen */}
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
      </View>
    </KeyboardAwareScrollView>
  );
}
