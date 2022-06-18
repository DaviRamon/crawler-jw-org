const axios = require('axios');
const cheerio = require('cheerio');


const getNoticesFromJW = async () => {

     const url = 'https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/';
     let response = await axios.get(url)
          .then(function (result) { return result })
          .catch(error => console.log(error))

     return response
}


const processNotices = async (responseGetNoticesFromJW) => {

     const $ = cheerio.load(responseGetNoticesFromJW.data);
     let articlesFromJW = [];

     $('p.contextTitle').each((i, element) => {

          const title = $(element).find('a.subtle').attr('title');
          const link = $(element).find('a').attr('href');
          let concatLink = `https://jw.org${link}`;

          articlesFromJW.push({
               title: title,
               link: concatLink
          });
     });

     return articlesFromJW;
};


const processHighlightedNotice = async (responseGetNoticesFromJW) => {

     const $ = cheerio.load(responseGetNoticesFromJW.data);
     let highlightedArticlesFromJW = [];

     $('div.presentationIntent-desktop').each((i, element) => {

          const title = $(element).find('em').text();
          const link = $(element).find('a').attr('href');
          let concatLink = `https://jw.org${link}`;

          highlightedArticlesFromJW.push({
               title: title,
               link: concatLink
          });
     });

     return highlightedArticlesFromJW;
}


const concatAllProcessedNotices = async (responseProcessHighlightedNotice, responseProcessNotices) => {

     return {

          highlightedNotice: responseProcessHighlightedNotice,
          notices: responseProcessNotices
     }
}


const main = async () => {

     const responseGetNoticesFromJW = await getNoticesFromJW();
     const responseProcessHighlightedNotice = await processHighlightedNotice(responseGetNoticesFromJW);
     const responseProcessNotices = await processNotices(responseGetNoticesFromJW);
     const responseConcatAllProcessedNotices = await concatAllProcessedNotices(responseProcessHighlightedNotice, responseProcessNotices);

     console.log(responseConcatAllProcessedNotices)
     //return responseConcatAllProcessedNotices

};

main()

