const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var HTMLParser = require('node-html-parser');

const chinese_book_name = '書刊名';

/*export function */exports.printMsg/*()*/ = function () {
    console.log("Hello World!");
    return "Hello World!";
};

/*export function*/ exports.test_lib_qry/*()*/ = async function (callback) {
    fetch(
        "https://weblis.lib.ncku.edu.tw/search*cht/i?SEARCH=0002-9890&searchscope=1"
    )
        .then(response => response.text())
        .then(text => {
            var root = HTMLParser.parse(text);
            var bibDetail = root.querySelectorAll(".bibDetail");
            bibDetail.forEach(element => {
                if (element.text.includes(chinese_book_name)) {
                    var book_name_ans = element.querySelector(".bibInfoData").text;
                    //console.log(book_name_ans);
                    return (book_name_ans);
                }
            });
            return "";
        })
        .then(ok => {
            callback(ok);
        });
};
