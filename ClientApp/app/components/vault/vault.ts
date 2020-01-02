export interface CreateRequest {
    recoveryKey: string;
    userKey: string;
}

export interface UpdateRequest {
    userKey: string;
    timeForSend: number;
    maximumValue: number;
}

export interface WithDrawRequest {
    toAddress: string;
    amount: number;
    userKey: string;
    code: string;
}

export interface VaultResponse {
    id: number;
    timeForSend: number;
    maximumValue?: number;
    walletAddress: string;
    balance: number;
}