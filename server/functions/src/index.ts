import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

app.use(cors({ origin: true }));
main.use(cors({ origin: true }));
main.use("/api", app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.get("/warmup", (request, response) => {
  response.send("Warming up friend.");
});

app.post("/sitters", async (request, response) => {
  try {
    const data = {
      age: request.body.age,
      availability: request.body.availability,
      description: request.body.description,
      images: request.body.images,
      location: request.body.location,
      maximum_price: request.body.max_price,
      minimum_price: request.body.min_price,
      name: request.body.name,
      quote: request.body.quote,
      reviews: request.body.reviews,
      strengths: request.body.strengths,
      verified: request.body.verified
    };
    const sitterRef = await db.collection("sitters").add(data);
    const sitter = await sitterRef.get();

    response.json({
      id: sitterRef.id,
      data: sitter.data()
    });

    response.end();
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/sitters", async (request, response) => {
  console.log(response);
  try {
    const sitterQuerySnapshot = await db.collection("sitters").get();
    const sitters: any = [];
    sitterQuerySnapshot.forEach(sitter => {
      sitters.push({
        id: sitter.id,
        data: sitter.data()
      });
    });

    response.json(sitters);
    response.end();
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/sitters/:id', async (request, response) => {
  try {
    const sitterID = request.params.id;

    if (!sitterID) {
      response.send('Sitter ID is required')
    };

    const sitter = await db.collection('sitters').doc(sitterID).get();

    if (!sitter.exists){
      response.send("sitter doesn't exist.")
    }

    response.json({
      id: sitter.id,
      data: sitter.data()
    });

  } catch(error){

    response.status(500).send(error);

  }
});

app.put("/sitters/:id", async (request, response) => {
  try {
    const sitterId = request.body.id;
    const verified = request.body.verified;

    if (!sitterId) throw new Error("id is blank");

    if (!verified) throw new Error("Verified is required");

    const data = {
      verified
    };
    const fightRef = await db
      .collection("sitters")
      .doc(sitterId)
      .set(data, { merge: true });
    console.log(fightRef);
    response.json({
      id: sitterId,
      data
    });

    response.end();
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/sitters/:id", async (request, response) => {
  try {
    const sitterId = request.params.id;

    if (!sitterId) {
      response.send("ID is empty");
    }

    await db
      .collection("sitters")
      .doc(sitterId)
      .delete();

    response.json({
      id: sitterId,
      status: "deleted"
    });
  } catch (error) {
    response.status(500).send(error);
  }
});
