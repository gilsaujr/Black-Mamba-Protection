$(document).ready(function () {

    $('#lnkLogin').click(function () {

        $(this).html('<img src="/images/loading_spinner.gif" style="border:none;height:25px;" />');

        setTimeout(function () {
            $(this).html('Login');
            $('#frmLogin').submit();
        }, 2000);
    });

    $('#lnkForgotPwd').click(function () {

        $(this).html('<img src="/images/loading_spinner.gif" style="border:none;height:25px;" />');

        setTimeout(function () {
            $(this).html('Send Email');
            $('#closeFPwd').click();
            $('#modal_forgotpwd_msg').modal('show');
        }, 2000);
    });

    //set focus
    $('#txt_username_login').focus();
});