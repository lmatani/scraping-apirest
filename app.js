const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const scraping = require('./scraping.js');
const datos = require('./datos.js');



const url = 'https://elpais.com/ultimas-noticias/';
// Middleware para manejar datos JSON
app.use(express.json());
// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    scraping.getNews(url);
    res.status(200).send('hola');
}); 

// Listar noticias
app.get('/noticias', (req, res) => {
    const noticias = datos.leerDatos();
    res.status(200).json(noticias);
}); 

app.get('/noticias/:indice', (req, res) => {
	const pIndice = req.params.indice;
    //console.log(pIndice);
    const arrNews = datos.leerDatos();
 
    const noticiaEncontrada = arrNews.find((noticia) => noticia.indice == pIndice);

    if (noticiaEncontrada === undefined)
        return res.status(404).json({ message: 'Noticia no encontrado! Prueba con otro indice.' });

    return res.status(200).json(noticiaEncontrada);
    
});

app.post('/noticias',(req, res) =>{
    const datoNoticia = req.body;
   
    //to do validar datos
    // asignar datos

    const newNoticia = {...datoNoticia    };

});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto 3000');
  });
  