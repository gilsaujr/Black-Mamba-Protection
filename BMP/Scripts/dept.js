$(document).ready(function () {

    //add dept btn, reset fields in modal
    $('#btn_add_dept').click(function () {
        var pDept = $('#sel_dept');
        var deptName = $('#txt_dept_name');
        var title = $('#title_add_dept');
        var editFlag = $('#hid_dept_id');
        var btnEdit = $('#btn_update_dept_modal');
        var btnAdd = $('#btn_add_dept_modal');

        editFlag.val('');
        pDept.val('');
        deptName.val('');
        title.text('Add Department');
        btnEdit.hide();
        btnAdd.show();
    });

    //add dept button in modal
    $('#btn_add_dept_modal, #btn_update_dept_modal').click(function () {
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmDept').submit();
        }, 2000);
    });

    //edit dept, fill info in modal
    $('.edit_dept').click(function () {
        var pDept = $('#sel_dept');
        var deptName = $('#txt_dept_name');
        var deptId = $(this).attr('data-id');
        var title = $('#title_add_dept');
        var deptIdHid = $('#hid_dept_id');
        var btnEdit = $('#btn_update_dept_modal');
        var btnAdd = $('#btn_add_dept_modal');

        deptIdHid.val(deptId);
        pDept.val($(this).attr('data-parent-id'));
        deptName.val($(this).attr('data-name'));
        title.text('Update Department');
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
            $('#frmDept').submit();
        }, 2000);
    });

    //save all selected, to delete in a while, after user confirms in modal
    $('#delSelected').click(function () {
        var selected = $("input[name='chkDept']:checked");
        var hid_del_depts = $('#hid_del_depts');

        //clear form field
        hid_del_depts.val('');

        //get all selected checkboxes
        if (selected.length > 0) {
            selected.each(function () {
                hid_del_depts.val(hid_del_depts.val() + ',' + $(this).attr('data-id'));
            });
        }
        if (hid_del_depts.val().length > 0) hid_del_depts.val(hid_del_depts.val().substr(1));
    });

    //delete single record
    $('.rem_dept').click(function () {
        var hid_del_depts = $('#hid_del_depts');

        //clear form field
        hid_del_depts.val('');

        //get all selected checkboxes
        hid_del_depts.val($(this).attr('data-id'));
        
        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmDept').submit();
        }, 2000);

    });

});