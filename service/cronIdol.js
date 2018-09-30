const request = require("request-promise");
const cheerio = require("cheerio");


//get Idol Name
getNameIdol = (url) => {
  request(url).then(body => {
    $ = cheerio.load(body);   
    $("h5.text-center > a").each((i, e) => {
       ref.push(e['attribs']['href'].split('/')[2]);
    });
  });
};

//excute crawler data from page
getPage = () => {
  request("https://javmodel.com/jav/homepages.php")
    .then(body => {
      $ = cheerio.load(body);
      pageString = $("ul.pagination > li").text();
      maxPage = pageString.slice(pageString.length - 6, pageString.length - 4);
      let url = [];
      for (let i = 1; i <= maxPage; i++) {
        url.push("https://javmodel.com/jav/homepages.php?page=" + i);
      }
      return url;
    })
    .then(urls => {
        urls.forEach(elem=>{
            getNameIdol(elem);
        })
    });
};
module.exports.idolCron = (ref)=>{
  ref.remove().then(()=>{
      getPage();
  })
}

