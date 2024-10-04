import './App.css';
import React, { useState } from 'react';
import * as StellarSdk from 'stellar-sdk';

const App = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [getKey, setGetKey] = useState('');
  const [getValue, setGetValue] = useState('');
  const [error, setError] = useState('');

  const rpc = new StellarSdk.SorobanRpc.Server('https://soroban-testnet.stellar.org');
  const contractId = 'CAZRTOYAMPPVKYBHEFGWLFYV2NVBCMHSQINLDX7C7DEAR6KFCO5WUI62';
  const contract = new StellarSdk.Contract(contractId);
  const accountPublicKey = 'GAN6C4YWK7B4DVXCG6KPWH4CBIQTSSFZ6XRPREHAYVLBAXAYTUP2XE7I';
  const accountSecretKey = 'SCOVOOJWZGG6NNUXLRHKGXETC2RW6DUKTP3TDUZSVLCJLSED4AWBNFPM'; // don't do this in production
  const accountKeypair = StellarSdk.Keypair.fromSecret(accountSecretKey);

  const handleSet = async (e) => {
    e.preventDefault();
    try {
      const inputKey = StellarSdk.nativeToScVal(key, { type: "symbol" });
      const inputValue = StellarSdk.nativeToScVal(value, { type: "symbol" });
      const account = await rpc.getAccount(accountPublicKey);
      const tx = new StellarSdk.TransactionBuilder(account, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
        .addOperation(contract.call("set", inputKey, inputValue))
        .setTimeout(30)
        .build();
      const preparedTx = await rpc.prepareTransaction(tx);
      preparedTx.sign(accountKeypair);
      const txResult = await rpc.sendTransaction(preparedTx);
      console.log('txResult', txResult);
      setKey('');
      setValue('');
    } catch (err) {
      setError('Failed to set value: ' + err.message);
    }
  };

  const handleGet = async (e) => {
    e.preventDefault();
    try {
      const inputGetKey = StellarSdk.nativeToScVal(getKey, { type: "symbol" });
      const account = await rpc.getAccount(accountPublicKey);
      const tx = new StellarSdk.TransactionBuilder(account, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
        .addOperation(contract.call("get", inputGetKey))
        .setTimeout(30)
        .build();
      rpc.simulateTransaction(tx).then((sim) => {
        const decoded = StellarSdk.scValToNative(sim.result?.retval);
        setGetValue(decoded);
      });
    } catch (err) {
      setError('Failed to get value: ' + err.message);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Soroban Demo dApp</h1>

      {error && (
        <div className="error-message">
          <strong>Error: </strong>
          <span>{error}</span>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">Set Key-Value Pair</h2>
        <form onSubmit={handleSet} className="form">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Key"
            className="input"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="input"
          />
          <button type="submit" className="button">Set</button>
        </form>
      </div>

      <div className="section">
        <h2 className="section-title">Get Value by Key</h2>
        <form onSubmit={handleGet} className="form">
          <input
            type="text"
            value={getKey}
            onChange={(e) => setGetKey(e.target.value)}
            placeholder="Key"
            className="input"
          />
          <button type="submit" className="button">Get</button>
        </form>
        {getValue && (
          <p className="result">Value: {getValue}</p>
        )}
      </div>
    </div>
  );
};

export default App;