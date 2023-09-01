import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Thumbnail = (props) => {
  const { data, touched } = props;
  const navigation = useNavigation();
  // console.log(data);
  const Container = touched ? TouchableOpacity : View;
  return (
    <Container
      style={styles.thumbnailContainer}
      onPress={() => {
        // console.log("pressed");
        navigation.navigate("Single", { data });
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={{ color: "#101010", fontSize: 18 }}>
          {data?.title.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ color: "#404040", fontSize: 14 }}>
          {data?.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {data.featured_media != 0 && (
          <Image
            style={{ width: "98%", height: 150, borderRadius: 10 }}
            source={{
              uri: data?._embedded["wp:featuredmedia"]["0"].source_url,
            }}
          />
        )}
      </View>
    </Container>
  );
};

export default Thumbnail;

const styles = StyleSheet.create({
  thumbnailContainer: {
    width: "90%",
    backgroundColor: "#c3cafd",
    marginVertical: 10,
    borderRadius: 10,
  },
  titleContainer: {
    backgroundColor: "#a5b1e1",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: "2%",
  },
  imageContainer: {
    alignItems: "center",
  },
});
