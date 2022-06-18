const axios = require('axios');
const cheerio = require('cheerio');


const getNoticesFromJW = async () => {

     const url = 'https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/';

     let response = await axios.get(url)
          .then(function (result) { return result })
          .catch(error => console.log(error))

     return response
}

const processAllNotices = async (responseGetNoticesFromJW) => {

     const $ = cheerio.load(responseGetNoticesFromJW.data);
     let articlesFromJW = [];

     // encontrar um meio para remover a noticia que está em destaque. Ela é tratada na função processHighlightedNotice.
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


const processHighlightedNotice = async (responseGetNoticesFromJW) => {
     const $ = cheerio.load(responseGetNoticesFromJW.data);
     let articlesFromJW = [];

     $('div.presentationIntent-desktop').each((i, element) => {

          const title = $(element).find('em').text();
          const link = $(element).find('a').attr('href');
          let concatLink = `https://jw.org${link}`;

          articlesFromJW.push({
               title: title,
               link: concatLink
          });
     });

     return ({ articlesFromJW })
}





// const treatProcessedNotices = async (responseProcessNotices) => {
//      console.log(responseProcessNotices)



// }



const main = async () => {

     const responseGetNoticesFromJW = await getNoticesFromJW();


     const responseProcessAllNotices = await processAllNotices(responseGetNoticesFromJW);
     //console.log(responseProcessAllNotices)

     const responseProcessHighlightedNotice = await processHighlightedNotice(responseGetNoticesFromJW)
     console.log(responseProcessHighlightedNotice)

     //const responseTreatProcessedNotices = await treatProcessedNotices(responseProcessNotices);

};


main()



/**
 *  // TODO: Tratar o nome do array articlesFromJW para cada função. No futuro quando refatorar e for adicionando os objetos, eles não podem ter o mesmo nome.
 */
