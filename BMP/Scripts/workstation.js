$(document).ready(function () {

    //add work btn, reset fields in modal
    $('#btn_add_work').click(function () {
        var pWork = $('#sel_work');
        var workName = $('#txt_work_name');
        var ipAddy = $('#txt_ip_address');
        var saveFilePath = $('#txt_save_file_path');
        var saveDays = $('#txt_save_days');
        var title = $('#title_add_work');
        var editFlag = $('#hid_work_id');
        var btnEdit = $('#btn_update_work_modal');
        var btnAdd = $('#btn_add_work_modal');

        editFlag.val('');
        pWork.val('');
        workName.val('');
        ipAddy.val($(this).attr('data-ip-address'));
        saveFilePath.val($(this).attr('data-save-file-path'));
        saveDays.val($(this).attr('data-save-days'));
        title.text('Add Workstation');
        btnEdit.hide();
        btnAdd.show();
    });

    //add work button in modal
    $('#btn_add_work_modal, #btn_update_work_modal').click(function () {
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmWork').submit();
        }, 2000);
    });

    //edit work, fill info in modal
    $('.edit_work').click(function () {
        var pWork = $('#sel_work');
        var workName = $('#txt_work_name');
        var ipAddy = $('#txt_ip_address');
        var saveFilePath = $('#txt_save_file_path');
        var saveDays = $('#txt_save_days');
        var workId = $(this).attr('data-id');
        var title = $('#title_add_work');
        var workIdHid = $('#hid_work_id');
        var btnEdit = $('#btn_update_work_modal');
        var btnAdd = $('#btn_add_work_modal');

        workIdHid.val(workId);
        pWork.val($(this).attr('data-parent-id'));
        workName.val($(this).attr('data-name'));
        ipAddy.val($(this).attr('data-ip-address'));
        saveFilePath.val($(this).attr('data-save-file-path'));
        saveDays.val($(this).attr('data-save-days'));
        title.text('Update Workstation');
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
            $('#frmWork').submit();
        }, 2000);
    });

    //save all selected, to delete in a while, after user confirms in modal
    $('#delSelected').click(function () {
        var selected = $("input[name='chkWork']:checked");
        var hid_del_works = $('#hid_del_works');

        //clear form field
        hid_del_works.val('');

        //get all selected checkboxes
        if (selected.length > 0) {
            selected.each(function () {
                hid_del_works.val(hid_del_works.val() + ',' + $(this).attr('data-id'));
            });
        }
        if (hid_del_works.val().length > 0) hid_del_works.val(hid_del_works.val().substr(1));
    });

    //delete single record
    $('.rem_work').click(function () {
        var hid_del_works = $('#hid_del_works');

        //clear form field
        hid_del_works.val('');

        //get all selected checkboxes
        hid_del_works.val($(this).attr('data-id'));
        
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmWork').submit();
        }, 2000);

    });

});