import { Component } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import * as getBunchCats from '../assets/graphql/get-bunch-cats.query.graphql';
// import '../assets/graphql/get-bunch-cats.query.graphql';
// const getBunchCats = import('../assets/graphql/get-bunch-cats.query.graphql');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  title: string = " Welcome to hello-graphql - Angular edition! ";

  // fragments = gql`
  //   fragment catFields on ScaryCat {
  //     id
  //     name
  //     color
  //     level
  //   }
  // `;


  constructor(
    apollo: Apollo
  ) {
    apollo.query(
      {
        query: getBunchCats,
        variables: {
          "catID1": "0x000004",
          "catID2": "0x000005"
        }
      }).subscribe(console.log);
  }
}