import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
const Article = ({ item }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <View style={styles.space}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description} </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Description",{ url: item.url })}>
            <Text style={{ alignSelf: "flex-end", color: "blue" }}>
              read more...
            </Text>
          </TouchableOpacity>
          <View style={styles.data}>
            <Text style={styles.heading}>
              by: <Text style={styles.author}>{item.author}</Text>
            </Text>
            <Text>
              date: <Text>{item.publishedAt}</Text>
            </Text>
          </View>
          <View>
            <Text>
              source: <Text style={styles.source}>{item.source.name}</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Article;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "95%",
    height: "80%",
    marginTop: 15,
    elevation: 20,
    shadowColor: "#6495ed",
    shadowRadius: 20,
    shadowOpacity: 1,
    backgroundColor: "pink",
  },
  image: {
    alignSelf: "center",
    resizeMode: "cover",
    height: "50%",
    width: "100%",
  },
  title: { fontSize: 20, fontWeight: "800" },
  description: { fontSize: 17 },
  data: { padding: 3 },
  heading: { padding: 4 },
  author: { color: "red" },
  source: { color: "red", paddingLeft: 4 },
  space: { paddingHorizontal: 5, paddingTop: 10 },
  
});
