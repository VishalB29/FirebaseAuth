import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";



import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TextInput } from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const userT = await AsyncStorage.getItem("userT");
      const userP = await AsyncStorage.getItem("userP");
      if (userP !== null) {
        setpassword(JSON.parse(userP));
        setIsLoading(false);
      }
      console.log(password);
      if (userT !== null) {
        setEmail(userT);
        setIsLoading(false);
      }
      console.log(email);
      if (userT !== null) {
        navigation.replace("Home");
        console.log(userT);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();

    const unsubscribe = auth.onAuthStateChanged((user) => {});
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Register with:", user.email);
        AsyncStorage.setItem("userT", email);
        AsyncStorage.setItem("userP", JSON.stringify(password));

        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        AsyncStorage.setItem("userT", email);
        AsyncStorage.setItem("userP", JSON.stringify(password));
        console.log("Logged in with:", email);
        console.log("Logged in with:", password);

        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading === true ? (
        <ActivityIndicator size={"large"} color={"cyan"} />
      ) : (
        <KeyboardAvoidingView style={styles.container} behaviour="padding">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            /> 

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setpassword(text)}
              style={styles.input}
              secureTextEntry={passwordVisible}
              right={<TextInput.Icon name={passwordVisible ? "eye" :"eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}

              
              
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutLine]}
            >
              <Text style={styles.buttonOutLineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    background: "#0782F9",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutLine: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutLineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },

});
