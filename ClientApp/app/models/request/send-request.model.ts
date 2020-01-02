export class SendRequest {
    public email: string = null!;
    public fromAddress: string = null!;
    public toAddress: string = null!;
    public amount: any = 0!;
    public password: string = null!;
    public code: string = null!;
    public destinationEmail: string = "";
    public phoneNumber: string = "";
    public startDate: string = "";
    public endDate: string = "";
    public transactionDate: string = "";
    public recurrenceType: number = 3;
    public recurringLabel: string = "";
}