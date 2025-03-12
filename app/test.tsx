import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import * as Linking from 'expo-linking';
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GITHUB_API_URL,
} from '@env';
import { login } from "@/utils/github";

interface UserData {
  name: string;
  avatar_url: string;
  bio: string;
  login: string; // GitHub username
}

export default function Test() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null); // Store the access token
  const [loading, setLoading] = useState(true); // Loading state
  const state = useSelector((state) => state); // Access the entire Redux state
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
    const accessToken = await exchangeCodeForToken(code);

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

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await axios.post(
        "https://just-flash-card.netlify.app/.netlify/functions/github-auth", // Proxy service endpoint
        {
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      return null;
    }
  };

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data as UserData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const createRepo = async () => {
    if (!accessToken || !userData) {
      Alert.alert("Error", "You must be logged in to create a repository.");
      return;
    }

    try {
      // Step 1: Create a new repository
      const repoResponse = await axios.post(
        `${GITHUB_API_URL}/user/repos`,
        {
          name: "new-repo", // Repository name
          description: "This is a new repository created from my app", // Repository description
          private: false, // Set to true for a private repository
          auto_init: true, // Initialize the repository with a README
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const repoName = repoResponse.data.name;
      Alert.alert("Success", "Repository created successfully!");

      // Step 2: Add an initial commit
      const readmeContent = "# Welcome to My New Repository\n\nThis repository was created programmatically.";

      const commitResponse = await axios.put(
        `${GITHUB_API_URL}/repos/${userData.login}/${repoName}/contents/README.md`,
        {
          message: "Initial commit", // Commit message
          content: btoa(readmeContent), // Base64-encoded content
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      Alert.alert("Success", "Initial commit added to repository!");
    } catch (error) {
      console.error("Error creating repository or adding commit:", error);
      Alert.alert("Error", "Failed to create repository or add commit.");
    }
  };

  const saveReduxStateToJson = () => {
    const jsonString = JSON.stringify(state, null, 2); // Convert to JSON string
    return jsonString;
  };

  const pushReduxStateToRepo = async () => {
    if (!accessToken || !userData) {
      Alert.alert("Error", "You must be logged in to push Redux state.");
      return;
    }

    const jsonString = saveReduxStateToJson(); // Get the Redux state as JSON
    const fileName = "redux-state.json"; // Name of the file to create

    try {
      // Step 1: Get the SHA of the latest commit
      const refResponse = await axios.get(
        `${GITHUB_API_URL}/repos/${userData.login}/new-repo/git/refs/heads/master`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const latestCommitSha = refResponse.data.object.sha;

      // Step 2: Get the SHA of the tree associated with the latest commit
      const commitResponse = await axios.get(
        `${GITHUB_API_URL}/repos/${userData.login}/new-repo/git/commits/${latestCommitSha}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const baseTreeSha = commitResponse.data.tree.sha;

      // Step 3: Create a new tree with the JSON file
      const treeResponse = await axios.post(
        `${GITHUB_API_URL}/repos/${userData.login}/new-repo/git/trees`,
        {
          base_tree: baseTreeSha,
          tree: [
            {
              path: fileName,
              mode: "100644", // File mode (100644 = regular file)
              type: "blob",
              content: jsonString, // Use the plain JSON string
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const newTreeSha = treeResponse.data.sha;

      // Step 4: Create a new commit
      const commitResponse2 = await axios.post(
        `${GITHUB_API_URL}/repos/${userData.login}/new-repo/git/commits`,
        {
          message: "Add Redux state as JSON", // Commit message
          tree: newTreeSha,
          parents: [latestCommitSha],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const newCommitSha = commitResponse2.data.sha;

      // Step 5: Update the reference to point to the new commit
      await axios.patch(
        `${GITHUB_API_URL}/repos/${userData.login}/new-repo/git/refs/heads/master`,
        {
          sha: newCommitSha,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      Alert.alert("Success", "Redux state pushed to repository!");
    } catch (error) {
      console.error("Error pushing Redux state:", error);
      Alert.alert("Error", "Failed to push Redux state to repository.");
    }
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
          <Button title="Create Repository" onPress={createRepo} />
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
