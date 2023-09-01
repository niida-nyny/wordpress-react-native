import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";

const AllPostScreen = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);

  async function fetchData() {
    const res = await fetch(
      `https://dance.gdp22.com/wp-json/wp/v2/posts?_embed&per_page=4&page=${page}`
    );
    try {
      const myResponse = await res.json();
      setPosts([...posts, ...myResponse]);
      setFetching(false);
      // console.log(myResponse);
    } catch (e) {
      setFetching(false);
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  if (posts.length === 0) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#101010" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <Thumbnail data={item} touched={true} />
            </View>
          )}
          keyExtractor={(item) => {
            console.log(item.id);
            return item.id.toString();
          }}
          onEndReached={() => {
            setFetching(true);
            // console.log("reached");
            setPage(page + 1);
          }}
          onEndReachedThreshold={0.9}
        />
        <StatusBar style="dark" />
        {isFetching === true && (
          <View style={[styles.loadingBottomContainer]}>
            <ActivityIndicator size="large" color="#101010" />
          </View>
        )}
      </SafeAreaView>
    );
  }
};

export default AllPostScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: Platform.OS === "ios" ? 0 : 30,
    flexDirection: "columun",
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loadingBottomContainer: {
    // backgroundColor: "#404040",
    justifyContent: "center",
    marginBottom: 0,
  },
});
