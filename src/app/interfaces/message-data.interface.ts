import { Timestamp } from "@angular/fire/firestore";

export interface MessageData {
    usuario: string;
    mensaje: string;
    fecha: Date;
}