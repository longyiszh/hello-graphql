import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';

const router = new Router();
const typeDefs = `
  type Query {
    getCat(id: String!): ScaryCat
    getCats(color: String): [ScaryCat]
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
`;

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

const getCat = (obj, args, context, info) => {

  let id = args.id;
  let metCats = data.filter((cat) => {
    return cat.id === id;
  });
  return metCats[0];
};

const getCats = (obj, args, context, info) => {

  if (args.color) {
    let color = args.color;
    return data.filter((cat) => {
      return cat.color === color;
    });

  } else {
    return data;
  }

};

const tame = (obj, args, context, info) => {

  for (let cat of data) {
    if (cat.id === args.id) {
      cat.level -= Math.floor(Math.random()*10);
      return cat;
    }
  }
};

const resolvers = {
  Query: {
    getCat,
    getCats
  },
  Mutation: {
    tame
  }
  // cat: getCat,
  // cats: getCats,
  // tame: tame
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


/* GET api listing. */
router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    msg: "api works!"
  }
});

router.get('/graphql', graphqlKoa({ schema: schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/api/graphql' }));

router.post('/graphql', bodyParser(), graphqlKoa({ schema: schema }));

export const api = router;