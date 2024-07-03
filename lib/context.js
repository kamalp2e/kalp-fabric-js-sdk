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

	async getUserId() {
        return this.clientIdentity.getID ;
    }
	async getUserIdBytes() {
        return this.clientIdentity.getIDBytes ;
    }



    async getKYC(userId) {

        console.log("inside getKYC")
		
        let crossCCFunc = "KycExists"
        let crossCCName = "kyc"
        let channelName = "kalptantra"
        console.log("setup channel")

		// let cc1Args = [userId]
		console.log("convertging bytes")
        let response = await this.stub.invokeChaincode(crossCCName, [crossCCFunc, userId], channelName)
		if (response.status !== 200) {
			throw new Error(response.message);
		}
		let cc2ResObj = JSON.parse(response.payload.toString('utf8'));
	
		console.log("cc2ResObj", cc2ResObj)

        return response;
    }


	async putStateWithoutKYC(key, value) {


	console.log("----------putStateWithoutKYC and kyc *******-------------")

        // default implementation is do nothing
       return await this.stub.putState(key, value);

	   
    }


	async putStateWithKYC(key, value) {
		console.log("----------putStateWithKYC ->") 
		let userid =   this.clientIdentity.getID()
		console.log("getId", userid)
		
		var begin = userid[0].indexOf("/CN=");
        var end = userid[0].lastIndexOf("::/C=");
        let userEnrollmentId = userid[0].substring(begin + 4, end);
		console.log("userEnrollmentId", userEnrollmentId)
	

		
		// let userid ="Smartxx5"
		let res = await this.getKYC(userEnrollmentId)
		console.log("getKYC response", res)

		// default implementation is do nothing
		return await this.stub.putState(key, value);
	
		   
		}
}

module.exports = Context;
