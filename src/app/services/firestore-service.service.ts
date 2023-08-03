import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc
} from '@firebase/firestore';
import { Firestore, collectionData, docData, query, orderBy, limit } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-data.interface';
import { Observable } from 'rxjs';
import { MessageData } from '../interfaces/message-data.interface';


@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {
  private userCollection: CollectionReference<DocumentData>;
  private messageCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'usuarios');
    this.messageCollection = collection(this.firestore, 'mensajes');
  }

  getAll() {
    return collectionData(this.userCollection) as Observable<UserData[]>;
  }

  getLatest5Messages(): Observable<MessageData[]> {
    const q = query(this.messageCollection, orderBy('fecha', 'desc'), limit(5));
    return collectionData(q) as Observable<MessageData[]>;
  }

  get(id: string) {
    const userDocumentReference = doc(this.firestore, 'usuarios', id);
    return docData(userDocumentReference);
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

  sendMessage(messageData: MessageData) {
    addDoc(collection(this.firestore, 'mensajes'), messageData);
  }
}