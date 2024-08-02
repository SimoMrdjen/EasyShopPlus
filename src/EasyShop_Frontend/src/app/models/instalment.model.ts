import { PurchaseContract } from "./contract.model";

export class Instalment {
    public id?: number;
    public purchaseContractDto?: PurchaseContract;
    public installmentOrdinal?: string;
    public installmentAmount?: number;
    public paidAmount?: number;
    public maturityDate?: Date;
    public paymentDate?: Date;
    public paymentMethod?: string;
}