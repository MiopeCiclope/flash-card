import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as Linking from 'expo-linking';
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commitNpush, createRepo, fetchToken, fetchUserData, login } from "@/utils/github";
import { UserData } from "@/models/git-user";

export default function Test() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const state = useSelector((state) => state);
  const url = Linking.useURL();

  // Load the token from AsyncStorage on app load
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("github_access_token");
      if (token) {
        setAccessToken(token);
        const userData = await fetchUserData(token);
        setUserData(userData);
      }
      setLoading(false); // Stop loading after token is loaded
    };

    loadToken();
  }, []);

  const fetchUser = async (code: string) => {
    const accessToken = await fetchToken(code);

    if (accessToken) {
      setAccessToken(accessToken); // Save the access token
      await AsyncStorage.setItem("github_access_token", accessToken); // Store the token
      const userData = await fetchUserData(accessToken);
      setUserData(userData);
    }
  };

  useEffect(() => {
    if (url) {
      const params = new URLSearchParams(new URL(url).search);
      const urlCode = params.get("code");

      if (urlCode) {
        fetchUser(urlCode);
      }
    }
  }, [url]);

  const saveReduxStateToJson = () => {
    const jsonString = JSON.stringify(state, null, 2); // Convert to JSON string
    return jsonString;
  };

  const pushReduxStateToRepo = async () => {
    if (!accessToken || !userData) {
      Alert.alert("Error", "You must be logged in to push Redux state.");
      return;
    }

    const content = saveReduxStateToJson();
    const fileName = "flash-card-dump.json";
    const commitMessage = `Back Up ${new Date().toUTCString()}`
    await commitNpush(accessToken, userData, content, fileName, commitMessage)
  };

  const handleLogout = async () => {
    // Clear the token and user data
    await AsyncStorage.removeItem("github_access_token");
    setAccessToken(null);
    setUserData(null);
    Alert.alert("Success", "You have been logged out.");
  };

  // Show a loading indicator while the token is being loaded
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!userData && <Text style={styles.title}>Sign in with Github</Text>}

      {userData ? (
        <View style={styles.userContainer}>
          <Text style={styles.welcomeText}>Welcome, {userData.name}!</Text>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text>{userData.bio}</Text>
          <Button title="Create Repository" onPress={() => createRepo(accessToken, userData)} />
          <Button title="Save Redux State to Repo" onPress={pushReduxStateToRepo} />
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      ) : (
        <Button title="Login with GitHub" onPress={login} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
