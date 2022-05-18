import { View } from "react-native";

import { AntDesign } from "@expo/vector-icons";

const Rate = (props) => {
  const { ratingValue } = props.data;

  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      stars.push(<AntDesign name="star" size={16} color="gold" />);
    } else {
      stars.push(<AntDesign name="star" size={16} color="lightgrey" />);
    }
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export default Rate;
