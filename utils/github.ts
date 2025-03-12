import {
  CLIENT_ID,
  CLIENT_SECRET,
  BASE_URL,
  CALLBACK_GIT_URI,
  GITHUB_API_URL,
  GITHUB_AUTH_URL,
  LAMBDA,
  GITHUB_TOKEN
} from '@env';
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { UserData } from '@/models/git-user';

const REDIRECT_URI = `${BASE_URL}${CALLBACK_GIT_URI}`
const TOKEN_URI = `${BASE_URL}${LAMBDA}${GITHUB_TOKEN}`
const SCOPE = "public_repo"

const login = async () => {
  const authUrl = `${GITHUB_AUTH_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

  await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);
}

const fetchToken = async (code: string) => {
  try {
    const response = await axios.post(
      TOKEN_URI, {
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

const successMessage = "Success"
const errorMessage = "Error"
const notLoggedInError = "You must be logged in to create a repository."

const createCommit = async (accessToken: string, userData: UserData, repoName: string, commitMessage: string, content: string) => {
  const commitSuccess = "Commit added to repository!"
  const commitCreationError = `${errorMessage} - Creating commit:`

  try {
    await axios.put(
      `${GITHUB_API_URL}/repos/${userData.login}/${repoName}/contents/README.md`,
      {
        message: commitMessage,
        content: btoa(content),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    console.log(successMessage, commitSuccess);
  } catch (error) {
    console.error(commitCreationError, error);
  }
}

const createRepo = async (accessToken: string, userData: UserData) => {
  if (!accessToken || !userData) {
    console.log(errorMessage, notLoggedInError)
    return;
  }

  const repositoryName = "FlashCardStorage"
  const repositoryDescription = "This was created by JustFlashCard to backup your shit! I'M NOT RESPONSIBLE IF YOU FUCK THIS UP"
  const repositoryCreated = "Repository created successfully!"
  const readmeContent = "# Welcome to My New Repository\n\nThis repository was created programmatically.";
  const repositoryCreationError = `${errorMessage} - Creating repository:`

  try {
    const repoResponse = await axios.post(
      `${GITHUB_API_URL}/user/repos`,
      {
        name: repositoryName,
        description: repositoryDescription,
        private: false,
        auto_init: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const repoName = repoResponse.data.name;
    await createCommit(accessToken, userData, repoName, "initial commit", readmeContent)
    console.log(successMessage, repositoryCreated);
    return repoName
  } catch (error) {
    console.error(repositoryCreationError, error);
  }
};

export { login, fetchToken, fetchUserData, createRepo }
