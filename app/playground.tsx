import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  GITHUB_API_URL,
  GITHUB_AUTH_URL,
} from '@env';

export default function PlayGround() {
  console.log(CLIENT_ID); // Output: Ov23liL4XDmLY2j5Om92
  console.log(GITHUB_API_URL); // Output: https://api.github.com

  return (<div>just testing </div>)
}
