import { Customer } from "./customer.model";
import { Instalment } from "./instalment.model";

export class PurchaseContract {
    public id?: number;
    public customer?: Customer;
    public contractAmount?: number;
    public participation?: number;
    public contractDate?: Date;
    public installments?: Instalment[];
    public nextInstalmentDate?: Date;

}