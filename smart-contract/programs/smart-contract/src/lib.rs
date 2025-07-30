use anchor_lang::prelude::*;
use anchor_lang::{AnchorDeserialize, AnchorSerialize};
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::program::invoke_signed;

// Data structs

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Debug)]
pub enum ContractStatus {
    WaitingForSeller,
    Executed,
}

#[account]
pub struct PropertySaleContract {
    pub is_initialized: bool,
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub property: Pubkey,
    pub status: ContractStatus,
}

#[account]
pub struct Property {
    pub owner: Pubkey,
    pub property_id: u64,
}

declare_id!("CQDZhV4b33qg38Qxm3vYeQZY5QuLbmNbAF4z25T7iveN");

#[program]
pub mod smart_contract {
    use super::*;

    pub fn initialize_contract(
        ctx: Context<InitializeContract>,
        buyer: Pubkey,
        seller: Pubkey,
        property: Pubkey,
        offer: Pubkey,
    ) -> Result<()> {
        msg!("Initializing contract");
        let contract = &mut ctx.accounts.smart_contract;
        contract.is_initialized = true;
        contract.buyer = buyer;
        contract.seller = seller;
        contract.property = property;
        contract.offer = offer;
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
        if contract.seller != ctx.accounts.seller.key() {
            msg!("Signer is not the seller");
            return err!(ErrorCode::InvalidSeller);
        }
        if contract.property != ctx.accounts.property.key() {
            msg!("Property account does not match contract");
            return err!(ErrorCode::InvalidProperty);
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

    #[account(
        init,
        payer = buyer,
        space = 8 + 1 + 32 + 32 + 32 + 32 + 1,
        seeds = [b"contract", buyer.key().as_ref()],
        bump
    )]
    pub smart_contract: Account<'info, PropertySaleContract>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SellerSignAndExecute<'info> {
    #[account(
        mut,
        seeds = [b"contract", smart_contract.buyer.key().as_ref()],
        bump,
        constraint = smart_contract.status == ContractStatus::WaitingForSeller
    )]
    pub smart_contract: Account<'info, PropertySaleContract>,

    #[account(
        mut,
        seeds = [
            b"property",
            smart_contract.seller.key().as_ref(),
            property_id.to_le_bytes().as_ref(),
        ],
        bump = smart_contract.bump,
    )]
    pub property: Account<'info, Property>,

    #[account(mut)]
    pub seller: Signer<'info>,

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
