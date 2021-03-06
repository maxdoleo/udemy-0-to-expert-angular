import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

import { Message } from './../interfaces/message.interface';
import { User } from './../interfaces/user.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public user: User = {name: '', photo: '', uid: ''};

  constructor(  private afs: AngularFirestore,
                public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe( takeUser => {
      console.log( 'User state', takeUser);
      if ( !takeUser ) {
        return;
      }
      this.user.name = takeUser.displayName;
      this.user.uid = takeUser.uid;
      this.user.photo = takeUser.photoURL;
      console.log(this.user);
    });
  }

  login( provider: string) {
    if (provider === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else if (provider === 'twitter') {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.user = {name: '', photo: '', uid: ''};
    this.afAuth.auth.signOut();
  }

  loadMessages() {
    // https://github.com/angular/angularfire2/blob/master/docs/rtdb/querying-lists.md
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('data', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map( (messages: Message[]) => {
                                                                this.chats = [];

                                                                for ( const msg of messages ) {
                                                                  this.chats.unshift( msg );
                                                                }
                                                                return this.chats;
                                                          })
    );
  }

  addMessage( text: string) {
    const msg: Message = {
      name: this.user.name,
      message: text,
      data: new Date().getTime(),
      uid: this.user.uid
    };

    return this.itemsCollection.add(msg);
  }
}
