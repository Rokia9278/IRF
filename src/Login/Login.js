import React from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View, StyleSheet, Button } from "react-native";
/*import * as Facebook from "expo-facebook";*/

const appId = "1047121222092614";

export default function LoginScreen() {
  const onLoginPress = () => {};

  const onFbLoginPress = async () => {
    try {
      await Facebook.initializeAsync({
        appId,
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
      console.log(message)
    }
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Projet de formation react native</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
            <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress()} title="Login" />
            <Button containerStyle={styles.fbLoginButton} type='clear' onPress={() => onFbLoginPress()} title="Login With Facebook" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});


