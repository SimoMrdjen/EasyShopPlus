import { PurchaseContract } from "./contract.model";

export class Instalment {
    public id?: number;
    public purchaseContract?: PurchaseContract;
    public installmentOrdinal?: number;
    public installmentAmount?: number;
    public paidAmount?: number;
    public maturityDate?: Date;
    public paymentDate?: Date;
    public paymentMethod?: string;
}