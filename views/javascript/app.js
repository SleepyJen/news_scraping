$(document).ready(function () {
    start();
    function start() {
        getNews();
        getAllNews(news => {
            console.log(news);
        });
    }

    function getNews() {
        $.ajax({
            method: 'GET',
            url: '/news/scrape'
        }).then(result => {
            console.log('Got latest news');
        });
    }

    function getAllNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/news'
        }).then(result => {
            cb(result);
        });
    }
});