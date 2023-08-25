import { Schema, model, Types } from 'mongoose';

export interface IBranch extends Document {
    branchName: string;
    email: string;
    contactNumber: string;
    address: string;
    store: Types.ObjectId;
    storeId: number;
    user: Types.ObjectId[];
    transaction: Types.ObjectId[];
    rawGrocery: Types.ObjectId[];
    branchItem: Types.ObjectId[];
    rawCategory: Types.ObjectId[];
    transactionItem: Types.ObjectId[];
    inventoryLogs: Types.ObjectId[];
    createdAt: Date;
}

export const BranchSchema = new Schema<IBranch>({
    branchName: String,
    email: String,
    contactNumber: String,
    address: String,
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    storeId: Number,
    user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    transaction: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    rawGrocery: [{ type: Schema.Types.ObjectId, ref: 'RawGrocery' }],
    branchItem: [{ type: Schema.Types.ObjectId, ref: 'BranchItem' }],
    rawCategory: [{ type: Schema.Types.ObjectId, ref: 'RawCategory' }],
    transactionItem: [{ type: Schema.Types.ObjectId, ref: 'TransactionItem' }],
    inventoryLogs: [{ type: Schema.Types.ObjectId, ref: 'InventoryLogs' }],
    createdAt: { type: Date, default: Date.now },
});

export const BranchModel = model('Branch', BranchSchema);