"use strict";

const express = require('express');
const eg = require('express-graphql');

const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const root = {
  message: () => 'GraphQL Works!'
};

const app = express();

app.use('/api/index', eg({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen((3000), () => {
  console.log("** express started on port 3000. **")
});