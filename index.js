require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

// == middleware ==
app.use(cors());
app.use(express.json());

// _________________________________________________________________________________

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `${process.env.DB_URL}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    const taskCollection = client.db("taskJETDB").collection("tasks");

    // task api >>>
    app.post('/tasks', async (req, res) => {
      try {
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    app.get("/tasks", async (req, res) => {
      try {
        const query = {email : req.query?.email}
        const result = await taskCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.log(error)
      }
    });

    app.delete("/tasks/:id", async(req, res) => {
      try{
        const id = req.params.id 
        const query  = {_id : new ObjectId(id)}
        const result = await taskCollection.deleteOne(query)
        res.send(result)
      }
      catch(error){
        console.log(error)
      }
    })

    app.patch("/tasks/:id", async (req, res)=>{
      const id = req.params.id ;
      const filter = {_id :new ObjectId (id)}
      const updatedDoc = {
        $set: {
          status: "On Going",
        },
      }
      const result = await taskCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

        app.patch("/tasks/completed/:id", async (req, res)=>{
      const id = req.params.id ;
      const filter = {_id :new ObjectId (id)}
      const updatedDoc = {
        $set: {
          status: "Completed",
        },
      }
      const result = await taskCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

// __________________________________________________________________________________
app.get("/", (req, res) => {
  res.send("taskjet api running");
});

app.listen(port, () => {
  console.log(`taskjet is running on port ${port}`);
});
