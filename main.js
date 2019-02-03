$(document).ready( () =>{
    var btnsRemove = document.getElementsByClassName("btn btn-warning");
    for (var i = 0; i < btnsRemove.length; i++) {
    
        btnsRemove[i].addEventListener("click",function () {
            buy(event);
        });
    }

});


//Click event on btn_search make a ajax request to web api.
$( '#btn_search' ).on('click', function (e) {
  var search_string = $( '#input_search' ).val();
  
});


function buy(e){
    var target = e.target.parentElement;
    console.log(target);
}



