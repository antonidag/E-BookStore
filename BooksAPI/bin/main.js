﻿$(document).ready(() => {
    var btnsRemove = document.getElementsByClassName("btn btn-warning");
    for (var i = 0; i < btnsRemove.length; i++) {

        btnsRemove[i].addEventListener("click", function () {
            buy(event);
        });
    }






});

var uri = 'http://localhost:49879/api/books?title=';

//Click event on btn_search make a ajax request to web api.
$('#btn_search').on('click', function (e) {
    var search_string = $('#input_search').val();
    if (search_string.length > 0) {
        // Send an AJAX request
        uri += search_string;
        $.ajax({
            url: uri, success: function (result) {
                console.log(result);
            }
        });
    } else {
        uri = 'http://localhost:49879/api/books'
        $.ajax({
            url: uri, success: function (result) {
                console.log(result);
            }
        });  
    }


});


function buy(e) {
    var target = e.target.parentElement;
    console.log(target);
}