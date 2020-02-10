$(document).ready(function () {
    start();
    function start() {

        getNews();
        getAllNews(news => {
            console.log(news);
            for (let i = 0; i < news.length; i++) {
                $('.news').prepend(`
                <div class="card p-2 mt-2">
                    <div class="card-body">
                        <h5 class="card-title">${news[i].headline}</h5>
                        <p class="card-text">${news[i].summary}</p>
                        <a href="${news[i].url}" class="card-link"><i class="fa fa-car"></i>Website</a>
                        <button class="btn commentBtn" id = "${news[i]._id}"><i class="fa fa-comments"></i>Comment</button>
                    </div>
                </div>`);
            }
        });
    }

    $(document).on('click', '.commentBtn', function () {
        $('.commentForm').empty();
        $('.commentForm').append(`            
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Comment</label>
            <textarea class="form-control" id="Textarea" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary submitComment" id = ${$(this).attr('id')}>Submit</button>
    </form>`);
    });

    $(document).on('click', '.submitComment', function (e) {
        e.preventDefault();
        let name = $('#name').val();
        let comment = $('#Textarea').val();


    });

    function findNewsById() {

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