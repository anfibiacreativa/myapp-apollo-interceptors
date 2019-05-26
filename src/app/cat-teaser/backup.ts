import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';
// We use the gql tag to parse our query string into a query document
const AllKitten = gql`
  query AllKitten {
    kittens {
      id
      name
    }
  }
`;
@Component({
  selector: 'app-cat-teaser',
  templateUrl: './cat-teaser.component.html',
  styleUrls: ['./cat-teaser.component.scss']
})
export class CatTeaserComponent implements OnInit, OnDestroy {
  loading: boolean;
  kittens: any[];
  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit() {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: AllKitten
      })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.kittens = data.kittens;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
