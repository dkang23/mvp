const puppeteer = require('puppeteer');
const moment = require('moment');

(async () => {
  var keepGoing = true;
  while (keepGoing && moment().minute() < 60) {
    //args: ['--no-sandbox']
    //headless: false
    console.log(keepGoing, moment().minute());

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page
      .goto('https://direct.activegolf.com/home.asp?WSID=1058')
      .catch((err) => console.err);
    await page
      .goto('https://direct.activegolf.com/crs/GetTeeTime.asp?SSL=1')
      .catch((err) => console.err);
    await page
      .$eval('input[name=MemberAccessNum]', (el) => (el.value = '37975723'))
      .catch((err) => console.err);
    await page
      .$eval('input[name=MemberPIN]', (el) => (el.value = '1431'))
      .catch((err) => console.err);
    await page
      .$eval('input[name=btnSubmit]', (button) => button.click())
      .catch((err) => console.err);

    await page.waitFor(500);
    // await page
    //   .$eval('input[name=QTRSFacilityID1]', (check) => (check.checked = true))
    //   .catch((err) => console.err);
    await page
      .$eval('input[name=QTRSFacilityID3]', (check) => (check.checked = true))
      .catch((err) => console.err);
    // await page
    //   .$eval('input[name=QTRSFacilityID4]', (check) => (check.checked = true))
    //   .catch((err) => console.err);
    // await page
    //   .$eval('input[name=QTRSFacilityID7]', (check) => (check.checked = true))
    //   .catch((err) => console.err);
    // await page
    //   .$eval('input[name=QTRSFacilityID6]', (check) => (check.checked = true))
    //   .catch((err) => console.err);
    await page.waitFor(500);
    await page
      .$$eval('.selectable', (listEle) => {
        listEle[listEle.length - 1].click();
      })
      .catch((err) => console.err);
    await page
      .select('select[name="QTimeHr"]', '10')
      .catch((err) => console.error(err));
    // searching btn
    await page.waitFor(500);
    await page.$eval('input[name=btnSubmit]', (button) => button.click());
    await page.waitFor(1000);
    await page
      .$$eval('.buttonEnable', (listEle) => {
        //loop through list ele and find substrings of times
        //saturday 10-11 bergen preferred
        for (let i = 0; i < listEle.length; i++) {
          if (listEle[i].attributes.onclick.nodeValue.includes('3:')) {
            listEle[i].click();
            return 3;
          }
        }
        for (let i = 0; i < listEle.length; i++) {
          if (listEle[i].attributes.onclick.nodeValue.includes('11:')) {
            listEle[i].click();
            return 11;
          }
        }
        for (let i = 0; i < listEle.length; i++) {
          if (listEle[i].attributes.onclick.nodeValue.includes('9:')) {
            listEle[i].click();
            return 9;
          }
        }
        throw 'no times!';
      })
      .then((data) => page.screenshot({ path: `${data}.png` }))
      .then(() => {
        keepGoing = false;
      })
      .catch((err) => console.err);

    //confirm btn
    // await page.$eval('input[name=btnSubmit]', (button) => button.click());
    //await browser.waitForTarget(() => false);
    await browser.close();
  }
})();

//saturday time
//0 19 * * 6

//25 18 * * 2 node ./index.js
