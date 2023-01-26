const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const createCollection = require("./functions/createCollection");
const getCollection = require("./functions/getCollection");
const getUser = require("./functions/getUser");
const updateUser = require("./functions/updateUser");
const createUser = require("./functions/createUser");
const isValidKey = require("./functions/isValidKey");
const createNft = require("./functions/createNft");

const mongoConnect = require("./mongoConnect");
mongoConnect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/incoming", async (req, res) => {
  const twiml = new MessagingResponse();
  let body = req.body;
  var response;
  let media = body.MediaUrl0;
  let text = body.Body;
  let phone = body.From.substring(9);
  console.log(phone);

  let user = getUser(phone).then((user) => {
    return user;
  });

  user = await user;

  if (user) {
    console.log("User exists");
    if (text) {
      state = user.state;
      console.log("state", state);

      if (state == 0) {
        let pubKey = await isValidKey(text);
        if (pubKey) {
          response =
            "Great , you are all set up , now you can send any photo with caption as CollectionName/PhotoTitle and we'll mint it for you";
          updateUser(phone, { state: 1, wallet: pubKey });
        } else {
          response = "Please first enter a valid Solana address";
        }
      } else if (state == 1) {
        let collectionName = text.split("/")[0];
        let photoTitle = text.split("/")[1];

        console.log(collectionName, photoTitle);

        if (!photoTitle || !media || !collectionName) {
          response =
            "Please enter in format CollectionName/PhotoTitle along with photo";
        } else {
          let collection = await getCollection(collectionName, user.wallet);

          if (collection) {
            response =
              "Great , we found your collection , minting your NFT , please wait";
            console.log("collectionAddress", collection);
            let nft = await createNft(collection, photoTitle, media , user.wallet);
            response = `Great , we minted your NFT \n solscan.io/token/${nft}`;
          } else {
            response =
              "We didn't find your collection , creating a new one , please wait";
            let collectionAddress = await createCollection(
              collectionName,
              media
            );
            console.log("collectionAddress", collectionAddress);
            let nft = await createNft(collectionAddress, photoTitle, media , user.wallet);
            response = `Great , we created your collection and minted your NFT \n solscan.io/token/${nft}`;
          }
        }
      } else {
        response = "Sorry, I didn't understand that.";
      }
    }
  } else {
    await createUser(phone);
    response =
      "Welcome , you look like a new user , please enter your Solana address , \n if you don't have one you can create one here https://phantom.app/";
  }

  if (!media && !text) {
    response = "?";
  }

  //   response = "Thanks for your message! We'll get back to you soon."

  console.log(response);
  await twiml.message(response);
  await res.writeHead(200, { "Content-Type": "text/xml" });
  await res.end(twiml.toString());
  console.log("Message sent! ");
});

app.listen(3000, () => console.log("server started at port 3000"));
