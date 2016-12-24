import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// if you've gone with the local installation approach, you'd use the following:
import firebase from 'firebase';

@Injectable()
export class UserService {
    public auth: any;
    public users: any;
    _favorites = [];
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    constructor(public events: Events, public storage: Storage) {
        // adding a shortcut to hit the
        // users branch of my JSON tree directly
        this.users = firebase.database().ref('/users');

        // as well as adding a reference to the Firebase
        // authentication method
        this.auth = firebase.auth();
    }

    hasFavorite(sessionName) {
      return (this._favorites.indexOf(sessionName) > -1);
    };

    addFavorite(sessionName) {
      this._favorites.push(sessionName);
    };

    removeFavorite(sessionName) {
      let index = this._favorites.indexOf(sessionName);
      if (index > -1) {
        this._favorites.splice(index, 1);
      }
    };

    login(username) {
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.setUsername(username);
      this.events.publish('user:login');
    };

    signup(username) {
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.setUsername(username);
      this.events.publish('user:signup');
    };

    logout() {
      this.storage.remove(this.HAS_LOGGED_IN);
      this.storage.remove('username');
      this.events.publish('user:logout');
    };

    setUsername(username) {
      this.storage.set('username', username);
    };

    getUsername() {
      return this.storage.get('username').then((value) => {
        return value;
      });
    };

    // return a promise
    hasLoggedIn() {
      return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
        return value === true;
      });
    };

    checkHasSeenTutorial() {
      return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
        return value;
      })
    };
}
