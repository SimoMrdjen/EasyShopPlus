import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseContract } from '../models/contract.model';
declare var jsPDF: any;
declare var html2canvas: any;

@Component({
  selector: 'app-contract-print',
  templateUrl: './contract-print.component.html',
  styleUrls: ['./contract-print.component.css']
})
export class ContractPrintComponent implements OnInit {
  public contract?: PurchaseContract;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.contract = navigation.extras.state['contract'];
    }
  }

  ngOnInit(): void {}
/*
  printContract(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) 
    {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Contract</title>');
        // Include the CSS files
        const styles = Array.from(document.getElementsByTagName('link'));
        styles.forEach(style => {
          printWindow.document.write(style.outerHTML);
        });
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  }
*/
  printContract(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    

    if (printContents) {
    // const printWindow = window.open('', '', 'height=600,width=800');
     // if (printWindow) {
      window.document.write('<html><head><title></title>');
        // Include the CSS files
        const styles = Array.from(document.getElementsByTagName('link'));
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


    generatePDF(): void {
      const data = document.getElementById('print-section');
      if (data) {
        html2canvas(data).then((canvas: HTMLCanvasElement) => {
          const imgWidth = 208;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          pdf.save('contract.pdf');
        });
      }
    }
}
