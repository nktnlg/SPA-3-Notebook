import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output('closeModal') closeModal: EventEmitter<any> = new EventEmitter;
  @Output('deleteNote') deleteNote: EventEmitter<any> = new EventEmitter;



}
