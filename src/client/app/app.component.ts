import { Component } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  title: string = " Welcome to hello-graphql - Angular edition! ";

  gquery = gql`{
    sc: getCat(id: "0x000005") {
      id
      name
      color
      level
    }
  }`

  constructor(
    apollo: Apollo
  ) {
    apollo.query({query: this.gquery}).subscribe(console.log);
  }
}