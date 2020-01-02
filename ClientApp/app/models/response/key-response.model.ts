export class RecoveryKey {
    recoveryKey: string;
    termsVersion: string;
    termsText: string;

    static map(from: any): RecoveryKey {
        let r = new RecoveryKey;
        r.recoveryKey = from.recoveryKey!;
        r.termsText = from.termsText;
        r.termsVersion = from.termsVersion!;
        return r;
    }
}