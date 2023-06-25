//import { useEffect } from "react";
//import { SigningCosmosClient } from "@cosmjs/launchpad";

export const WalletIcon = () => {
  const loadKeplr = async () => {
    if (!window.keplr) {
      alert("Please install Keplr extension");
    } else {
      const chainId = "cosmoshub-4";

      // Enabling before using Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      const accounts = await offlineSigner.getAccounts();
      //const address = accounts[0].address;

      console.log("Wallet Address:", accounts);

      // Verify the signature
      /*       const isValid = await offlineSigner.verifySignature(
        signedMessage.signature,
        message,
        publicKey
      );

      console.log("Signature Verification:", isValid); */

      // Use the verification result or perform other operations
      // ...
    }
  };

  return (
    <>
      <img
        className=""
        //style={{ marginLeft: "10px", marginRight: "10px" }}
        alt="keplr_logo"
        src="/icons/keplr_logo.png"
        width="30"
        height="30"
        //className="d-inline-block align-top"
        onClick={loadKeplr}
      />
    </>
  );
};

/*  ---- Get wallet at start of session ----
import React, { useEffect } from 'react';
import { SigningCosmosClient } from 'osmosis-js';

const MyComponent = () => {
  useEffect(() => {
    const loadKeplr = async () => {
      if (!window.keplr) {
        alert("Please install Keplr extension");
      } else {
        const chainId = "osmosis-1";
  
        // Enabling before using Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);
  
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
  
        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();
  
        // Initialize the SigningCosmosClient with the necessary parameters.
        const osmosisClient = new SigningCosmosClient(
          "https://rpc.osmosis.zone",
          accounts[0].address,
          offlineSigner,
          chainId
        );
  
        // Use the osmosisClient instance or perform other operations with it
        // ...
      }
    };

    loadKeplr();
  }, []);

  return <div>Your component content here</div>;
};

export default MyComponent;


*/
