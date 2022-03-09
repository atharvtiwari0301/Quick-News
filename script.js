console.log("This is index.js");

// Initialize the news api parameters
let source = 'bbc-news';
let apiKey = 'fd7f8808ed734607b76bda0496cb9887'

// Taking the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open(`GET`, `https://newsapi.org/v2/top-headlines?sources=${source}&apikey=${apiKey}`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsHtml = "";
        articles.forEach(function (element, index) {
            let news = `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}"
                    aria-expanded="true"
                    aria-controls="collapse${index}"
                >${element["title"]}
                </button>
            </h2>
            <div
                id="collapse${index}"
                class="accordion-collapse collapse"
                aria-labelledby="heading${index}"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body">
                <img src="${element["urlToImage"]}">
                    <p>${element["content"]}</p>.<a href="${element['url']}" target="_blank">Read more</a>
                </div>
            </div>
        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    } else {
        console.log("Some error occured");
    }
}

xhr.send();

