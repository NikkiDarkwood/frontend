export interface Customer {
    id: number;
    name: string;
    awsAccountId: string;
    awsRootEmail: string;
    awsAccountType: 'Organization' | 'Standalone';
    awsServices: string[];
    onboardDate: string;
    offboardDate: string;
}
