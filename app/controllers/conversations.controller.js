const db = require("../models");
const Conversations = db.conversations;

// Retrieve all Tutorials from the database.
exports.findOne = (req, res) => {
  var condition = [
      {
        $match: {
          "id": {
              $eq: parseInt(req.params.id)
          }
        }
      },
    {
      $lookup: {
        "foreignField": '_id',
        "localField": 'contact_id',
        "from": "contacts",
        "as": "contact"
      }
    },
    { $unwind : "$contact" },
    {
      $lookup: {
        "foreignField": '_id',
        "localField": 'user_id',
        "from": "users",
        "as": "user"
      }
    },
    { $unwind : "$user" },
    {
      $project: {
        messages: 0,
        id: 0,
        user_id: 0,
        contact_id: 0,
        original_user_id:0,
        organization_phone: 0,
        'contact.id':0,
      }
    },
  ];

  Conversations.findOne({id: parseInt(req.params.id)}).select("-messages")
    .then(data => {
      res.send({
        result: true,
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        result: false,
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.list = (req, res) => {
  var condition = [
    {
      $project: {
        messages: 0
      }
    }
  ];

  Conversations.aggregate(condition)
      .then(data => {
        res.send({
          result: true,
          data:data
        });
      })
      .catch(err => {
        res.status(500).send({
          result: false,
          message:
              err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.test = (req, res) => {
  res.send({result: "Hello Conversations!"});
};
