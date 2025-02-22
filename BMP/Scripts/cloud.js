$(document).ready(function () {

    //add cloud btn, reset fields in modal
    $('#btn_add_cloud').click(function () {
        var pCloud = $('#sel_cloud');
        var cloudName = $('#txt_cloud_name');
        var endpoint = $('#txt_endpoint');
        var apikey = $('#txt_apikey');
        var username = $('#txt_username');
        var title = $('#title_add_cloud');
        var editFlag = $('#hid_cloud_id');
        var btnEdit = $('#btn_update_cloud_modal');
        var btnAdd = $('#btn_add_cloud_modal');

        editFlag.val('');
        pCloud.val('');
        cloudName.val('');
        endpoint.val('');
        apikey.val('');
        username.val('');
        title.text('Add Cloud');
        btnEdit.hide();
        btnAdd.show();
    });

    //add cloud button in modal
    $('#btn_add_cloud_modal, #btn_update_cloud_modal').click(function () {
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmCloud').submit();
        }, 2000);
    });

    //edit cloud, fill info in modal
    $('.edit_cloud').click(function () {
        var pCloud = $('#sel_cloud');
        var cloudName = $('#txt_cloud_name');
        var endpoint = $('#txt_endpoint');
        var apikey = $('#txt_apikey');
        var username = $('#txt_username');
        var cloudId = $(this).attr('data-id');
        var title = $('#title_add_cloud');
        var cloudIdHid = $('#hid_cloud_id');
        var btnEdit = $('#btn_update_cloud_modal');
        var btnAdd = $('#btn_add_cloud_modal');

        cloudIdHid.val(cloudId);
        pCloud.val($(this).attr('data-parent-id'));
        cloudName.val($(this).attr('data-name'));
        endpoint.val($(this).attr('data-endpoint'));
        apikey.val($(this).attr('data-apikey'));
        username.val($(this).attr('data-username'));
        title.text('Update Cloud');
        btnEdit.show();
        btnAdd.hide();
    });

    //select all
    $("#chkAll").change(function () {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    //Confirm bulk delete and Get Page Results
    $('#del_confirm_proceed').click(function () {

        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmCloud').submit();
        }, 2000);
    });

    //save all selected, to delete in a while, after user confirms in modal
    $('#delSelected').click(function () {
        var selected = $("input[name='chkCloud']:checked");
        var hid_del_clouds = $('#hid_del_clouds');

        //clear form field
        hid_del_clouds.val('');

        //get all selected checkboxes
        if (selected.length > 0) {
            selected.each(function () {
                hid_del_clouds.val(hid_del_clouds.val() + ',' + $(this).attr('data-id'));
            });
        }
        if (hid_del_clouds.val().length > 0) hid_del_clouds.val(hid_del_clouds.val().substr(1));
    });

    //delete single record
    $('.rem_cloud').click(function () {
        var hid_del_clouds = $('#hid_del_clouds');

        //clear form field
        hid_del_clouds.val('');

        //get all selected checkboxes
        hid_del_clouds.val($(this).attr('data-id'));
        
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmCloud').submit();
        }, 2000);

    });

});