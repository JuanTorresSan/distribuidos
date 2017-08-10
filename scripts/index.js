// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("traercoordenadas").onclick = function () {
            getLocalizacion();
        };

        document.getElementById("traerInfo").onclick = function () {
            activarCamara();
        };


    };

    function getLocalizacion() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
    }

    function onSuccess(position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;
        document.getElementById("coordenadas").innerHTML = latitud + " " + longitud;
    }

    function onError(error) {
        alert("no hay GPS");
    }


    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };


    // Add Record
function addRecord() {
    // get values
    var delito = $("#delito").val();
    var latitud = $("#latitude").val();
    var longitud = $("#longitude").val();

    // Add record
    $.post("http://tlatoanicloud.com/equipo4/addRecord.php", {
        delito: delito,
        latitude: latitude,
        longitude: longitude

    }, function (data, status) {
        // close the popup
        $("#add_new_record_modal").modal("hide");

        // read records again
        readRecords();

        // clear fields from the popup
        $("#delito").val("");
        $("#latitude").val("");
        $("#longitude").val("");

    });
}

// READ records
function readRecords() {
    $.get("http://tlatoanicloud.com/equipo4/addRecord.php", {}, function (data, status) {
        $(".records_content").html(data);
    });
}




function GetUserDetails(id) {
    // Add User ID to the hidden field for furture usage
    $("#hidden_user_id").val(id);
    $.post("http://tlatoanicloud.com/equipo4/readUserDetails.php", {
            id: id
        },
        function (data, status) {
            // PARSE json data
            var user = JSON.parse(data);
            // Assing existing values to the modal popup fields
            $("#update_delito").val(user.update_delito);
            $("#update_latitude").val(user.last_latitude);
            $("#update_lonjitude").val(user.update_lonjitude);

        }
    );
    // Open modal popup
    $("#update_user_modal").modal("show");
}
    
    

} )();
