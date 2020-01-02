export class VoteRequest {
    public fromAddress: string;
    public vote: string = 'Abstain';
    public message: string;
    public userKey: string;
    public proposalId: string;
    public voteIP: string = '127.0.0.1';
    public voteType: string = 'Abstain';
}