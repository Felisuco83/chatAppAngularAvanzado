import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MessageData } from 'src/app/interfaces/message-data.interface';
import { FireStoreServiceService } from 'src/app/services/firestore-service.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private readonly fireStoreService: FireStoreServiceService, private reduxStore: StoreService) { }

  userName: string = '';

  ngOnInit(): void {
    this.reduxStore.getState('userNameState').subscribe((state: any) => {
      this.userName = state.userName;
    });
  }

  sendMessage(message: any) {
    let messageData: MessageData = { fecha: new Date(), mensaje: message.message, usuario: this.userName };
    this.fireStoreService.sendMessage(messageData);
  }

}
