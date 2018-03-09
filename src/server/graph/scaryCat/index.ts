import { readFileSync } from 'fs';

import { makeExecutableSchema } from 'graphql-tools';

class ScaryCat {
  typeDefs: string = require('./type.graphql');

  data: any[] = [
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
      level: -11.1
    }
  ];


  getCat = (obj, args, context, info) => {

    let id = args.id;
    let metCats = this.data.filter((cat) => {
      return cat.id === id;
    });
    return metCats[0];
  };

  getCats = (obj, args, context, info) => {

    if (args.color) {
      let color = args.color;
      return this.data.filter((cat) => {
        return cat.color === color;
      });
  
    } else {
      return this.data;
    }
  
  };

  tame = (obj, args, context, info) => {

    for (let cat of this.data) {
      if (cat.id === args.id) {
        cat.level -= Math.floor(Math.random()*10);
        return cat;
      }
    }
  };


  resolvers = {
    Query: {
      getCat: this.getCat,
      getCats: this.getCats
    },
    Mutation: {
      tame: this.tame
    }
  };

  get schema() {
    // Put together a schema
    return makeExecutableSchema({
      typeDefs: this.typeDefs,
      resolvers: this.resolvers
    });
  }

}

let sc = new ScaryCat();
export const schema = sc.schema;