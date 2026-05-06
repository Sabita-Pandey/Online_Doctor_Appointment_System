import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  paymentMode: string = '';
  amount: number = 0;
  patientName: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // URL se data nikaalna
    this.route.queryParams.subscribe(params => {
      this.paymentMode = params['mode'];
      this.amount = params['amount'];
      this.patientName = params['patient'];
    });
  }

  completePayment() {
    alert("Payment Successful! Your appointment is confirmed.");
    this.router.navigate(['/booked']);
  }

  cancel() {
    this.router.navigate(['/booking']);
  }
}
