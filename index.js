'use strict';



const fetch = require('node-fetch');
const { GoogleSpreadsheet } = require('google-spreadsheet');


const mainFun = async () => {

    // let url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23btc&count=50';
    let url = 'https://api.twitter.com/1.1/search/tweets.json?q=@AramexHelp+OR+@AramexKWI+OR+@Aramex+OR+@Aramex_KSA+OR+%23Aramex&count=100&result_type=mixed';

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAAFt5GgEAAAAABMxdmpnlHYci0ddr33eygdrdb%2BI%3DIqfBdF9xMuuZhN5yVgPt7ltCpjXsaZbr9hf8xG0xmQvT7TF7yF`
        }
    });

    let resData = await response.json();
    let arrOfRows = [];

    if (resData.statuses.length > 0) {
        let tweetsData = resData.statuses;

        console.log("adding to the array of rows");
        await tweetsData.forEach(element => {
            arrOfRows.push({
                timeStamp: element['created_at'],
                tweetId: element['id_str'],
                userName: element['user']['screen_name'],
                text: element['text']
            })
        });

    }


    const doc = new GoogleSpreadsheet('1xyhLBOaaAFCwo5Tx4AJKIBpeAVMVW_Hy3qwGmPDtKG4');
    await doc.useServiceAccountAuth(require('./aramexTwitter-0d754f6969c1.json'));
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = await doc.sheetsByIndex[0]


    // if (arrOfRows.length > 0) await sheet.addRows(arrOfRows);

    console.log("Counter: ", arrOfRows.length);
    
    console.log("Done !");

}


mainFun();