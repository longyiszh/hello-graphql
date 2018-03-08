"use strict";

const express = require('express');
const eg = require('express-graphql');

const { buildSchema } = require('graphql');


const data = [
  {
    id: "0x000001",
    name: "叫叫猫",
    color: "orange",
    level: 5.0
  },
  {
    id: "0x000002",
    name: "疯猫猫",
    color: "white",
    level: 11.1
  },
  {
    id: "0x000003",
    name: "龙飞凤舞猫",
    color: "yellow",
    level: 8.1
  },
  {
    id: "0x000004",
    name: "小肉坨",
    color: "white",
    level: 3.0
  },
  {
    id: "0x000005",
    name: "史诗爪骨兽",
    color: "yellow",
    level: 222.0
  },
  {
    id: "0x000006",
    name: "橘橘虎",
    color: "orange",
    level: 0.5
  },
  {
    id: "0x000007",
    name: "超萌小猫猫",
    color: "white",
    level: -0.1
  }
];

const schema = buildSchema(`
  type Query {
    cat(id: String!): ScaryCat
    cats(color: String): [ScaryCat]
  }

  type ScaryCat {
    id: String
    name: String
    color: String
    level: Float
  }

  type Mutation {
    tame(id: String!): ScaryCat
  }
`);

const getCat = (args) => {
  let id = args.id;
  let metCats = data.filter((cat) => {
    return cat.id === id;
  });
  return metCats[0];
};

const getCats = (args) => {
  if (args.color) {
    let color = args.color;
    return data.filter((cat) => {
      return cat.color === color;
    });

  } else {
    return data;
  }
};

const tame = ({id}) => {
  for (let cat of data) {
    if (cat.id === id) {
      cat.level -= Math.floor(Math.random()*10);
      console.log(cat);
      return cat;
    }
  }
};

const root = {
  cat: getCat,
  cats: getCats,
  tame: tame
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