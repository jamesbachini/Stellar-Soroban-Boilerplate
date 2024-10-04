#![no_std]
use soroban_sdk::{contract, contractimpl, Env, symbol_short, Symbol};

#[contract]
pub struct StarterContract;

#[contractimpl]
impl StarterContract {
    pub fn set(env: &Env, key: Symbol, value: Symbol) {
        env.storage().instance().set(&key, &value);
        env.events().publish((symbol_short!("SET"), &key), &value);
    }

    pub fn get(env: &Env, key: Symbol) -> Option<Symbol> {
        env.storage().instance().get(&key)
    }

    pub fn remove(env: &Env, key: Symbol) {
        env.storage().instance().remove(&key);
    }
}

mod test;
