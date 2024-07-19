import { Component, OnInit } from '@angular/core';
import InvoiceItem from '../models/invoice-item.model';
import { InvoiceService } from '../services/invoice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-invoice-review',
  templateUrl: './invoice-review.component.html',
  styleUrls: ['./invoice-review.component.css']
})
export class InvoiceReviewComponent implements OnInit{
  invoiceItems: InvoiceItem[] = [];
  customer: Customer = new Customer();
  discountGroup: number = 0;

  // Assuming you have a URL to your backend API
 // private apiUrl = 'https://your-backend-api.com/invoices';
  

  constructor(
    private invoiceService: InvoiceService,
    private http: HttpClient,
    private router: Router,
    private notification: NzNotificationService

  ) {
    this.invoiceItems = this.invoiceService.invoice.invoiceItems;
  }

  ngOnInit(): void {
    if (this.invoiceService.invoice && this.invoiceService.invoice.customer) {
      this.customer = this.invoiceService.invoice.customer;
    }
    if (this.invoiceService.invoice && this.invoiceService.invoice.discount) {
      this.discountGroup = this.invoiceService.invoice.discount;
    }
    console.log('Invoice :', this.invoiceService.invoice);
  }
  addItem(): void {
    // Navigate to the form entry page
    this.router.navigateByUrl('/entry').then(() => {
      // Assuming '/form-entry' is the route for the form where items can be added
      // You might need to implement a mechanism to wait for the user to finish adding items
      // This could be done through a service method or using a modal dialog with a callback
    });
  }
  // Function to remove a specific item from the invoice items list
    removeItem(item: InvoiceItem): void {
      // Filters out the item to be removed and updates the invoiceItems array
      this.invoiceItems = this.invoiceItems.filter(i => i !== item);
      // Logs a message to the console indicating the item has been removed and displays the current list of items
      console.log('Item removed. Current items:', this.invoiceItems);
    }

  // Inside your form entry component
  //addItemToInvoice(item: any): void {
    //this.invoiceService.invoice.invoiceItems.push(item);
    // Navigate back or close the form as needed
  //}
  
  printInvoice(): void {
      // This is a simple implementation. For a more complex scenario, you might need to format the invoice for printing.
      console.log("Printing invoice... Value of invoice: ", this.invoiceService.invoice);
      window.print();
    }

  saveInvoice(): void {
    // Assuming `item` contains all the necessary invoice data
    // and your API expects a POST request to save the invoice
    this.invoiceService.saveInvoice( this.invoiceService.invoice).subscribe({
      next: (response) => {
        console.log('Invoice saved successfully', response);
        this.notification.create(
          'success',
          'Uspesno snimljeno!',
          `Dokument je uspesno sacuvan!!`
        );    
        this.invoiceService.resetInvoice();
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Error saving invoice', error);
        
        this.notification.create('error', 'Greska!', `Dokument nije sacuvan!`);
        this.invoiceService.resetInvoice();
        this.router.navigateByUrl('/');
      }
    });
  }

}
