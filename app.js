const express = require('express');
const app = express();

const views = require('./views');

const cars = [
    'bmw', 'toyota', 'audi', 
    'jeep', 'mazda', 'ford', 
    'dodge', 'hummer', 'man',
    'vaz'
]

// app.get('/', (req, res) => {
//     const html = '<ul>' 
//     + ('search' in req.query)
    
//     ?
//         cars.filter(el => RegExp(req.query.search).test(el)).map(el => `<li>${el}</li>`).join("\n")
//     :
//         cars.map(el => `<li>${el}</li>`).join("\n") 
//     + '</ul>'

//     res.send(views(html));
// });

app.get('/api', (req, res) => {

    const perPage = 'perPage' in req.query && Number(req.query.perPage) ? Number(req.query.perPage) : 3;
    const currentPage = 'page' in req.query && Number(req.query.page)? Number(req.query.page) : 1;
    const urlPrefix = '/api?page=';
    const pages = Math.ceil(cars.length/perPage);

    res.json({
        info: {
            count: cars.length,
            pages,
            next: getNextPageUrl(currentPage, pages, urlPrefix),
            prev: getPrevPageUrl(currentPage, urlPrefix),
            currentPage,
            perPage,
          },
          results: cars.slice((currentPage-1)*perPage,currentPage*perPage)
    })
});

const getNextPageUrl = (current_page, total_pages, url_prefix) => {
    return current_page < total_pages ? `${url_prefix}${current_page+1}` : null
}
const getPrevPageUrl = (current_page, url_prefix) => current_page > 1 ? `${url_prefix}${current_page-1}` : null

app.listen(3000, () => {
    console.log('Server was runnig...')
})