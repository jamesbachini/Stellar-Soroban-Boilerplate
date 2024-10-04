#![cfg(test)]

use super::*;
use soroban_sdk::{symbol_short, Env};

#[test]
fn test_operations() {
    let env = Env::default();
    let contract_id = env.register_contract(None, StarterContract);
    let client = StarterContractClient::new(&env, &contract_id);

    let key = symbol_short!("key1");
    let mut value = symbol_short!("hello");
    
    // Test set and get
    client.set(&key, &value);
    let value2 = client.get(&key);
    assert_eq!(value, value2.expect("hello"));

    // Test update
    value = symbol_short!("goodbye");
    client.set(&key, &value);
    let value3 = client.get(&key);
    assert_eq!(value, value3.expect("goodbye"));

    // Test remove
    client.remove(&key);
    let removed_value = client.get(&key);
    assert_eq!(removed_value, None);
}
