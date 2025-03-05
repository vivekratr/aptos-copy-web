module addr::CopyTradingV8{
    use std::signer;
    use std::vector;
    // Remove unused imports
    use aptos_std::debug;
    use aptos_std::table;
    // Add coin imports
    use aptos_framework::coin::Self;
    use aptos_framework::aptos_coin::AptosCoin;
    // Add resource account imports
    use aptos_framework::account;
    // use aptos_framework::resource_account;
    use std::error;
    // use aptos_framework::guid;
    
    // Supported tokens
    const APT: u64 = 1;
    const GARI: u64 = 2;
    const ETH: u64 = 3;
    const USDT: u64 = 4;
    // Error codes
    const EPORTFOLIO_ALREADY_EXISTS: u64 = 1;
    const EPORTFOLIO_DOES_NOT_EXIST: u64 = 2;
    const EINSUFFICIENT_BALANCE: u64 = 3;
    const EINVALID_TRADER: u64 = 4;
    const EINVALID_TOKEN: u64 = 5;
    const EUNAUTHORIZED: u64 = 6;
    const ERESOURCE_ACCOUNT_NOT_INITIALIZED: u64 = 7;
    const EPAUSED: u64 = 8; // Add missing error code for paused state
    const EALREADY_EXISTS: u64 = 9;
    
    // Add event module import
    use aptos_framework::event;
    
    // Define event structs
    struct TradeEvent has drop, store {
        trader: address,
        token_in: u64,
        token_out: u64,
        amount_in: u64,
        amount_out: u64,
        timestamp: u64,
    }
    
    struct DepositEvent has drop, store {
        user: address,
        token_type: u64,
        amount: u64,
    }
    
    struct WithdrawEvent has drop, store {
        user: address,
        token_type: u64,
        amount: u64,
    }
    
    // Add event handles to store
    struct EventStore has key {
        trade_events: event::EventHandle<TradeEvent>,
        deposit_events: event::EventHandle<DepositEvent>,
        withdraw_events: event::EventHandle<WithdrawEvent>,
    }
   
    // Admin role for privileged operations
    struct AdminCapability has key {
        admin: address
    }
    
    // Add pause control struct definition
    struct PauseControl has key {
        paused: bool
    }
    // Initialize pause control
   public entry fun initialize_pause_control(account: &signer) {
    assert!(signer::address_of(account) == @CopyTrading, error::permission_denied(EUNAUTHORIZED));
    assert!(!exists<PauseControl>(@CopyTrading), error::already_exists(EUNAUTHORIZED));
    move_to(account, PauseControl { paused: false });
}
    // Pause/unpause functions
    public  entry fun pause(account: &signer) acquires AdminCapability, PauseControl {
        let account_addr = signer::address_of(account);
        assert_is_admin(account_addr);
        
        let pause_control = borrow_global_mut<PauseControl>(@CopyTrading);
        pause_control.paused = true;
    }
    
    public  entry fun unpause(account: &signer) acquires AdminCapability, PauseControl {
        let account_addr = signer::address_of(account);
        assert_is_admin(account_addr);
        
        let pause_control = borrow_global_mut<PauseControl>(@CopyTrading);
        pause_control.paused = false;
    }
    
    // Add pause check to critical functions
    fun assert_not_paused() acquires PauseControl {
        assert!(!borrow_global<PauseControl>(@CopyTrading).paused, error::invalid_state(EPAUSED));
    }
    // Initialize admin capability
   public entry fun initialize_admin(account: &signer) {
    assert!(signer::address_of(account) == @CopyTrading, error::permission_denied(EUNAUTHORIZED));
    assert!(!exists<AdminCapability>(@CopyTrading), error::already_exists(EUNAUTHORIZED));
    move_to(account, AdminCapability { admin: signer::address_of(account) });
}
    // Check if caller is admin
    fun assert_is_admin(account_addr: address) acquires AdminCapability {
        assert!(
            exists<AdminCapability>(@CopyTrading) && 
            borrow_global<AdminCapability>(@CopyTrading).admin == account_addr,
            error::permission_denied(EUNAUTHORIZED)
        );
    }
    // Resource account signer capability - remove the copy ability
    struct SignerCapability has key {
        cap: account::SignerCapability
    }
    // Struct to represent a trader's profile
    struct TraderProfile has key, store {
        address: address,
        win_rate: u64, // Win rate in percentage (e.g., 70 for 70%)
        total_profits: u64, // Total profits in APT
        total_trades: u64, // Total number of trades executed
    }
    // Struct to represent a user's trading preferences
    struct TradingPreferences has key, store {
        user: address,
        trade_size: u64, // Trade size in APT
        risk_limit: u64, // Risk limit in percentage (e.g., 10 for 10%)
        stop_loss: u64, // Stop-loss in percentage (e.g., 5 for 5%)
        copied_trader: address, // Address of the trader being copied
    }
    // Struct to represent a trade
    struct Trade has key, store, drop, copy {
        trader: address, // Address of the trader
        token_in: u64, // Token to trade from (e.g., APT)
        token_out: u64, // Token to trade to (e.g., GARI)
        amount_in: u64, // Amount of token_in
        amount_out: u64, // Amount of token_out
        timestamp: u64, // Timestamp of the trade
        status: u64, // 0: pending, 1: executed, 2: cancelled
    }
    // Struct to represent a user's portfolio
    struct Portfolio has key, store {
        user: address,
        apt_balance: u64,
        gari_balance: u64,
        eth_balance: u64,
        usdt_balance: u64,
        total_profit: u64, // Total profit in APT
        total_loss: u64, // Total loss in APT
    }
    // Global storage for trader profiles
    struct TraderProfiles has key {
        profiles: table::Table<address, TraderProfile>,
    }
    // Global storage for user preferences
    struct UserPreferences has key {
        preferences: table::Table<address, TradingPreferences>,
    }
    // Global storage for trades
    struct Trades has key {
        trades: vector<Trade>,
    }

    struct TraderAddresses has key {
    addresses: vector<address>
}
    // Global storage for portfolios
    struct Portfolios has key {
        portfolios: table::Table<address, Portfolio>,
    }
    // Mock price storage for tokens (APT, GARI, ETH, USDT)
    // Update the TokenPrices struct to store USD prices
    struct TokenPrices has key {
        apt_usd_price: u64,    // APT price in USD (x100 for precision)
        gari_usd_price: u64,   // GARI price in USD (x100 for precision)
        eth_usd_price: u64,    // ETH price in USD (x100 for precision)
        usdt_usd_price: u64    // USDT price in USD (always 100 for $1.00)
    }
    // Initialize global storage with resource account
    // Initialize global storage with resource account
    public entry fun initialize(account: &signer) {
        assert!(signer::address_of(account) == @CopyTrading, error::permission_denied(EUNAUTHORIZED));
        // Check if already initialized - don't proceed if it is
        if (exists<SignerCapability>(@CopyTrading)) {
            return
        };
    
        // Create resource account
        let (resource_signer, signer_cap) = account::create_resource_account(account, vector::empty());
        
        // Register the resource account for AptosCoin
        if (!coin::is_account_registered<AptosCoin>(signer::address_of(&resource_signer))) {
            coin::register<AptosCoin>(&resource_signer);
        };
        
        // Store signer capability
        move_to(account, SignerCapability { cap: signer_cap });
        
        // Initialize global storage
        move_to(account, TraderProfiles { profiles: table::new() });
        move_to(account, UserPreferences { preferences: table::new() });
        move_to(account, Trades { trades: vector::empty() });
        move_to(account, Portfolios { portfolios: table::new() });
        move_to(account, TokenPrices { 
            apt_usd_price: 100, 
            gari_usd_price: 10, 
            eth_usd_price: 2000, 
            usdt_usd_price: 1 
        });
        move_to(account, TraderAddresses { addresses: vector::empty() });
        
        // Initialize admin capability
        move_to(account, AdminCapability { admin: signer::address_of(account) });
        
        // Initialize pause control
        move_to(account, PauseControl { paused: false });
        
        // Initialize event store
        move_to(account, EventStore {
            trade_events: account::new_event_handle<TradeEvent>(account),
            deposit_events: account::new_event_handle<DepositEvent>(account),
            withdraw_events: account::new_event_handle<WithdrawEvent>(account)
        });
    }
    // Add test-only imports at module level
#[test_only]
use aptos_framework::aptos_coin;
#[test_only]
use aptos_framework::coin::{MintCapability, BurnCapability};
#[test_only]
use aptos_framework::account::create_account_for_test;
#[test_only]
struct TestTokens has key {
    mint_cap: MintCapability<aptos_coin::AptosCoin>,
    burn_cap: BurnCapability<aptos_coin::AptosCoin>
}
    // Function to deposit APT into portfolio
    public entry fun deposit_apt(account: &signer, amount: u64) acquires Portfolios,SignerCapability {
        let user_addr = signer::address_of(account);
        let coins = coin::withdraw<AptosCoin>(account, amount);
        let deposit_amount = coin::value(&coins);
        
        // Get resource account signer and deposit coins
        let resource_signer = get_resource_account();
        let resource_addr = signer::address_of(&resource_signer);
        
        // Make sure resource account is registered for AptosCoin
        if (!coin::is_account_registered<AptosCoin>(resource_addr)) {
            coin::register<AptosCoin>(&resource_signer);
        };
        
        coin::deposit(resource_addr, coins);
        
        // Update portfolio
        let portfolios = &mut borrow_global_mut<Portfolios>(@CopyTrading).portfolios;
        
        if (!table::contains(portfolios, user_addr)) {
            let new_portfolio = Portfolio {
                user: user_addr,
                apt_balance: deposit_amount,
                gari_balance: 0,
                eth_balance: 0,
                usdt_balance: 0,
                total_profit: 0,
                total_loss: 0,
            };
            table::add(portfolios, user_addr, new_portfolio);
        } else {
            let portfolio = table::borrow_mut(portfolios, user_addr);
            portfolio.apt_balance = portfolio.apt_balance + deposit_amount;
        };
    }
    // Generic withdraw function for any supported token
    public entry fun withdraw_token<CoinType>(
        account: &signer,
        amount: u64,
        token_type: u64
    ) acquires Portfolios, SignerCapability,TokenPrices {
        let user_addr = signer::address_of(account);
        let portfolios = &mut borrow_global_mut<Portfolios>(@CopyTrading).portfolios;
        assert!(table::contains(portfolios, user_addr), error::not_found(EPORTFOLIO_DOES_NOT_EXIST));
        
        let portfolio = table::borrow_mut(portfolios, user_addr);
        
        // Check balance and reduce it
        if (token_type == GARI) {
            assert!(portfolio.gari_balance >= amount, error::invalid_state(EINSUFFICIENT_BALANCE));
            portfolio.gari_balance = portfolio.gari_balance - amount;
        } else if (token_type == ETH) {
            assert!(portfolio.eth_balance >= amount, error::invalid_state(EINSUFFICIENT_BALANCE));
            portfolio.eth_balance = portfolio.eth_balance - amount;
        } else if (token_type == USDT) {
            assert!(portfolio.usdt_balance >= amount, error::invalid_state(EINSUFFICIENT_BALANCE));
            portfolio.usdt_balance = portfolio.usdt_balance - amount;
        };
        
        // Calculate APT amount based on token prices - updated to use USD price fields
        let token_prices = borrow_global<TokenPrices>(@CopyTrading);
        let apt_price = token_prices.apt_usd_price;
        let token_price = if (token_type == GARI) token_prices.gari_usd_price
                 else if (token_type == ETH) token_prices.eth_usd_price
                 else token_prices.usdt_usd_price;
        
        let apt_amount = (amount * token_price) / apt_price;
        
        // Transfer APT from resource account to user
        let resource_signer = get_resource_account();
        let apt_coins = coin::withdraw<AptosCoin>(&resource_signer, apt_amount);
        
        // Make sure user is registered for AptosCoin
        if (!coin::is_account_registered<AptosCoin>(user_addr)) {
            coin::register<AptosCoin>(account);
        };
        
        coin::deposit(user_addr, apt_coins);
        
        // Update portfolio
        portfolio.apt_balance = portfolio.apt_balance + apt_amount;
    }
    // Generic withdraw function for any supported token
    // ...

    // Add trader profile
   public entry fun add_trader_profile(
    account: &signer, 
    trader_address: address, 
    win_rate: u64, 
    total_profits: u64, 
    total_trades: u64
) acquires TraderProfiles, AdminCapability, TraderAddresses {
    let account_addr = signer::address_of(account);
    assert_is_admin(account_addr);
    
    // Add trader profile
    let profiles = &mut borrow_global_mut<TraderProfiles>(@CopyTrading).profiles;
    table::add(profiles, trader_address, TraderProfile {
        address: trader_address,
        win_rate,
        total_profits,
        total_trades,
    });
    
    // Add trader address to the list
    let trader_addresses = &mut borrow_global_mut<TraderAddresses>(@CopyTrading).addresses;
    if (!vector::contains(trader_addresses, &trader_address)) {
        vector::push_back(trader_addresses, trader_address);
    };
}
    // Set user trading preferences
    public entry  fun set_trading_preferences(account: &signer, trade_size: u64, risk_limit: u64, stop_loss: u64, copied_trader: address) 
        acquires UserPreferences {
        let user_addr = signer::address_of(account);
        let preferences = &mut borrow_global_mut<UserPreferences>(@CopyTrading).preferences;
        table::add(preferences, user_addr, TradingPreferences {
            user: user_addr,
            trade_size,
            risk_limit,
            stop_loss,
            copied_trader,
        });
    }
    // Record a trade made by a trader
    public entry  fun record_trade(account: &signer, token_in: u64, token_out: u64, amount_in: u64, amount_out: u64, timestamp: u64) 
        acquires Trades {
        let trades = &mut borrow_global_mut<Trades>(@CopyTrading).trades;
        vector::push_back(trades, Trade {
            trader: signer::address_of(account),
            token_in,
            token_out,
            amount_in,
            amount_out,
            timestamp,
            status: 1, // Add the status field (1 = executed)
        });
    }
    // Copy a trade for a user
    // Modified copy_trade function to accept individual parameters
 public entry fun copy_trade(
    _account: &signer,
    user_address: address,
    trader_address: address,
    token_in: u64,
    token_out: u64,
    amount_in: u64,
    amount_out: u64,
    timestamp: u64
) acquires Portfolios, UserPreferences, TokenPrices {
    // Get portfolio directly in this function instead of using a helper
    let portfolios = &mut borrow_global_mut<Portfolios>(@CopyTrading).portfolios;
    let user_portfolio = table::borrow_mut(portfolios, user_address);

    // Create trade struct from parameters
    let trade = Trade {
        trader: trader_address,
        token_in,
        token_out,
        amount_in,
        amount_out,
        timestamp,
        status: 1, // Executed status
    };

    // Calculate profit/loss based on mock prices
    let profit = calculate_profit(&trade);

    // Update user portfolio
    update_portfolio(user_portfolio, trade, profit);

    // Check stop-loss
    if (user_portfolio.total_loss > get_user_risk_limit(user_address)) {
        debug::print(&b"Stop-loss triggered: Stopping copy trading for user");
        return;
    };

    // Correct usage of debug::print
    debug::print(&b"Trade copied successfully");
}
    // Helper function to calculate profit/loss
  fun calculate_profit(trade: &Trade): u64 acquires TokenPrices {
    let token_in_price = get_token_price(trade.token_in);
    let token_out_price = get_token_price(trade.token_out);
    (trade.amount_out * token_out_price) - (trade.amount_in * token_in_price)
}
    // Helper function to get token price

   #[view]
public fun get_token_price(token: u64): u64 acquires TokenPrices {
    let token_prices = borrow_global<TokenPrices>(@CopyTrading);
    if (token == APT) token_prices.apt_usd_price
    else if (token == GARI) token_prices.gari_usd_price
    else if (token == ETH) token_prices.eth_usd_price
    else token_prices.usdt_usd_price
}
    // Helper function to update user portfolio
    fun update_portfolio(portfolio: &mut Portfolio, trade: Trade, profit: u64) {
        if (profit > 0) {
            portfolio.total_profit = portfolio.total_profit + profit;
        } else {
            portfolio.total_loss = portfolio.total_loss - profit;
        };
        // Update token balances (mock implementation)
        if (trade.token_out == APT) {
            portfolio.apt_balance = portfolio.apt_balance + trade.amount_out;
        }
        else if (trade.token_out == GARI) {
            portfolio.gari_balance = portfolio.gari_balance + trade.amount_out;
        }
        else if (trade.token_out == ETH) {
            portfolio.eth_balance = portfolio.eth_balance + trade.amount_out;
        }
        else {
            portfolio.usdt_balance = portfolio.usdt_balance + trade.amount_out;
        };
    }
    // Initialize a user's portfolio
   public entry fun initialize_portfolio(account: &signer, initial_apt_balance: u64) acquires Portfolios {
        let user_addr = signer::address_of(account);
        assert!(exists<Portfolios>(@CopyTrading), error::not_found(ERESOURCE_ACCOUNT_NOT_INITIALIZED));
        let portfolios = &mut borrow_global_mut<Portfolios>(@CopyTrading).portfolios;
        
        // Check if portfolio already exists
        assert!(!table::contains(portfolios, user_addr), error::already_exists(EPORTFOLIO_ALREADY_EXISTS));
        
        table::add(portfolios, user_addr, Portfolio {
            user: user_addr,
            apt_balance: initial_apt_balance,
            gari_balance: 0,
            eth_balance: 0,
            usdt_balance: 0,
            total_profit: 0,
            total_loss: 0,
        });
    }
  


 


    // Get user's portfolio balances
    #[view]
    public fun get_portfolio_balances(user_addr: address): (u64, u64, u64, u64) acquires Portfolios {
        let portfolios = &borrow_global<Portfolios>(@CopyTrading).portfolios;
        if (table::contains(portfolios, user_addr)) {
            let portfolio = table::borrow(portfolios, user_addr);
            (
                portfolio.apt_balance,
                portfolio.gari_balance,
                portfolio.eth_balance,
                portfolio.usdt_balance
            )
        } else {
            (0, 0, 0, 0)
        }
    }
    // Get user's profit/loss statistics
    #[view]
    public fun get_portfolio_stats(user_addr: address): (u64, u64) acquires Portfolios {
        let portfolios = &borrow_global<Portfolios>(@CopyTrading).portfolios;
        if (table::contains(portfolios, user_addr)) {
            let portfolio = table::borrow(portfolios, user_addr);
            (portfolio.total_profit, portfolio.total_loss)
        } else {
            (0, 0)
        }
    }
    // Get all token prices
    #[view]
    public fun get_all_token_prices(): (u64, u64, u64, u64) acquires TokenPrices {
        let prices = borrow_global<TokenPrices>(@CopyTrading);
        (
            prices.apt_usd_price,
            prices.gari_usd_price,
            prices.eth_usd_price,
            prices.usdt_usd_price
        )
    }
    // Get trader profile information
    #[view]
    public fun get_trader_profile(trader_addr: address): (u64, u64, u64) acquires TraderProfiles {
        let profiles = &borrow_global<TraderProfiles>(@CopyTrading).profiles;
        if (table::contains(profiles, trader_addr)) {
            let profile = table::borrow(profiles, trader_addr);
            (
                profile.win_rate,
                profile.total_profits,
                profile.total_trades
            )
        } else {
            (0, 0, 0)
        }
    }
    // Get user's trading preferences
    #[view]
    public fun get_trading_preferences(user_addr: address): (u64, u64, u64, address) acquires UserPreferences {
        let preferences = &borrow_global<UserPreferences>(@CopyTrading).preferences;
        if (table::contains(preferences, user_addr)) {
            let pref = table::borrow(preferences, user_addr);
            (
                pref.trade_size,
                pref.risk_limit,
                pref.stop_loss,
                pref.copied_trader
            )
        } else {
            (0, 0, 0, @0x0)
        }
    }
    // Check if trading is paused
    #[view]
    public fun is_trading_paused(): bool acquires PauseControl {
        borrow_global<PauseControl>(@CopyTrading).paused
    }
  
    // Withdraw funds (convert to APT and withdraw)
    public  entry  fun withdraw_funds(
        account: &signer,
        amount: u64
    ) acquires Portfolios, SignerCapability {
        let user_addr = signer::address_of(account);
        let portfolios = &mut borrow_global_mut<Portfolios>(@CopyTrading).portfolios;
        assert!(table::contains(portfolios, user_addr), error::not_found(EPORTFOLIO_DOES_NOT_EXIST));
        
        let portfolio = table::borrow_mut(portfolios, user_addr);
        assert!(portfolio.apt_balance >= amount, error::invalid_state(EINSUFFICIENT_BALANCE));
        
        // Reduce APT balance
        portfolio.apt_balance = portfolio.apt_balance - amount;
        
        // Transfer APT from resource account to user's wallet
        let resource_signer = get_resource_account();
        let coins = coin::withdraw<AptosCoin>(&resource_signer, amount);
        coin::deposit(user_addr, coins);
    }
    // Enhance get_top_traders to provide actual leaderboard functionality
    #[view]
public   fun get_top_traders(limit: u64): vector<address> acquires TraderProfiles , TraderAddresses {
    let profiles_map = &borrow_global<TraderProfiles>(@CopyTrading).profiles;
    let result = vector::empty<address>();
    let all_traders = vector::empty<address>();
    
    // Get all trader addresses from the TraderProfiles resource
    // In Aptos, we need to use a separate function or stored vector to track keys
    // since table::iterate and table::keys are not available
    let trader_addresses = get_all_trader_addresses();
    
    let len = vector::length(&trader_addresses);
    let i = 0;
    while (i < len) {
        let trader_addr = *vector::borrow(&trader_addresses, i);
        if (table::contains(profiles_map, trader_addr)) {
            vector::push_back(&mut all_traders, trader_addr);
        };
        i = i + 1;
    };
    
    // Create a simple ranking based on win rate and profits
    i = 0;
    let traders_len = vector::length(&all_traders);
    while (i < traders_len) {
        let j = 0;
        while (j < traders_len - i - 1) {
            let addr1 = *vector::borrow(&all_traders, j);
            let addr2 = *vector::borrow(&all_traders, j + 1);
            let trader1 = table::borrow(profiles_map, addr1);
            let trader2 = table::borrow(profiles_map, addr2);
            
            // Simple ranking: win_rate * total_profits
            let score1 = trader1.win_rate * trader1.total_profits;
            let score2 = trader2.win_rate * trader2.total_profits;
            
            if (score1 < score2) {
                vector::swap(&mut all_traders, j, j + 1);
            };
            j = j + 1;
        };
        i = i + 1;
    };
    
    // Take top 'limit' traders
    i = 0;
    traders_len = vector::length(&all_traders);
    while (i < traders_len && i < limit) {
        vector::push_back(&mut result, *vector::borrow(&all_traders, i));
        i = i + 1;
    };
    
    result
}

fun calculate_token_conversion(
    amount_in: u64,
    token_in: u64,
    token_out: u64
):u64 acquires TokenPrices {
    let prices = borrow_global<TokenPrices>(@CopyTrading);
    
    // Get USD values
    let token_in_usd_price = if (token_in == APT) prices.apt_usd_price
                            else if (token_in == GARI) prices.gari_usd_price
                            else if (token_in == ETH) prices.eth_usd_price
                            else prices.usdt_usd_price;
                            
    let token_out_usd_price = if (token_out == APT) prices.apt_usd_price
                             else if (token_out == GARI) prices.gari_usd_price
                             else if (token_out == ETH) prices.eth_usd_price
                             else prices.usdt_usd_price;
    
    // Calculate conversion and return the result
    (amount_in * token_in_usd_price) / token_out_usd_price
}
    // Helper function to get user risk limit
#[view]
public fun get_user_risk_limit(user_address: address): u64 acquires UserPreferences {
        let preferences = &borrow_global<UserPreferences>(@CopyTrading).preferences;
        table::borrow(preferences, user_address).risk_limit
    }


   
// Helper function to add trader to the addresses list
fun add_trader_to_list(trader_address: address) acquires TraderAddresses {
    let trader_addresses = &mut borrow_global_mut<TraderAddresses>(@CopyTrading).addresses;
    if (!vector::contains(trader_addresses, &trader_address)) {
        vector::push_back(trader_addresses, trader_address);
    };
}

#[view]
public fun get_all_trader_addresses(): vector<address> acquires TraderAddresses {
    if (exists<TraderAddresses>(@CopyTrading)) {
        *&borrow_global<TraderAddresses>(@CopyTrading).addresses
    } else {
        vector::empty<address>()
    }
}
    // Function to get the resource account signer
    fun get_resource_account(): signer acquires SignerCapability {
        let signer_cap = &borrow_global<SignerCapability>(@CopyTrading).cap;
        account::create_signer_with_capability(signer_cap)
    }
    // #[test_only]
    // Remove the test-only version since we now have a regular version
    // #[test_only]
    // fun get_resource_account(): signer acquires SignerCapability {
    //     let signer_cap = borrow_global<SignerCapability>(@CopyTrading).cap;
    //     account::create_signer_with_capability(&signer_cap)
    // }
#[test_only]
public fun setup_test(aptos_framework: &signer, copy_trading: &signer) acquires SignerCapability, Portfolios, TestTokens {
    // Create test accounts
    create_account_for_test(signer::address_of(aptos_framework));
    create_account_for_test(signer::address_of(copy_trading));
    
    // Create user account - prefix with underscore to indicate it's intentionally unused
    let _user = account::create_account_for_test(@0x123);
    
    // Initialize AptosCoin
    let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(aptos_framework);
    
    // Save capabilities
    move_to(aptos_framework, TestTokens {
        mint_cap,
        burn_cap
    });
    
    // Initialize copy trading contract
    initialize(copy_trading);
    initialize_admin(copy_trading);  // Using copy_trading signer which has @CopyTrading address
    
    // Mint some APT for the user
    let tokens = borrow_global<TestTokens>(@0x1);
    let coins = coin::mint(1000,&tokens.mint_cap );
    coin::register<AptosCoin>(&_user);
    coin::deposit(signer::address_of(&_user), coins);
    
    // Test deposit
    deposit_apt(&_user, 500);
    
    // Verify deposit - using a scope to limit the borrow
    {
        let portfolios = &borrow_global<Portfolios>(@CopyTrading).portfolios;
        let portfolio = table::borrow(portfolios, signer::address_of(&_user));
        assert!(portfolio.apt_balance == 500, 1);
    };
    
    // Test withdraw - now the previous borrow is out of scope
    withdraw_funds(&_user, 200);
    
    // Verify withdrawal with a new borrow
    {
        let portfolios = &borrow_global<Portfolios>(@CopyTrading).portfolios;
        let updated_portfolio = table::borrow(portfolios, signer::address_of(&_user));
        assert!(updated_portfolio.apt_balance == 300, 2);
    };
}
#[test_only]
public fun test_deposit_and_withdraw() acquires Portfolios, SignerCapability, TestTokens {
    let aptos_framework = account::create_account_for_test(@0x1);
    let copy_trading = account::create_account_for_test(@CopyTrading);
    let user = account::create_account_for_test(@0x123);
    
    setup_test(&aptos_framework, &copy_trading);
    
    // Create a new user for this test
    let user = account::create_account_for_test(@0x456);
    
    // Mint some APT for the user
    let tokens = borrow_global<TestTokens>(@0x1);
    let coins = coin::mint(1000, &tokens.mint_cap);
    coin::register<AptosCoin>(&user);
    coin::deposit(signer::address_of(&user), coins);
    
    // Test deposit
    deposit_apt(&user, 500);
    
    // Verify deposit - using a scope to limit the borrow
    {
        let portfolios = &borrow_global<Portfolios>(@CopyTrading).portfolios;
        let portfolio = table::borrow(portfolios, signer::address_of(&user));
        assert!(portfolio.apt_balance == 500, 1);
    };
    
    // Test withdraw
    withdraw_funds(&user, 200);
    
    // Verify withdrawal with a new borrow
    {
        let portfolios = &borrow_global<Portfolios>(@CopyTrading).portfolios;
        let updated_portfolio = table::borrow(portfolios, signer::address_of(&user));
        assert!(updated_portfolio.apt_balance == 300, 2);
    };
}

}
