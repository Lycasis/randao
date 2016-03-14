// geth --dev --mine --genesis genesis_block.json --datadir ./data  console 2>> out.log.geth

console.log("unlocking")
personal.unlockAccount(web3.eth.accounts[0], "Write here a good, randomly generated, passphrase!")
personal.unlockAccount(web3.eth.accounts[1], "Write here a good, randomly generated, passphrase!")

var mined = 0;
var _defaultServiceProvider = web3.eth.accounts[0]/* var of type address here */ ;
var _daoCreator = web3.eth.accounts[1]/* var of type address here */ ;

var abi = [{ "constant": false, "inputs": [{ "name": "_bnum", "type": "uint32" }, { "name": "_deposit", "type": "uint96" }, { "name": "_commitDeadline", "type": "uint8" }, { "name": "_commitBalkline", "type": "uint8" }], "name": "newCampaign", "outputs": [{ "name": "_campaignID", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "campaigns", "outputs": [{ "name": "bnum", "type": "uint32" }, { "name": "deposit", "type": "uint96" }, { "name": "commitDeadline", "type": "uint8" }, { "name": "commitBalkline", "type": "uint8" }, { "name": "reveals", "type": "uint16" }, { "name": "random", "type": "uint256" }, { "name": "settled", "type": "bool" }, { "name": "bountypot", "type": "uint96" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_campaignID", "type": "uint256" }], "name": "checkSettled", "outputs": [{ "name": "settled", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "numCampaigns", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "uint8" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_campaignID", "type": "uint256" }], "name": "getCommitment", "outputs": [{ "name": "", "type": "bytes32" }], "type": "function" }, { "constant": true, "inputs": [], "name": "callbackFee", "outputs": [{ "name": "", "type": "uint96" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_campaignID", "type": "uint256" }, { "name": "_s", "type": "uint256" }], "name": "reveal", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "_campaignID", "type": "uint256" }], "name": "getRandom", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_str", "type": "bytes" }, { "name": "_index", "type": "uint256" }, { "name": "_size", "type": "uint256" }], "name": "slice", "outputs": [{ "name": "", "type": "bytes" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_campaignID", "type": "uint256" }, { "name": "_hs", "type": "bytes32" }], "name": "commit", "outputs": [], "type": "function" }, { "inputs": [], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "campaignID", "type": "uint256" }, { "indexed": false, "name": "bnum", "type": "uint32" }, { "indexed": false, "name": "deposit", "type": "uint96" }, { "indexed": false, "name": "commitDeadline", "type": "uint8" }, { "indexed": false, "name": "commitBalkline", "type": "uint8" }], "name": "CampaignAdded", "type": "event" }];
var binary = "6060604052600280546001606060020a03191667016345785d8a0000179055610be98061002c6000396000f36060604052361561008d5760e060020a60003504630db472cf811461008f578063141961bc146101945780631e193b69146102055780632c0f7b6f146102d457806354fd4d50146102dd57806369bcdb7d146102e557806391ff7865146103235780639348cef714610335578063cd4b691414610373578063e0041396146103e6578063f2f0387714610470575b005b610311600435602435604435606435600080546001818101835581835260209081526040928390208054608860020a860271ff000000000000000000000000000000000019608060020a890270ff00000000000000000000000000000000196401000000008c026fffffffffffffffffffffffff000000001963ffffffff199096168e179590951694909417939093169290921791909116178155835183815263ffffffff8916928101929092526001606060020a0387168285015260ff86811660608401528516608083015292519192917f7bae521b658ca9d8a2e5d18ae0fc9529b3b67a05e13a8c958411a9979fe2d2d79181900360a00190a150949350505050565b61052a60043560016020819052600091825260409091209081015481546002929092015463ffffffff83169264010000000081046001606060020a0390811693608060020a830460ff90811694608860020a8504821694609060020a900461ffff1693918116916101009091041688565b6103116004356000818152600160205260408120805463ffffffff1643106107ad57600281015460ff1615156107ad576107ad815b60028101805460ff1916600117905580546000609060020a90910461ffff1611156109915780546004820154609060020a90910461ffff16141561088e5761088e8160005b6004820154811015610b615760048201805460058401916000918490811015610002575081526020808220840154600160a060020a03168252919091526040902054600183810180549092189091550161027f565b61031160005481565b610583600181565b600435600090815260016020818152604080842033600160a060020a0316855260050190915290912001545b60408051918252519081900360200190f35b61059a6002546001606060020a031681565b61008d60043560243560008281526001602052604081208054909190819064010000000090046001606060020a03163410156106d5573491506106ed565b610311600435600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb49805463ffffffff1643106107be577fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4b5460ff161515610826576108268161023a565b6040805160206004803580820135601f81018490048402850184019095528484526105b79491936024939092918401919081908401838280828437509496505093359350506044359150505b60408051602081810183526000808352835191820190935282815290919081848114806104625750865185870110155b1561083b5786519250610841565b61008d60043560243560008281526001602052604090208054608860020a810460ff1663ffffffff918216031643108015906104c057508054608060020a810460ff1663ffffffff918216031643105b1561062557816000141580156104f15750600160a060020a0333166000908152600582016020526040812060010154145b15610635576004810180546001810180835533929190829082801582901161063e5760008381526020902061063e9181019083016106bd565b6040805163ffffffff9990991689526001606060020a0397881660208a015260ff9687168982015294909516606088015261ffff909216608087015260a086015260c0850152911660e083015251908190036101000190f35b6040805160ff929092168252519081900360200190f35b604080516001606060020a03929092168252519081900360200190f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156106175780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61069e345b610b1a5b60643a0290565b61069e3461062a565b505050815481101561000257600091825260208083209091018054600160a060020a03191690931790925560408051808201825282815280840186815233600160a060020a03168452600586019094529120905181559051600191909101555b505050565b601f016020900490600052602060002090810190610a5691905b808211156106d157600081556001016106bd565b5090565b825464010000000090046001606060020a0316340391505b825463ffffffff164310801561071857508254608060020a810460ff1663ffffffff91821603164310155b1561079d5750600160a060020a0333166000908152600583016020908152604080519281902060018101548785529151938490039092019092209091141561079d57838160000160005054141515610799578254609060020a80820461ffff166001010273ffff000000000000000000000000000000000000199091161783555b8381555b6107a68261062a565b5050505050565b600281015460ff1691505b50919050565b6002546001606060020a0316341061083257610826816040604051908101604052803381526020016109946000368080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505060946004610432565b600181015491506107b8565b6108263461062a565b85850192505b50845b8281101561088457868181518110156100025790602001015160f860020a900460f860020a02828783038151811015610002570160200152600101610844565b5095945050505050565b6001810154600090111561092a5761092a816000805b600383015482101561069e57600383018054839081101561000257906000526020600020906002020160005080546001858101546040518483018054959650600160a060020a0394909416949192909182918591600291811615610100026000190116048015610bbc5780601f10610b9157610100808354040283529160200191610bbc565b610991818054600282015460643a029161ffff609060020a909104166101009091046001606060020a03160460005b6004840154811015610b65576004840180548290811015610002576000918252602082200154600160a060020a031690610b6b61062e565b50565b90526003820180546001810180835582908280158290116109ce576002028160020283600052602060002091820191016109ce9190610a5c565b5050508154811015610002576000918252602080832060029283020180548551600160a060020a0319919091161781558482015180516001838101805481895297869020949790969181161561010002600019011604601f90810185900484019491939290910190839010610aa057805160ff19168380011785555b50610ad09291506106bd565b50506001015b808211156106d1578054600160a060020a031916815560018181018054600080835592600290821615610100026000190190911604601f8190106106a35750610a56565b82800160010185558215610a4a579182015b82811115610a4a578251826000505591602001919060010190610ab2565b5050905050610add61062e565b6002820180546101008082046001606060020a0390811694163403939093019092026cffffffffffffffffffffffff001990921691909117905550565b6001606060020a03168111156109915733600160a060020a03166000610b3e61062e565b6040516001606060020a03919091168403906000818181858888f1505050505050565b5050565b50505050565b6040519085036001606060020a0316906000818181858888f15050505050600101610959565b820191906000526020600020905b815481529060010190602001808311610b9f57829003601f168201915b5050828152602001925050506000604051808303816000866161da5a03f1505050600191909101906108a456";

var randaoContract = web3.eth.contract(abi);

var deposit = web3.toWei('2', 'ether');
var target_block = web3.eth.blockNumber + 15;

var randao = randaoContract.new(
   _defaultServiceProvider,
   _daoCreator,
   {
     from: web3.eth.accounts[0],
     data: binary,
     gas: 3000000,
     gasPrice: 500000000000
   }, function(e, contract){
    console.log(e, contract);
    if (typeof contract.address != 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
         mined = 1
    }
 })

console.log("mining contract plz wait")
miner.start(1); admin.sleepBlocks(1); miner.stop();
