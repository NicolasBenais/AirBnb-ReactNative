import { View, ActivityIndicator } from "react-native";

const isLoading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#FF5A5F" />
    </View>
  );
};

export default isLoading;
