const axios = require("axios");

exports.handler = async (event, context) => {
  const { code } = JSON.parse(event.body);
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  //const CLIENT_ID = "Ov23liL4XDmLY2j5Om92";
  //const CLIENT_SECRET = "197cdb2112b7a482ce55413294de7a6ff76631fe";

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to exchange code for token" }),
    };
  }
};
