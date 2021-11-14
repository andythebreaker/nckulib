//import { expect } from 'chai';  // Using Expect style
//import * as myapp from './index.js';
const expect = require('chai').expect;
const myapp = require(".");

describe('test1', () => {
    it('Should Return ...!', () => {
        myapp.isbn_to_json("0002-5232",(ok) => {
            console.log(ok);
            expect(ok.book_name).to.equal("Algebra and Logic");
        });
    });
});