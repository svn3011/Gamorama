var srch = document.querySelector("#search");

srch.addEventListener('keyup', filterGames);

function filterGames() {
    var srcv = srch.value.toUpperCase();


    var divs = document.querySelectorAll(".card");

    divs.forEach(function(div){
        var gname = div.querySelector("#gname").innerHTML;

        if(gname.toUpperCase().indexOf(srcv) > -1){
            div.style.display = '';
        } else {
            div.style.display = 'none';
        }
    })
}