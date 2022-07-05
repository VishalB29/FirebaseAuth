import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Button
} from "react-native";
import Moment from "moment";

import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import Article from "../component/Article";
import Carousel, { Pagination } from "react-native-snap-carousel";
const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [searcho, setSearcho] = useState('');
  const markedDate = Moment(new Date()).format("YYYY-MM-DD");
  const newsUrl =
    "https://newsapi.org/v2/everything?q=everything"+
    "&from=" +
    markedDate +
    "&sortBy=publishedAt&apiKey=46df8e43bacc47138a817eb781c22af1";
    const news =
    "https://newsapi.org/v2/everything?q=" +
    search+
    "&from=" +
    markedDate +
    "&sortBy=publishedAt&apiKey=46df8e43bacc47138a817eb781c22af1";
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState();
  const navigation = useNavigation();
  const txtHandler = (enteredUrl) => {
    
    setSearcho(enteredUrl);
      if (enteredUrl.includes(' ')) {
        setSearch(enteredUrl.replace(/ /g,'') );
       } else {
        setSearch(enteredUrl);
       }
      }
     
  
  const isCarousel = useRef(null);
  const refresh = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(news);

      const response = await result.json();
      setData(response.articles);
      setIsLoading(false);
      console.log(news);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(newsUrl);

        const response = await result.json();
        setData(response.articles);
        setIsLoading(false);
        console.log(newsUrl);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNewsData();
  }, []);
//  function handleSearch(){
   
//     useEffect(() => {
//       const fetchNewsData = async () => {
//         setIsLoading(true);
//         try {
//           const result = await fetch(newsUrl);
//           const response = await result.json();
//           setData(response.articles);
//           setIsLoading(false);
//           // console.log(response);
//         } catch (e) {
//           console.log(e);
//         }
//       };
//       fetchNewsData();
//     }, []);
//   }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} color="#f4511e" />
      ) : (
        // <FlatList
        // horizontal={true}
        //   data={data}
        //   keyExtractor={(item, index) => index.toString()}
        //   renderItem={({ item }) => <Article item={item} />}
        // />
        <View style={styles.container}>
          <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:10}}>
            <TextInput 
              placeholder="Search"
              value={searcho}
              onChangeText={txtHandler}
              style={styles.input}
            />
            <Button onPress={refresh} title='go'/>
          </View>
          <Carousel
            vertical
            layout="default"
            layoutCardOffset={10}
            ref={isCarousel}
            data={data}
            loop={true}
            onSnapToItem={(index) => setIndex(index)}
            renderItem={({ item }) => <Article item={item} />}
            sliderHeight={Dimensions.get("window").height / 1.3}
            itemHeight={Dimensions.get("window").height / 1.3}
          />
          <Pagination
            dotsLength={data ? data.length : 0}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "#a9a9a9",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.4}
            tappableDots={true}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faebd7",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal:10,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight:8,
    marginTop: 5,
    width:'88%',
    alignItems:"center"
    
    
  },
});
