export const ContractStatus = {
    WaitingForSeller: 0,
    Executed: 1,
} as const;

export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus];