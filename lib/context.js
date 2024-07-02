/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';

/**
 * The Context class provides the transactional context per a transactional execution.
 *
 * This can be subclassed to provided additional functional behaviour to support
 * smart contract execution.
 *
 * An example would be to provide additional help to map application object ids to world state
 * composite keys.
 *
 * In the constructor, do not reference the stub or clientidentity functions.
 *
 * @example
 * class ScenarioContext extends Context{

	constructor(){
		super();
	}


	generateKey(){
		return this.stub.createCompositeKey('type',['keyvalue']);
	}

  }
 *
 * @memberof fabric-contract-api
 */
class Context {

    constructor() {
    }

    /**
	 * This sets the chaincode stub object with api to use for worldstate access.
	 * MUST NOT BE CALLED FROM SMART CONTRACT CODE
	 *
	 * @param {ChaincodeStub} stub chaincode stub instance
	 */
    setChaincodeStub(stub) {
        this.stub = stub;
    }

    /**
	 * This sets the ClientIdentity object to use for information on the transaction invoking identity
	 * MUST NOT BE CALLED FROM SMART CONTRACT CODE
	 *
	 * @param {ClientIdentity} clientIdentity chaincode stub instance
	 */
    setClientIdentity(clientIdentity) {
        this.clientIdentity = clientIdentity;
    }

    async getKYC(userId) {

        console.log("inside getKYC")

        let crossCCFunc = "KycExists"
        let crossCCName = "kyc"
        let channelName = "universalkyc"
        console.log("setup channel")
        let response = await this.stub.InvokeChaincode(crossCCName, userId, channelName)
        
        console.log(response)

        return response;
    }


	async putStateWithoutKYC(key, value) {


	console.log("----------putStateWithoutKYC and kyc *******-------------")

        // default implementation is do nothing
       return await this.stub.putState(key, value);

	   
    }


	async putStateWithKYC(key, value) {
		console.log("----------putStateWithKYC ->") 
		let userid = ctx.getUserId()
		console.log("----------putStateWithKYC and kyc *******-------------", userids)
	
		let res = await getKYC(userid)
		console.log("getKYC response", res)

		// default implementation is do nothing
		return await this.stub.putState(key, value);
	
		   
		}
}

module.exports = Context;
