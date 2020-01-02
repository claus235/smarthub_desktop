export class CurrentPrice {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    price_usd: string;
    price_btc: string;
    market_cap_usd: string;
    available_supply: string;
    total_supply: string;
    percent_change_1h: string;
    percent_change_24h: string;
    percent_change_7d: string;
    last_updated: string;

    static map(from: any): CurrentPrice {
        let to = new CurrentPrice();
        if (from !== undefined) {
            to.id = from.id!;
            to.name = from.name!;
            to.symbol = from.symbol!;
            to.rank = from.rank!;
            to.price_usd = from.price_usd!;
            to.price_btc = from.price_btc!;
            to.market_cap_usd = from.market_cap_usd!;
            to.available_supply = from.available_supply!;
            to.total_supply = from.total_supply!;
            to.percent_change_1h = from.percent_change_1h!;
            to.percent_change_24h = from.percent_change_24h!;
            to.percent_change_7d = from.percent_change_7d!;
            to.last_updated = from.last_updated!;
        }

        return to;
    }
}