const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://direct.activegolf.com/home.asp?WSID=1058');
  await page.goto('https://direct.activegolf.com/crs/GetTeeTime.asp?SSL=1');
  await page.$eval(
    'input[name=MemberAccessNum]',
    (el) => (el.value = 'test@example.com')
  );
  await page.$eval(
    'input[name=MemberPIN]',
    (el) => (el.value = 'test@example.com')
  );
  await page.$eval('input[name=btnSubmit]', (button) => button.click());
  await browser.waitForTarget(() => false);
  await browser.close();
})();
