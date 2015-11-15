Pairs = new Mongo.Collection("pairs");
People = new Mongo.Collection("people");
People.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  email: {
    type: String,
    label: "Email"
  }
}));