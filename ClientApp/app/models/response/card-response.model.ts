interface Daily {
    currency: string;
    maximum: number;
}

export interface CardDetail {
    created: Date;
    updated: Date;
    id: string;
    object: string;
    active: boolean;
    address: string;
    balance: number;
    coin: string;
    countries: string[];
    daily: Daily;
    decryptKey: string;
    email: string;
    locked: boolean;
    name: string;
    retries: number;
    sdk: boolean;
    ticker: string;
}

export interface CategoryTransaction {
    name: string;
    code: string;
}

export interface CardTransaction {
    currency: string;
    zip: string;
    tx: string;
    ticker: string;
    nfc: boolean;
    country: string;
    name: string;
    city: string;
    date: Date;
    recipient: string;
    pair: string;
    id: string;
    partnerId?: any;
    rate: number;
    topUp: boolean;
    fee: number;
    feeCurrency: number;
    _object: string;
    total: number;
    created: Date;
    totalCurrency: number;
    coin: string;
    lastNumbers: string;
    updated: Date;
    number: string;
    amountCurrency: number;
    category: CategoryTransaction;
    amount: number;
    partner: boolean;
    type: string;
    street: string;
}