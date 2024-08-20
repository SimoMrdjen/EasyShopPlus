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

  printConfirmation(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    

    if (printContents) {
    // const printWindow = window.open('', '', 'height=600,width=800');
     // if (printWindow) {
      window.document.write('<html><head><title></title>');
        // Include the CSS files
        const styles = Array.from(document.getElementsByTagName('./payment-confirmation.component.css'));
        styles.forEach(style => {
          window.document.write(style.outerHTML);
        });
        window.document.write('</head><body>');
        window.document.write(printContents);
        window.document.write('</body></html>');
        window.document.close();
        window.print();
//      document.body.innerHTML = printContents;
 //     window.print();
 //    document.body.innerHTML = originalContents;
    window.location.reload(); // To refresh the page after printing
    }
  }

  ngOnInit(): void {}
}
