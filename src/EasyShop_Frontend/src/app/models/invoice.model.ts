import { Customer } from "./customer.model";
import InvoiceItem from "./invoice-item.model";
import { User } from "./user.model";

export class Invoice {

    public id?: number;
    public customer?: Customer;
    public date?: Date;
    public user?: User;
    public invoiceItems: InvoiceItem[] = [];
    public discount: number = 0;
    public invoiceTotal: number = 0;
}
