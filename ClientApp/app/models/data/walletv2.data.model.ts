export class WalletTransaction {
    hash: string;
    timestamp: Date;
    amount: number;
    direction: string;
    toAddress: string;
    isPending: boolean;
    isConfirmed: boolean;
    isNew: boolean;
    orderData: WalletOrderDataTransaction;
    static map(from: any) {
        let a = [];
        if (Array.isArray(from)) {
            for (let i = 0; i < from.length; i++) {
                let o = new WalletTransaction;
                o.amount = from[i].amount;
                o.direction = from[i].direction;
                o.toAddress = from[i].toAddress;
                o.hash = from[i].hash;
                o.timestamp = from[i].timestamp;
                o.isPending = from[i].isPending;
                o.isConfirmed = from[i].isConfirmed;
                o.isNew = from[i].isNew;
                o.orderData = from[i].orderData;
                a.push(o);
            }
        }
        return a;
    }
}

export interface WalletOrderDataTransaction {
    status: string;
    amoutSmart: number;
    createDate: Date;
    withdrawalDate: Date;
    depositDate: Date;
    destinationEmail?: any;
    phoneNumber: string;
    orderID: string;
    generatedAddress: string;
    txIdDeposit: string;
    txIdWithdrawal: string;
    addressForWithdrawal: string;
    addressRefunded: string;
    refundedDate?: any;
    txIdRefunded?: any;
    refundedReason?: any;
    amountSmartSent: number;
    amountSmartWithFee: number;
    typeSend: string;
    urlWithdrawal: string;
}

export class Wallet {
    walletId: number;
    displayName: string;
    address: string;
    key: string;
    qrCode: string;
    balance: number;
    totalSent: number;
    totalReceived: number;
    transactions: WalletTransaction[];
    isRewards: boolean;
    isVault: boolean;
    isScheduled: boolean;
    cardId: number;
    position: number;

    static map(from: any): Wallet[] {
        return this.mapArray(from);
    }
    static mapArray(from: any) {
        let a = []
        for (let i = 0; i < from.length; i++) a.push(this.mapObject(from[i]));
        return a;
    }

    static mapObject(from: any) {
        let r = new Wallet;
        r.walletId = from.walletId!;
        r.displayName = from.displayName!;
        r.address = from.address!;
        r.qrCode = from.qrCode!;
        r.balance = from.balance!;
        r.totalSent = from.totalSent!;
        r.totalReceived = from.totalReceived!;
        r.transactions = WalletTransaction.map(from.transactions);
        r.isRewards = from.isRewards!;
        r.isVault = from.isVault!;
        r.isScheduled = from.isScheduled!;
        r.cardId = from.cardId!;
        r.position = from.position!;
        r.key = from.key;
        return r;
    }
}