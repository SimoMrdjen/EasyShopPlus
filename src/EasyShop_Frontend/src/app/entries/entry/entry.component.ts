import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { Customer } from 'src/app/models/customer.model';
import InvoiceItem from 'src/app/models/invoice-item.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  productForm!: FormGroup;
  products: Article[] = [];
  filteredProducts: Article[] = [];
  invoiceItem: InvoiceItem = new InvoiceItem;
  types: string[] = ['Haljina', 'Pantalone', 'Suknja', 'Košulja', 'Majica', 
    'Džemper', 'Jakna', 'Kaput', 'Cipele', 'Čarape', 'Donje rublje', 'Ostalo'];
  title: string = '';
  customer: Customer = new Customer();
  discountGroup: number = 0;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    let discountGroup = this.invoiceService.invoice.discount;
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      price: [{value: 0, disabled: false}, Validators.required],
      quantity: [1, [Validators.required, Validators.min(0)]],
      discount: [discountGroup, [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
    });
  }

  /*
  ngOnInit(): void {
    this.subscribeToProducts();
    this.subscribeToProductSelection();
  }
  
  subscribeToProducts(): void {
    this.invoiceService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = products.slice();
      // Update the price if a product is already selected
      const selectedProductId = this.productForm.get('product')!.value.id;
      if (selectedProductId) {
        const selectedProduct = this.products.find(product => product.id === selectedProductId);
        if (selectedProduct) {
          this.productForm.get('price')!.setValue(selectedProduct.price, {emitEvent: false});
        }
      }
    });
  }
  
  subscribeToProductSelection(): void {
    this.productForm.get('product')!.valueChanges.subscribe(productId => {
      // This ensures the price is updated not only on selection but also if the selected product's price changes
      this.subscribeToProducts();
    });
  }
    */
// /*

  ngOnInit(): void {
    this.title = this.invoiceService.invoice.customer?.company || 'Kupac nije odabran';
    this.discountGroup = this.invoiceService.invoice.discount;

    this.invoiceService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = products.slice();
    });
  
    this.productForm.get('product')!.valueChanges.subscribe(productId => {
      console.log('Product changed valu of grbed is:', productId);
      const selectedProduct = this.products.find(product => product.id === productId);
      if (selectedProduct) {
        this.productForm.get('price')!.setValue(selectedProduct.price, {emitEvent: false});
      }
    });
  }
  // */
  
  onSubmit() {
    if (this.productForm && this.productForm.get('price')) {
      const newInvoiceItem = new InvoiceItem();
      newInvoiceItem.price = this.productForm.get('price')!.value;
      newInvoiceItem.quantity = this.productForm.get('quantity')!.value;
      newInvoiceItem.id = this.productForm.get('product')!.value;

      newInvoiceItem.product = this.products.find(product => product.id === newInvoiceItem.id)?.code || '';

      newInvoiceItem.discount = this.productForm.get('discount')!.value;
      newInvoiceItem.articleType = this.productForm.get('type')!.value;
      if (newInvoiceItem.price && newInvoiceItem.quantity) {
        newInvoiceItem.total = newInvoiceItem.price * newInvoiceItem.quantity * (1 - newInvoiceItem.discount / 100);
      } else {
        newInvoiceItem.total = 0;
      }

      // Add to the invoice
      this.invoiceService.invoice.invoiceItems.push(newInvoiceItem);
      console.log(this.invoiceService.invoice);

      // Reset form for a new entry
      this.productForm.reset({
        product: '',
        price: 0,
        quantity: 1,
        discount: this.invoiceService.invoice.discount,
        type: ''
      });
    } else {
      console.error('Form or form control not initialized');
    }
  }
  
  getAddedProducts() {
    this.router.navigate(['/invoice-review']).then(() => {
      console.log("Navigation to entry page completed");
    });
  }

  searchProducts(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.code?.toLowerCase().includes(value));
  }
}
