const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
        headless:false, 
        defaultViewport:null,
        devtools: false,
        args: ["--window-size=1920,1080", "--window-position=1921,0"]
    })

    const page = await browser.newPage(); 
    await page.goto('https://www.youtube.com/c/WildEarth/videos');

    const links = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('#video-title'));
        let links = elements.map(element => {
            console.log(element)
            return {href: element.href, title: element.title}
        })
        return links;
    });

    // this is now a list of titles and links
    console.log(links);

    // get the first "sunrise" and go to that page
    let url;
    for (let i = 0; i < links.length; i++) {
        if (links[i].title.includes("Sunrise")) {
            url = links[i].href;
            console.log('Found a sunrise safari! ', links[i].title);
            console.log('going to link ', url);
            break;
        } 
    }

    await page.goto(url);
    await page.waitFor(8000)
    await page.keyboard.press("f")

    // mute the ads
    await page.keyboard.press("m")

    // wait 60 seconds
    await page.waitFor(60000)

    // unmute
    await page.keyboard.press("m")

})();