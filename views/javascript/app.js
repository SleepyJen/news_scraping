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
        $('.commentArea').empty();
        let id = $(this).attr('id');
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
        renderComments(id);

    });

    $(document).on('click', '.submitComment', function (e) {
        e.preventDefault();
        let name = $('#name').val();
        let comment = $('#Textarea').val();
        let newsId = $(this).attr('id');

        findNewsById(newsId, result => {
            console.log(result);
            addComment(newsId, name, comment, commentResult => {
                renderComments(newsId);
            });
        });
    });

    $(document).on('click', '.deleteBtn', function () {
        const id = $(this).attr('id');
        const newsId = $(this).attr('data');
        deleteComment(newsId, id, result => {
            renderComments(newsId);
        });
    });

    function deleteComment(newsId, id, cb) {
        $.ajax({
            method: 'POST',
            url: `/news/deleteComment/${newsId}`,
            data: { id: id }
        }).then(result => {
            cb(result);
        });
    }

    function renderComments(newsId) {
        findNewsById(newsId, result => {
            console.log(result[0].comments);
            let comments = result[0].comments;
            $('.commentArea').empty();
            for (let i = 0; i < comments.length; i++) {
                $('.commentArea').prepend(`
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="card-title">${comments[i].name}</h5>
                    <p class="card-text">${comments[i].comment}</p>
                    <button class="btn btn-danger deleteBtn" id="${comments[i]._id}" data="${newsId}">Delete</button>
                </div>
            </div>`);
            }
        });
    }

    function addComment(id, name, comment, cb) {
        $.ajax({
            method: 'POST',
            url: `/news/comment/${id}`,
            data: {
                name: name,
                comment: comment
            }
        }).then(result => {
            cb(result);
        });
    }

    function findNewsById(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/news/findById/${id}`
        }).then(result => {
            cb(result);
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