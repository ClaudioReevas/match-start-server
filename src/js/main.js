$(document).ready(function() {
        console.log("ready!");
        let url = "https://match-start-server.herokuapp.com/next";

        $.getJSON(url, data => {
            $('#izquierda img').attr('src', data.first.image);
            $('#izquierda .likes').text(data.first.likes);
            $('#derecha img').attr('src', data.second.image);
            $('#derecha .likes').text(data.second.likes);

            console.log(data.first.image);
            console.log(data.second.image);
            console.log(data.first.likes);
            console.log(data.second.likes);

            if (voto()) {
                data.first.likes++;
                console.log(result);
            }

        });
    }



);

function voto() {
    let url = "https://match-start-server.herokuapp.com/next";
    $.getJSON(url, data => {
        $('#izquierda .likes').text(data.first.likes);

        voto = data.first.likes;

        console.log(voto);

    });


}