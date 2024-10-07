Here's the `README.md` file for your project:

```markdown
# Stellar-Soroban-Boilerplate

This repository contains a simple Soroban smart contract that functions as a key-value store, along with a React frontend that interacts with the contract using the Stellar-SDK.

## Overview

### Smart Contract
The Soroban smart contract allows you to:
- **Set a key-value pair**
- **Get the value of a specific key**
- **Remove a key-value pair**

### React App
The React application allows users to:
- Set key-value pairs in the Soroban smart contract.
- Retrieve values by key from the Soroban smart contract.

## Prerequisites

Before getting started, ensure you have the following installed:
- **Rust and cargo**: For compiling and deploying the Soroban contract.
- **Node.js and npm**: For running the React application.
- **Soroban CLI**: For interacting with the Soroban network.

## Getting Started

### 1. Cloning the Repository

```bash
git clone https://github.com/jamesbachini/Stellar-Soroban-Boilerplate.git
cd Stellar-Soroban-Boilerplate
```

### 2. Compiling and Deploying the Soroban Smart Contract

Make sure you have the Soroban CLI set up to interact with the Soroban testnet.

#### Compile the Contract

Run the following command to compile the Soroban smart contract:

```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
```

This will generate a `.wasm` file in the `target/wasm32-unknown-unknown/release/` directory.

#### Deploy the Contract

To deploy the contract on Soroban's testnet, use the Soroban CLI:

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/YOUR_CONTRACT_NAME.wasm \
  --network soroban-testnet
```

After deploying, you'll get a contract ID that is required in the React app to interact with the contract.

### 3. Running the React Application

#### Install Dependencies

From the root of the project (or inside the `client/` directory if split), install the React app's dependencies:

```bash
npm install
```

#### Configure the Contract ID

In the `App.js` file, replace the `contractId` with the one you obtained after deploying the contract:

```js
const contractId = 'YOUR_DEPLOYED_CONTRACT_ID';
```

#### Start the React App

To start the development server, run:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

### Setting a Key-Value Pair

1. In the **Set Key-Value Pair** section, enter the key and value you want to store.
2. Click the **Set** button.
3. The transaction will be processed and the key-value pair will be stored in the Soroban contract.

### Getting a Value by Key

1. In the **Get Value by Key** section, enter the key for which you want to retrieve the value.
2. Click the **Get** button.
3. If the key exists, the value will be displayed.

### Removing a Key-Value Pair

There is a remove functionality implemented in the smart contract. To add this feature to the UI, you can extend the React app to call the `remove` method.

## Acknowledgements

- [Soroban](https://soroban.stellar.org/) – Smart contract platform built by Stellar.
- [Stellar SDK](https://github.com/stellar/js-stellar-sdk) – JavaScript SDK for interacting with the Stellar network.

## License

This project is licensed under the MIT License.
```

This `README.md` provides instructions for compiling and deploying the Soroban smart contract and starting the React app. Adjust the paths and commands based on the actual structure of your repository.