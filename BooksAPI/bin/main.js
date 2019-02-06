$(document).ready(() => {
    $("#btn_checkout").on('click', function (e) {
        var body = $("#app");
        body[0].style.backgroundImage = "url('')";
        $("#bookcontainer").fadeOut();
        $("#checkout").delay(500).fadeIn();
    });
    $("#btn_backtoshop").on('click', function (e) {

        $("#checkout").fadeOut();
        $("#bookcontainer").delay(500).fadeIn();

    });
});

var uri = '';

//Click event on btn_search make a ajax request to web api.
$('#btn_search').on('click', function (e) {

    //If your in the checkout meny, then fade it out.
    $("#bookcontainer").html("");
    $("#checkout").fadeOut();
    $("#bookcontainer").delay(500).fadeIn();
    var body = $("#app");
    body[0].style.backgroundImage = "url('')";


    var search_string = $('#input_search').val();
    searchBooks(search_string);
});

// Make Ajax request to api
function searchBooks(input) {
    var searchby = $("#searchby").val();
    if (input.length > 0) {
        switch (searchby) {
            case "Title":
                uri = 'http://localhost:49879/api/books?title=' + input;
                apiReq(uri);
                break;
            case "Author":
                uri = 'http://localhost:49879/api/Books?author=' + input;
                apiReq(uri);
                break;
            default:
        }
    } else {
        uri = 'http://localhost:49879/api/Books';
        apiReq(uri);
    }


}

function apiReq(uri) {
    $.ajax({
        url: uri, success: function (result) {
            console.log(result);
            result.forEach((item) => addToView(item));
        }
    });
}


//Adds items to bookcontainer.
function addToView(item) {
    // Create all the divs and fill wiht info,
  var book_item = document.createElement("div");
  book_item.className = "book_item";
  book_item.id = "book";

  var img = document.createElement("img");
  img.src = "img/book.svg";

  var title = document.createElement("h3");
  title.innerHTML = item.Title;

  var author = document.createElement("p");
  author.innerHTML = "<strong>" + item.Author + "</strong>"

  var genre = document.createElement("p");
  genre.innerHTML = "<i>" + item.Genre + "</i>";

  var publish = document.createElement("p");
  publish.innerHTML = "Publish in: " + item.Publish_Date.substring(0,10);

  var pDes = document.createElement("p");
  pDes.innerHTML = item.Description;

  var price = document.createElement("p");
  price.innerHTML = "<strong>Price: " + item.Price + " $</strong>";

    //Create btn and add click event.
  var btn = document.createElement("button");
  btn.id = "btn_buy";
  btn.type = "button";
  btn.className = "btn btn-warning";
  btn.innerHTML = "Buy Now";
  btn.addEventListener("click", (event) => buy(event));

  
  book_item.appendChild(img);
  book_item.appendChild(title);
  book_item.appendChild(author);
  book_item.appendChild(genre);
  book_item.appendChild(publish);
  book_item.appendChild(pDes);
  book_item.appendChild(price);
  book_item.appendChild(btn);

  var currentDiv = document.getElementById("bookcontainer");
  currentDiv.appendChild(book_item);

}

// Click event on btn_buy
function buy(e) {
    var target = e.target.parentElement;
    console.log(target);
    var title = target.childNodes[1].innerHTML;
    var strPrice = target.childNodes[6].childNodes[0].innerHTML;

    var price = parseFloat(strPrice.substring(7, strPrice.length - 2));
    console.log(price);

    addToCheckOut(title, price);
    
}


// Adds book to checkout.
var sumPrice = 0;
var numberOfBooks = 1;
function addToCheckOut(title, price){
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = title;

    var ul = document.getElementById("checkoutlist");
    ul.appendChild(li);
    sumPrice += price;

    var textprice = document.getElementById("sumPrice");
    textprice.innerHTML = "<strong>Summary: " + sumPrice + " $</strong>";
    $("#btn_checkout").html(numberOfBooks++);
}
