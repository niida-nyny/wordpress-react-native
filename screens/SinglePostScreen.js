import React from "react";
import { View } from "react-native";
import Thumbnail from "../components/Thumbnail";

const SinglePostScreen = (props) => {
  const { route } = props;
  // console.log(route);
  const data = route.params.data;
  return (
    <View>
      <Thumbnail data={data} touched={false} />
    </View>
  );
};

export default SinglePostScreen;
