import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class DataService {

  init() {
      var config = {
        apiKey: "AIzaSyD94CtGDpSqq4IY2qc7g_NTsCMxXakYPvQ",
        authDomain: "footballtime-de7d5.firebaseapp.com",
        databaseURL: "https://footballtime-de7d5.firebaseio.com",
        storageBucket: "footballtime-de7d5.appspot.com",
        messagingSenderId: "760113240995"
      };
      firebase.initializeApp(config);
    }
  constructor(public http: Http) {
    console.log('Hello DataService Provider');
  }

}
