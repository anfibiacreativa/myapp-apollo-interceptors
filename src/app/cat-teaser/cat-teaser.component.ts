import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';
import { AuthenticationService } from '../../commons/services/authentication.service';
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
export class CatTeaserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('lazyKitten') cats: QueryList<ElementRef<HTMLUListElement>>;
  loading: boolean;
  kittens: any[];
  config: any = {
    // Root margin determines distance from viewport in the Y axis
    rootMargin: '20px 0px',
    threshold: 0.03
  };
  observer: any;
  urlPrefix: String = '../../assets/kitten/';
  urlSuffix: String = '.png';
  private querySubscription: Subscription;
  private catsSubscription: Subscription;
  constructor(
    private apollo: Apollo,
    private renderer: Renderer2,
    private auth: AuthenticationService

  ) {}

  lazyLoadCats(): void {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {

          if (entry.isIntersecting) {
            this.observer.unobserve(entry.target);
            this.preloadCats(entry.target);
          }
        });
      }, this.config);
  }

  preloadCats(entry): void {
    const srcValue = entry.getAttribute('data-attr');
    console.log(srcValue);
    const image = entry.firstChild as HTMLImageElement;
    image.src = srcValue;
  }

  watchCats(): void {
    const kitten = this.cats.toArray();
    console.log('Cats in this show:', kitten.length);
    kitten.forEach(kitty => {
      this.observer.observe(kitty.nativeElement);
    });
  }

  ngOnInit(): void {
    this.auth.setToken();
    this.querySubscription = this.apollo.watchQuery<any>({
      query: AllKitten
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.kittens = data.kittens;
    });
  }

  ngAfterViewInit(): void {
    this.watchCats();
    this.catsSubscription = this.cats.changes.subscribe(_ =>
      this.watchCats()
    );
    this.lazyLoadCats();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.catsSubscription.unsubscribe();
  }
}
