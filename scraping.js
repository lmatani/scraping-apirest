const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

let noticias = [];
  const noticia = {
    titulo: 'titulo',
    imagen: 'imagen',
    descripcion: 'descripcion',
    enlace: 'enlace',
  };

function getNews(url){
    axios.get(url).then((response) => {
        if(response.status === 200) {
            let index = 0;
            const html = response.data;
            const $ = cheerio.load(html);
           
            const titulo = $('title').text();
            const arrayArticles = $('main').find('article');
          
            arrayArticles.each((index, element) =>{
                
                const arrayTitulos = $(element).find('h2').find('a');
                const arrayImagenes = $(element).find('img');
                const arrayDesc = $(element).find('p');
                let newNoticia = {};
                // titulos
                arrayTitulos.each((index, element) =>{
                    const title = $(element).text();
                    const link = $(element).attr('href');
                     newNoticia = {
                        titulo: title,
                        enlace: link
                    };

                });

                // img
                arrayImagenes.each((index, element) =>{
                    const imgSrc = $(element).attr('src');
                    newNoticia = {
                        imagen: imgSrc,
                       ...newNoticia
                    };

                });
                // desc descripcion: 'descripcion',
                arrayDesc.each((index, element) =>{
                    const desc = $(element).text();
                    newNoticia = {
                        descripcion: desc,
                       ...newNoticia
                    };

                });
               
                
                noticias.push(newNoticia);
            });

            noticias = noticias.map(noticia => {
                return {...noticia,
                        indice : index += 1}
            });
            //console.log(noticias);

            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
        }
    });

} 

module.exports = { getNews };

