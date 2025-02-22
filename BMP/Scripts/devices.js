$(document).ready(function () {

    //Update progress
    setInterval(function () {
        $.get("../videos/devicesTable", function (data) {
            $('#tblDevices').html(data);
        });
    }, 5000); //5 seconds
});