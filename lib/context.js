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

		let userid =   this.clientIdentity.getID()
		console.log("getId", userid)
		
		var begin = userid[0].indexOf("/CN=");
        var end = userid[0].lastIndexOf("::/C=");
        let userEnrollmentId = userid[0].substring(begin + 4, end);
		console.log("userEnrollmentId", userEnrollmentId)
	
        return userEnrollmentId ;
    }


    async getKYC(userId) {		

		let crossCCFunc = "KycExists"
        let crossCCName = "kyc"
        let channelName = this.stub.getChannelID()
        console.log("setup channel", channelName)


        let response = await this.stub.invokeChaincode(crossCCName, [crossCCFunc, userId], channelName)
		if (response.status !== 200) {
			throw new Error(`failed to query kyc chaincode for user ${userId}. Got status ${response.status} and error message: ${response.message}`);
		}
		let cc2ResObj = JSON.parse(response.payload.toString('utf8'));
	
		console.log("cc2ResObj", cc2ResObj)

        return response;
    }

	async delStateWithoutKYC(key) {	
			// default implementation is do nothing
		   return await this.stub.delState(key);	
		}
	
	async delStateWithKYC(key) {
		let userEnrollmentId = this.getUserId()
		console.log("----------userEnrollmentId ->",  userEnrollmentId) 

		let res = await this.getKYC(userEnrollmentId)
		console.log("getKYC response", res)

		// default implementation is do nothing
		return await this.stub.delState(key);			
		}

	async putStateWithoutKYC(key, value) {
        // default implementation is do nothing
       return await this.stub.putState(key, value);	   
    }


	async putStateWithKYC(key, value) {
		console.log("----------putStateWithKYC ->") 
		let userEnrollmentId = this.getUserId()
		console.log("----------userEnrollmentId ->",  userEnrollmentId) 
	
		
		// let userid ="Smartxx5"
		let res = await this.getKYC(userEnrollmentId)
		console.log("getKYC response", res)

		// default implementation is do nothing
		return await this.stub.putState(key, value);
	
		   
		}
}

module.exports = Context;
