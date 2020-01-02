import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ProposalStatus'
})
export class ProposalStatusPipe implements PipeTransform {
    transform(value: any, status: any): any {
        return value.filter((proposal: any) => {
            return proposal.status == status;
        });
    }
}