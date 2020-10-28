const puppeteer = require('puppeteer');
const moment = require('moment');

var keepGoing = true;

(async () => {
  while (keepGoing) {
    //args: ['--no-sandbox']
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://direct.activegolf.com/home.asp?WSID=1058');
    await page.goto('https://direct.activegolf.com/crs/GetTeeTime.asp?SSL=1');
    await page.$eval(
      'input[name=MemberAccessNum]',
      (el) => (el.value = '37975723')
    );
    await page.$eval('input[name=MemberPIN]', (el) => (el.value = '1431'));
    await page.$eval('input[name=btnSubmit]', (button) => button.click());

    await page.waitFor(500);
    await page
      .$eval('input[name=QTRSFacilityID1]', (check) => (check.checked = true))
      .catch((err) => console.err);
    await page
      .$eval('input[name=QTRSFacilityID3]', (check) => (check.checked = true))
      .catch((err) => console.err);
    await page
      .$eval('input[name=QTRSFacilityID4]', (check) => (check.checked = true))
      .catch((err) => console.err);
    await page
      .$eval('input[name=QTRSFacilityID7]', (check) => (check.checked = true))
      .catch((err) => console.err);
    // await page
    //   .$eval('input[name=QTRSFacilityID6]', (check) => (check.checked = true))
    //   .catch((err) => console.err);
    await page
      .$$eval('.selectable', (listEle) => {
        listEle[listEle.length - 1].click();
      })
      .catch((err) => console.err);
    await page.waitFor(500);
    await page.select('select[name="QTimeHr"]', '10');
    // searching btn
    await page.waitFor(500);
    await page.$eval('input[name=btnSubmit]', (button) => button.click());
    //
    await page.waitFor(1000);
    await page
      .$$eval('.buttonEnable', (listEle) => {
        //loop through list ele and find substrings of times
        //saturday 10-11 bergen preferred
        for (let i = 0; i < listEle.length; i++) {
          if (
            listEle[i].attributes.onclick.nodeValue.includes('10:') ||
            listEle[i].attributes.onclick.nodeValue.includes('9:') ||
            listEle[i].attributes.onclick.nodeValue.includes('11:')
          ) {
            page.screenshot({ path: 'temp.png' });
            keepGoing = false;
            // listEle[i].click();
          }
        }
      })
      .catch((err) => console.err);
    //confirm btn
    // await page.$eval('input[name=btnSubmit]', (button) => button.click());
    // await browser.waitForTarget(() => false);
    await browser.close();
  }
})();

//saturday time
//0 19 * * 6

//25 18 * * 2 node ./index.js
