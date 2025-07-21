use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::{invoke_signed},
    program_error::ProgramError,
    program_pack::IsInitialized,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

// Data structs

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub enum ContractStatus {
    WaitingForSeller,
    Executed,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct PropertySaleContract {
    pub is_initialized: bool,
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub property: Pubkey,
    pub offer: Pubkey,
    pub status: ContractStatus,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Property {
    pub owner: Pubkey,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Offer {
    pub buyer: Pubkey,
    pub price: u64,
    pub expires_at: u64,
}

/*
    Entry point    
*/
entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = instruction_data
        .first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    match instruction {
        0 => initialize_contract(program_id, accounts, &instruction_data[1..]),
        1 => seller_sign_and_execute(program_id, accounts),
        _ => Err(ProgramError::InvalidInstructionData),
    }
}

/*
    Instruction 0: Buyer initializes contract
*/
fn initialize_contract(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let contract_account = next_account_info(accounts_iter)?;
    let payer = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    /*
        Deserialize input data
    */
    if data.len() != 96 {
        msg!("Invalid instruction data length for initialize_contract");
        return Err(ProgramError::InvalidInstructionData);
    }
    let buyer = Pubkey::new(&data[0..32]);
    let seller = Pubkey::new(&data[32..64]);
    let property = Pubkey::new(&data[64..96]);
    let offer = Pubkey::new(&data[96..128]);

    /*
        Check PDA ownership
    */
    if contract_account.owner != program_id {
        /*
            Create the PDA account with rent exemption and space
        */
        let rent = Rent::get()?;
        let size = 1 + 32 + 32 + 32 + 1; // approx size for PropertySaleContract struct
        let lamports = rent.minimum_balance(size);

        let seeds = &[
            b"contract",
            buyer.as_ref(),
            property.as_ref(),
        ];
        let (pda, bump) = Pubkey::find_program_address(seeds, program_id);

        if pda != *contract_account.key {
            msg!("Provided contract_account is not the PDA");
            return Err(ProgramError::InvalidAccountData);
        }

        let signer_seeds = &[
            b"contract",
            buyer.as_ref(),
            property.as_ref(),
            &[bump],
        ];

        // Create account
        invoke_signed(
            &system_instruction::create_account(
                payer.key,
                contract_account.key,
                lamports,
                size as u64,
                program_id,
            ),
            &[payer.clone(), contract_account.clone(), system_program.clone()],
            &[signer_seeds],
        )?;
    }

    // Initialize contract data
    let mut contract_data = PropertySaleContract {
        is_initialized: true,
        buyer,
        seller,
        property,
        offer,
        status: ContractStatus::WaitingForSeller,
    };

    contract_data.serialize(&mut &mut contract_account.data.borrow_mut()[..])?;

    msg!("Contract initialized by buyer");

    Ok(())
}

// Instruction 1: Seller signs and executes contract
fn seller_sign_and_execute(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let contract_account = next_account_info(accounts_iter)?;
    let seller_account = next_account_info(accounts_iter)?;
    let property_account = next_account_info(accounts_iter)?;

    // Check signer
    if !seller_account.is_signer {
        msg!("Seller must sign the transaction");
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Check ownership
    if contract_account.owner != program_id || property_account.owner != program_id {
        msg!("Accounts not owned by program");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Deserialize contract data
    let mut contract_data = PropertySaleContract::try_from_slice(&contract_account.data.borrow())?;

    // Validate contract
    if !contract_data.is_initialized {
        msg!("Contract is not initialized");
        return Err(ProgramError::UninitializedAccount);
    }
    if contract_data.status != ContractStatus::WaitingForSeller {
        msg!("Contract already executed");
        return Err(ProgramError::InvalidAccountData);
    }
    if contract_data.seller != *seller_account.key {
        msg!("Signer is not the seller");
        return Err(ProgramError::IllegalOwner);
    }
    if contract_data.property != *property_account.key {
        msg!("Property account does not match contract");
        return Err(ProgramError::InvalidAccountData);
    }

    // Deserialize property data
    let mut property_data = Property::try_from_slice(&property_account.data.borrow())?;

    // Check current owner is seller
    if property_data.owner != *seller_account.key {
        msg!("Seller is not current property owner");
        return Err(ProgramError::IllegalOwner);
    }

    // Transfer ownership
    property_data.owner = contract_data.buyer;

    // Save updated property data
    property_data.serialize(&mut &mut property_account.data.borrow_mut()[..])?;

    // Update contract status
    contract_data.status = ContractStatus::Executed;
    contract_data.serialize(&mut &mut contract_account.data.borrow_mut()[..])?;

    msg!("Ownership transferred and contract executed successfully");

    Ok(())
}
