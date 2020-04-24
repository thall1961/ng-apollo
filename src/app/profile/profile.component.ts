import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CurrentUserForProfile = gql`
  query CurrentUserForProfile {
    currentUser {
      login
      avatar_url
    }
  }
`;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading: boolean;
  currentUser: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: CurrentUserForProfile
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.currentUser = data.currentUser;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
