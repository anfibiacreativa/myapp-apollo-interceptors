import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CatTeaserComponent } from '../commons/components/cat-teaser/cat-teaser.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonReqInterceptor } from '../commons/interceptors/commonReq.interceptor';
import { OopsComponentComponent } from '../commons/components/oops-component/oops-component.component';
import { SupporterAreaComponent } from '../commons/components/supporter-area/supporter-area.component';
import { AuthenticationGuard } from 'src/commons/guards/authentication.guard';


@NgModule({
  declarations: [
    AppComponent,
    CatTeaserComponent,
    OopsComponentComponent,
    SupporterAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    AuthenticationGuard,
    {
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:8000/api'
        })
      };
    },
    deps: [HttpLink]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CommonReqInterceptor,
    multi: true,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
