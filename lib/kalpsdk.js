/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const Logger = require('./logger');
const logger = Logger.getLogger('./lib/kalpsdk.js');

const Context = require('./context');


/**
 * The main Contact class that all code working within a Chaincode Container must be extending.
 *
 * Overriding of the `beforeTransaction`, `afterTransaction`, `aroundTransaction`, `unknownTransaction` and `createContext` are all optional
 * Supplying a name within the constructor is also option and will default to ''
 *
 * @memberof fabric-contract-api
 */
class Kalpsdk {


    constructor() {
    }
    /**
     * Constructor - supplying a name is recommended but is not mandatory.
	 *
     * @param {String} name name for the logic within this contract
     * @param {Boolean} IsPayableContract name for the logic within this contract
    */
    // constructor(stub: ChaincodeStub)

    // setChaincodeStub(stub) {
    //     this.kalpsdk = stub;
    // }


    async putStateWithoutKYC(key, value) {
        // default implementation is do nothing
        await Kalpsdk.putState(key, value);

    }
}
module.exports = Kalpsdk;
