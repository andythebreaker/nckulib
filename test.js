//import { expect } from 'chai';  // Using Expect style
//import * as myapp from './index.js';
const expect = require('chai').expect;
const myapp = require(".");

describe('test1', () => {
    it('Should Return ...!', () => {
        myapp.test_lib_qry("0002-5232",(ok) => {
            expect(ok).to.equal("Algebra and Logic");
        });
    });
});