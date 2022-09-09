const CryptoCoders = artifacts.require("./CryptoCoders.sol");

contract("CryptoCoders", (accounts) => {
    let cotract;
    before(async()=>{
        contract = await CryptoCoders.deployed();


        // After compiling you can use any of varialbe or function from contract
        // and use it like contract.AnyFunction/AnyVariable

    })
    it(".. get deployed", async() => {  
        assert.notEqual(contract,"");   //make sure contract is deployed correctly
    })
    it(".. gets minted and added", async() => {  
        const result = await contract.mint("Wasi"); 
        let coder = await contract.coders(0);

        assert(coder, 'Wasi')
    })
})