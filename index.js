const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
//const trimNewlines = (...args) => import('trim-newlines').then(({ default: trimNewlines }) => trimNewlines(...args));
var trimOffNewlines = require('trim-off-newlines');
const ncrd = require('ncr-decode');
var HTMLParser = require('node-html-parser');

const chinese_book_name = '書刊名';

/*export function */exports.printMsg/*()*/ = function () {
    console.log("Hello World!");
    return "Hello World!";
};

/*export function*/ exports.test_lib_qry/*()*/ = async function (isbn, callback) {
    fetch(
        `https://weblis.lib.ncku.edu.tw/search*cht/i?SEARCH=${isbn}&searchscope=1`
    )
        .then(response => response.text())
        .then(text => {
            var obj_book_info = {
                book_isbn: isbn,
                book_name: "",
                book_info_s: []
            };
            var book_info_tepl = {
                data_rec: "",
                place_hold: "",
                stor_loc: "",
                stor_s: ""
            };
            var root = HTMLParser.parse(text);
            var bibDetail = root.querySelectorAll(".bibDetail");
            var bibHoldings = root.querySelector(".bibHoldings");
            var BHR = bibHoldings.getElementsByTagName("tr");
            //var bibHoldingsLabel = bibHoldings.querySelectorAll("bibHoldingsLabel");
            //var bibHoldingsEntry = bibHoldings.querySelectorAll("bibHoldingsEntry");
            var first_dont_count_holdingsDivider = 0;
            for (var k = 0; k < BHR.length; k++) {

                ele = BHR[k];
                console.log('@' + trimOffNewlines(ele.getElementsByTagName("td")[0].innerText) + "@");

                var data_mark = trimOffNewlines(ele.getElementsByTagName("td")[0].innerText);
                if (data_mark === "資料識別" || ncrd.decode(data_mark) === "資料識別") {
                    book_info_tepl.data_rec = ele.getElementsByTagName("td")[1].innerText;
                }
                if (data_mark === "架位號" || ncrd.decode(data_mark) === "架位號") {
                    book_info_tepl.place_hold = ele.getElementsByTagName("td")[1].innerText;
                }
                if (data_mark === "館藏地" || ncrd.decode(data_mark) === "館藏地") {
                    book_info_tepl.stor_loc = ele.getElementsByTagName("td")[1].innerText;
                }
                if (data_mark === "館藏" || ncrd.decode(data_mark) === "館藏") {
                    book_info_tepl.stor_s = ele.getElementsByTagName("td")[1].innerText;
                }
                if (ele.innerHTML.includes("holdingsDivider")) {
                    console.log("------------------------------------------------------holdingsDivider------------------------------------------------------------");
                    if (first_dont_count_holdingsDivider !== 0) {
                        obj_book_info.book_info_s.push(book_info_tepl);
                        book_info_tepl = {
                            data_rec: "",
                            place_hold: "",
                            stor_loc: "",
                            stor_s: ""
                        };
                    }
                    first_dont_count_holdingsDivider++;

                }

                /*TODO
                {
  book_isbn: '0002-5232',
  book_name: '',
  book_info_s: [
    {
      data_rec: '\n紙本 Print journal&nbsp;\n',
      place_hold: 'A1230',
      stor_loc: '總圖西文期刊合訂本區(B2)\n\n',
      stor_s: '30,1991. 37-41,1998-2002.\n'
    },
    {
      data_rec: '\n紙本 Print journal&nbsp;\n',
      place_hold: '',
      stor_loc: '數學系所\n\n',
      stor_s: '26-29,1987-90. 31-36,1992-97. 42-44,2003-05.\n\n'
    }
  ]
}，
                */
            }
            console.log(obj_book_info);
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
