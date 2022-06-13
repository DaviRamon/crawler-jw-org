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
     const articlesFromJW = [];

     $('div.NewsArticlePage').each((i, element) => {

          const title = $(element).find('a.subtle').attr('title');
          const link = $(element).find('a').attr('href');
          let concatLink = `https://jw.org${link}`;

          articlesFromJW.push({
               title: title,
               link: concatLink
          });
     });

     return ({ articlesFromJW })
};

const treatProcessedNotices = async (responseProcessNotices) => {
     console.log(responseProcessNotices)



}



const main = async () => {

     const responseGetNoticesFromJW = await getNoticesFromJW();
     const responseProcessNotices = await processNotices(responseGetNoticesFromJW);
     const responseTreatProcessedNotices = await treatProcessedNotices(responseProcessNotices);

     //console.log(responseTreatProcessNotices)

};


main()

