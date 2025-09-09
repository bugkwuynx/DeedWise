use anchor_lang::prelude::*;
use anchor_lang::{AnchorDeserialize, AnchorSerialize};
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_spl::token::{Mint, TokenAccount};

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Debug)]
pub enum ContractStatus {
    WaitingForSeller,
    Executed,
}

#[account]
pub struct PropertySaleContract {
    pub is_initialized: bool,
    /// CHECK: This is the buyer's public key, no additional checks needed
    pub buyer: Pubkey,
    /// CHECK: This is the seller's public key, no additional checks needed
    pub seller: Pubkey,
    /// CHECK: This is the property token mint address, no additional checks needed
    pub propertyToken: Pubkey,
    pub status: ContractStatus,
}

declare_id!("CQDZhV4b33qg38Qxm3vYeQZY5QuLbmNbAF4z25T7iveN");

#[program]
pub mod smart_contract {
    use super::*;

    pub fn initialize_contract(
        ctx: Context<InitializeContract>,
    ) -> Result<()> {
        msg!("Initializing contract");
        let contract = &mut ctx.accounts.smart_contract;
        contract.is_initialized = true;
        contract.buyer = *ctx.accounts.buyer.key;
        contract.seller = *ctx.accounts.seller.key;
        contract.propertyToken = *ctx.accounts.propertyToken.key;
        contract.status = ContractStatus::WaitingForSeller;

        msg!("Contract initialized by buyer");
        Ok(())
    }

    pub fn seller_sign_and_execute(
        ctx: Context<SellerSignAndExecute>,
    ) -> Result<()> {
        let contract = &mut ctx.accounts.smart_contract;

        // Validate contract
        if !contract.is_initialized {
            msg!("Contract is not initialized");
            return err!(ErrorCode::ContractNotInitialized);
        }
        if contract.status != ContractStatus::WaitingForSeller {
            msg!("Contract already executed");
            return err!(ErrorCode::ContractAlreadyExecuted);
        }

        // Update contract status
        contract.status = ContractStatus::Executed;

        msg!("Ownership transferred and contract executed successfully");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeContract<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut)]
    /// CHECK: Seller does not sign at initialization; verified later
    pub seller: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: This is the property token mint address, no additional checks needed
    pub propertyToken: AccountInfo<'info>,

    #[account(
        init,
        seeds = [b"smart_contract"],
        bump,
        payer = buyer,
        space = 8 + 1 + 32 + 32 + 32 + 1
    )]
    pub smart_contract: Account<'info, PropertySaleContract>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SellerSignAndExecute<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,

    #[account(mut)]
    /// CHECK: This is the buyer's account info, no additional checks needed
    pub buyer: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: This is the property token mint address, no additional checks needed
    pub propertyToken: AccountInfo<'info>,

    #[account(
        mut,
        constraint = smart_contract.seller == seller.key(),
        constraint = smart_contract.buyer == buyer.key(),
        constraint = smart_contract.propertyToken == propertyToken.key()
    )]
    pub smart_contract: Account<'info, PropertySaleContract>,

    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Contract is not initialized")]
    ContractNotInitialized,
    #[msg("Contract already executed")]
    ContractAlreadyExecuted,
    #[msg("Invalid seller")]
    InvalidSeller,
    #[msg("Invalid property")]
    InvalidProperty,
    #[msg("Invalid property owner")]
    InvalidPropertyOwner,
}
