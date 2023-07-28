import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-data.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {
  private userCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'usuarios');
  }

  getAll() {
    return collectionData(this.userCollection) as Observable<UserData[]>;
  }

  get(id: string) {
    const userDocumentReference = doc(this.firestore, 'usuarios', id);
    return docData(userDocumentReference);
    // userDocData.subscribe()
    // console.log(userDocData);
    // return userDocData as Observable<UserData>;
  }

  create(user: UserData) {
    return setDoc(doc(this.firestore, 'usuarios', user.Id), { UserName: user.UserName });
  }

  update(user: UserData) {
    const userDocumentReference = doc(
      this.firestore,
      `usuarios/${user.Id}`
    );
    return updateDoc(userDocumentReference, { UserName: user.UserName });
  }

  delete(id: string) {
    const userDocumentReference = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(userDocumentReference);
  }
}