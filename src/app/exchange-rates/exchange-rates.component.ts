import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ExchangeRate } from './exchange-rate.model';
import { Rate } from './rate.model';


@Component({
  selector: 'exchange-rates',
  templateUrl: './exchange-rates.component.html',
})
export class ExchangeRates implements OnInit {
  rates: Rate[];
  loading: boolean = true;
  error: any;
  data: ExchangeRate;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log('in the ngoninit');
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: ExchangeRate) => {
        this.rates = result.data?.rates;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}