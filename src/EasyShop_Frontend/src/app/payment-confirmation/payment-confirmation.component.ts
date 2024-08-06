import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instalment } from '../models/instalment.model';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  instalment: Instalment | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.instalment = navigation.extras.state['instalment'];
    }
  }

  ngOnInit(): void {}
}
