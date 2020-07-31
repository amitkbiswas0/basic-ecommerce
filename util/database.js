const MongoClient = require("mongodb").MongoClient;

// uri for connection
const uri =
  "mongodb+srv://<username>:<password><clustername>.g43sz.mongodb.net/<dbname>?retryWrites=true&w=majority";
// connection parameters
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// database variable
let _db;
// function to handle connection
const mongoConnect = (callback) => {
  MongoClient.connect(uri, params)
    .then((client) => {
      console.log("Connected to Client !");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("Problem connecting to client !");
      throw err;
    });
};
// function to get database
const getdb = () => {
  if (_db) return _db;
  throw "Database not found !";
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
