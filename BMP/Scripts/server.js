$(document).ready(function () {

    //add server btn, reset fields in modal
    $('#btn_add_server').click(function () {
        var pServer = $('#sel_server');
        var serverName = $('#txt_server_name');
        var ipAddy = $('#txt_ip_address');
        var saveFilePath = $('#txt_save_file_path');
        var saveDays = $('#txt_save_days');
        var title = $('#title_add_server');
        var editFlag = $('#hid_server_id');
        var btnEdit = $('#btn_update_server_modal');
        var btnAdd = $('#btn_add_server_modal');

        editFlag.val('');
        pServer.val('');
        serverName.val('');
        ipAddy.val('');
        saveFilePath.val('');
        saveDays.val('');
        title.text('Add Server');
        btnEdit.hide();
        btnAdd.show();
    });

    //add server button in modal
    $('#btn_add_server_modal, #btn_update_server_modal').click(function () {
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmServer').submit();
        }, 2000);
    });

    //edit server, fill info in modal
    $('.edit_server').click(function () {
        var pServer = $('#sel_server');
        var serverName = $('#txt_server_name');
        var ipAddy = $('#txt_ip_address');
        var saveFilePath = $('#txt_save_file_path');
        var saveDays = $('#txt_save_days');
        var serverId = $(this).attr('data-id');
        var title = $('#title_add_server');
        var serverIdHid = $('#hid_server_id');
        var btnEdit = $('#btn_update_server_modal');
        var btnAdd = $('#btn_add_server_modal');

        serverIdHid.val(serverId);
        pServer.val($(this).attr('data-parent-id'));
        serverName.val($(this).attr('data-name'));
        ipAddy.val($(this).attr('data-ip-address'));
        saveFilePath.val($(this).attr('data-save-file-path'));
        saveDays.val($(this).attr('data-save-days'));
        title.text('Update Server');
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
            $('#frmServer').submit();
        }, 2000);
    });

    //save all selected, to delete in a while, after user confirms in modal
    $('#delSelected').click(function () {
        var selected = $("input[name='chkServer']:checked");
        var hid_del_servers = $('#hid_del_servers');

        //clear form field
        hid_del_servers.val('');

        //get all selected checkboxes
        if (selected.length > 0) {
            selected.each(function () {
                hid_del_servers.val(hid_del_servers.val() + ',' + $(this).attr('data-id'));
            });
        }
        if (hid_del_servers.val().length > 0) hid_del_servers.val(hid_del_servers.val().substr(1));
    });

    //delete single record
    $('.rem_server').click(function () {
        var hid_del_servers = $('#hid_del_servers');

        //clear form field
        hid_del_servers.val('');

        //get all selected checkboxes
        hid_del_servers.val($(this).attr('data-id'));
        
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmServer').submit();
        }, 2000);

    });

});