import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoCoders from "./contracts/CryptoCoders.json"
import React from 'react'  
import getWeb3 from "./getWeb";
import { useEffect } from "react";
import { useState } from "react";
const App = () => {
  const [Contracts, setContract] = useState(null);
  const [Account, setAccount] = useState("");
  const [coders, setCoders] = useState([]);
  const [mintText, setMintText] = useState("")
  

  //  1) Load the metamask
  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts); // NOT WORKING
      console.log(accounts); // current wallet address
      return accounts;
    }else{
      console.log("error occured in loading accounts");
      return null;
    }
  }
  
  

  //  2) Load the contract
  const loadWeb3Contract = async (web3) =>{
    const networkId = await web3.eth.net.getId(); // to get which network we are connected
    const networkData = CryptoCoders.networks[networkId];
    if (networkData) {
      const abi = CryptoCoders.abi;
      const address = networkData.address;
      // getting contract using abi from json file and address of the contract.
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract); // NOT WORKING SINCE IT IS IN ASYNC FUNCTION THATS WHY I COULDNT FIND SOLUTION FOR THAT.
      console.log(contract);
      return contract;

    }else{
      console.log("error occured please check networkData");
      return null;
    }
  }

  //  3) load all the nfts

  const loadNFTs = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    // call() no gas fee, get anything
    // send() has a gas fee, put something on the blockchain
    let nfts = [];
    for (let i = 0; i < totalSupply; i++) {
      const coder = await contract.methods.coders(i).call();
      nfts.push(coder);
    }
    setCoders(nfts);
    // console.log(nfts);
    // console.log(totalSupply);
  }

  


  useEffect(()=> {

    const fetch = async() =>{
      const web3 = await getWeb3();
      console.log(web3);
      const contract = await loadWeb3Contract(web3); // contract interective point
      await loadWeb3Account(web3); // current connected wallet
      await loadNFTs(contract);
    }
    

    fetch();

  },[])

  const mint = async () => {
    
    
    Contracts.methods.mint(mintText).send({ from: Account[0] }, (error)=>{
      console.log("it worked")
      if(!error){
        setCoders([...coders, mintText])
        setMintText("");
      }
    });
  }
  


  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Crypto Coders</a>
        <span>{Account}</span>
        </div>
      </nav>
      <div className="contrainer-fluid mt-5">
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <img className="mb-4" width={72} src="https://avatars.dicebear.com/api/pixel-art/hehe.svg" alt="" />
            <h1 className="display-5 fw-bold">Crypto Coders</h1>
            <div className="col-6">
              <p className="text-center lead">
                I really dont know what to add here just filling the area for looking extra cool xD.
              </p>
              <div>
                <input type="text"
                  placeholder="e.g. wasi"
                  className="form-control mb-2"
                  value={mintText}
                  onChange={(e)=>{setMintText(e.target.value)}}
                />
                <button onClick={mint} className="btn btn-primary">Mint</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8 d-flex justify-content-center flex-wrap">
          {/* key is like a number used in div */}
          {coders.map((coder, key)=> <div key={key} className="d-flex flex-column align-items-center">
            <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`} alt="" />
            <span>{coder}</span>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App