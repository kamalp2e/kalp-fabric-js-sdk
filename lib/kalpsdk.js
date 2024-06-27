/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const Logger = require('./logger');
const logger = Logger.getLogger('./lib/kalp-sdk.js');

const Context = require('./context');

/**
 * The main Contact class that all code working within a Chaincode Container must be extending.
 *
 * Overriding of the `beforeTransaction`, `afterTransaction`, `aroundTransaction`, `unknownTransaction` and `createContext` are all optional
 * Supplying a name within the constructor is also option and will default to ''
 *
 * @memberof fabric-contract-api
 */
class kalpsdk extend chaincodeStub {
    /**
     * Constructor - supplying a name is recommended but is not mandatory.
	 *
     * @param {String} name name for the logic within this contract
     * @param {Boolean} IsPayableContract name for the logic within this contract
    */
    async putStateWithoutKYC(key, value) {
        // default implementation is do nothing
        await kalpsdk.putState(key, value);

    }
}
module.exports = kalpsdk;
