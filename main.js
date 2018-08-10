
var currentPage,
    lastPage;

window.addEventListener('load',function(){
    fetchProduct(1);
    let images = document.querySelector('img');
    if(images != null){
        images.addEventListener('load', function(event){
        this.classList.remove('loading');
        })
    }
});

window.addEventListener('scroll', () => {
    let bottom = bottomVisible()
    if(bottom){
        // console.log("at the bottom");
        if(currentPage < lastPage){
            fetchProduct(currentPage + 1)
            // console.log("loaded page "+ currentPage);
        } 
    }
})



function fetchProduct(page){
    document.querySelector('.spinner').style.display = "block";
    fetch('http://localhost:3000/products?page='+page)
        .then(
            function(response) {
                document.querySelector('.spinner').style.display = "none";
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                
                response.json().then(function(data) {
                    currentPage = data.current_page;
                    lastPage = data.last_page;
                    populatePage(data.data)
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}

function populatePage(data){
    var posts =document.querySelector('#posts');
    for (let index = 0; index < data.length; index++) {
        const post = data[index];
        const htmlData =`<div class="col-md-6">
                            <div class="card mb-2">
                                <img class="card-img-top loading" 
                                 src="https://loremflickr.com/440/400?random=${index+1}" 
                                   width="100%" height="200px;">
                                <div class="card-block">
                                    <h4 class="card-title text-center text-info">${post.title}</h4>
                                    <p class="card-text">
                                     ${post.title}
                                    </p>
                                </div>
                            </div>
                        </div>`;
        let divPost = document.createElement('div');
        divPost.innerHTML = htmlData;
        posts.appendChild(divPost);
    }
}