export class CardCreateRequest {
    public active: boolean = true;
    public pin: any;
    public name: string = '';
    public email: string = '';
    public daily: DailyCard = new DailyCard;
    public countries: string[] = [];
}

class DailyCard {
    public currency: string = '';
    public maximum: number = 500;
}