const request = require("request-promise");
const cheerio = require("cheerio");


//get Idol Name
getNameIdol = (url,ref) => {
  request(url).then(body => {
    $ = cheerio.load(body);   
    $("h5.text-center > a").each((i, e) => {
       idol=e['attribs']['href'].split('/')[2]
       ref.push(idol);
    });
  });
};

//excute crawler data from page
getPage = (ref) => {
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
            getNameIdol(elem,ref);
        })
    });
};
//get Idol infomation


module.exports.idolCron = (ref)=>{
  ref.remove().then(()=>{
      getPage(ref);
  })
}

