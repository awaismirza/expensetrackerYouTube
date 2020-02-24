import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  addExpenseForm = new FormGroup({
    amount: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl('')
  });

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(): void {
    this.modalController.dismiss().then().catch();
  }
}
