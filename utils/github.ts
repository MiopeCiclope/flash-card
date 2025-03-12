import {
  CLIENT_ID,
  CLIENT_SECRET,
  BASE_URL,
  GITHUB_API_URL,
  GITHUB_AUTH_URL,
  LAMBDA,
  GITHUB_TOKEN
} from '@env';
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { UserData } from '@/models/git-user';

const REDIRECT_URI = `${BASE_URL}`
const TOKEN_URI = `${BASE_URL}${LAMBDA}${GITHUB_TOKEN}`
const SCOPE = "public_repo"
const REPOSITORY_NAME = "FlashCardStorage"
const BRANCH_NAME = "master"

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

const getLastestCommitSha = async (accessToken: string, userData: UserData) => {
  const latestCommitSuccess = "Fetching Latest Commit SHA"
  const latestCommitFetchError = `${errorMessage} - ${latestCommitSuccess}`

  try {
    const refResponse = await axios.get(
      `${GITHUB_API_URL}/repos/${userData.login}/${REPOSITORY_NAME}/git/refs/heads/${BRANCH_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    console.log(successMessage, latestCommitSuccess)
    return refResponse.data.object.sha;
  } catch (error) {
    console.error(latestCommitFetchError, error)
    return
  }
}

const getTreeSha = async (accessToken: string, userData: UserData, latestCommitSha: string) => {
  const treeShaSuccess = "Fetching Tree SHA"
  const treeShaFetchError = `${errorMessage} - ${treeShaSuccess}`

  try {
    const treeShaResponse = await axios.get(
      `${GITHUB_API_URL}/repos/${userData.login}/${REPOSITORY_NAME}/git/commits/${latestCommitSha}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    console.log(successMessage, treeShaSuccess)
    return treeShaResponse.data.tree.sha;
  } catch (error) {
    console.error(treeShaFetchError, error)
    return
  }
}

const createNewTree = async (accessToken: string, userData: UserData, baseTreeSha: string, fileName: string, content: string) => {
  const treeCreationSuccess = "Tree Creation"
  const treeCreationError = `${errorMessage} - ${treeCreationSuccess}`

  try {
    const treeResponse = await axios.post(
      `${GITHUB_API_URL}/repos/${userData.login}/${REPOSITORY_NAME}/git/trees`,
      {
        base_tree: baseTreeSha,
        tree: [
          {
            path: fileName,
            mode: "100644",
            type: "blob",
            content
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

    console.log(successMessage, treeCreationSuccess)
    return treeResponse.data.sha;
  } catch (error) {
    console.error(treeCreationError, error)
    return
  }
}

const createCommit = async (accessToken: string, userData: UserData, commitMessage: string, treeSha: string, parents: string[]) => {
  const commitSuccess = "Commit added to repository!"
  const commitCreationError = `${errorMessage} - Creating commit:`

  try {
    const commitResponse = await axios.post(
      `${GITHUB_API_URL}/repos/${userData.login}/${REPOSITORY_NAME}/git/commits`,
      {
        message: commitMessage,
        tree: treeSha,
        parents
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

    console.log(successMessage, commitSuccess);
    return commitResponse.data.sha
  } catch (error) {
    console.error(commitCreationError, error);
    return
  }
}

const pushBranch = async (accessToken: string, userData: UserData, commitSha: string) => {
  const pushSuccess = "Push branch"
  const pushError = `${errorMessage} - ${pushSuccess}:`

  try {
    await axios.patch(
      `${GITHUB_API_URL}/repos/${userData.login}/${REPOSITORY_NAME}/git/refs/heads/master`,
      {
        sha: commitSha,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    console.log(successMessage, pushSuccess);
  } catch (error) {
    console.error(pushError, error);
  }

  return
}

const createRepo = async (accessToken: string | null, userData: UserData | null) => {
  if (!accessToken || !userData) {
    console.log(errorMessage, notLoggedInError)
    return;
  }

  const repositoryDescription = "This was created by JustFlashCard to backup your shit! I'M NOT RESPONSIBLE IF YOU FUCK THIS UP"
  const repositoryCreated = "Repository created successfully!"
  const repositoryCreationError = `${errorMessage} - Creating repository:`

  try {
    const repoResponse = await axios.post(
      `${GITHUB_API_URL}/user/repos`,
      {
        name: REPOSITORY_NAME,
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
    console.log(successMessage, repositoryCreated);
    return repoName
  } catch (error) {
    console.error(repositoryCreationError, error);
    return
  }
};

const commitNpush = async (accessToken: string | null, userData: UserData | null, content: string, fileName: string, commitMessage: string) => {
  if (!accessToken || !userData) {
    console.log(errorMessage, notLoggedInError)
    return;
  }

  const latestCommitSha = await getLastestCommitSha(accessToken, userData)
  const treeSha = await getTreeSha(accessToken, userData, latestCommitSha)
  const newTreeSha = await createNewTree(accessToken, userData, treeSha, fileName, content)
  const newCommitSha = await createCommit(accessToken, userData, commitMessage, newTreeSha, [latestCommitSha])
  await pushBranch(accessToken, userData, newCommitSha)
}

export { login, fetchToken, fetchUserData, createRepo, commitNpush }
