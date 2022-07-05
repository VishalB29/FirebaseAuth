import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import { StatusBar } from "expo-status-bar";

const Header = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        AsyncStorage.clear();
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="#6495ed"/>
      <Text style={styles.titleText }> News App</Text>
      <View style={{ flexDirection: "row", width: "100%",}}>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight:25,
    alignItems:'center'
    

  },
  titleText: {
    fontSize: 22,
    fontWeight:'700'
    
    
  },
  logOutText:{
    alignSelf:"flex-start",
    bottom:20,
    
  
  }
});
