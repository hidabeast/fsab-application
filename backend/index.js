import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.get("/", async(req, res) => {
    res.send("Main Page")
});

app.get("/to-do", async (req, res) => {
    const collectionRef = collection(db, "fsab-application-collection");
    const collectionSnap = await getDocs(collectionRef);
    const docs = [];
    collectionSnap.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
    });
    res.send(docs);
});

app.post("/to-do", async (req, res) => {
    const { description, toDoBy, category } = req.body;
    const collectionRef = collection(db, "fsab-application-collection");
    await addDoc(collectionRef, { description, toDoBy, category });
    res.status(201).send({ message: "Item added" });
});

app.put("/to-do/:id", async (req, res) => {
    const { id } = req.params;
    const { description, toDoBy, category } = req.body;
    const docRef = doc(db, "fsab-application-collection", id);
    await updateDoc(docRef, { description, toDoBy, category });
    res.send({ message: "Item updated" });
});

app.delete("/to-do/:id", async (req, res) => {
    const { id } = req.params;
    const docRef = doc(db, "fsab-application-collection", id);
    await deleteDoc(docRef);
    res.status(200).send({ message: "Item deleted" });
});

app.listen(port, () => {
    console.log('listening!');
});