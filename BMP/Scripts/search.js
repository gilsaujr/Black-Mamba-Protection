$(document).ready(function () {

    //Date selectors
    $("#txt_DateFrom").datepicker();
    $("#txt_DateTo").datepicker();

    //pages
    $('#sel_page').change(function () {
        $('#hid_page_no').val($(this).val());
        $('#frmSearch').submit();
    });

    $('#txt_page_size').change(function () {
        $('#hid_page_size').val($(this).val());
    });

    //select all
    $("#chkAll").change(function () {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    //Confirm bulk delete and Get Page Results
    $('#del_confirm_proceed, #getPage, #btn_search').click(function () {

        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmSearch').submit();
        }, 2000);
    });

    //Delete item per row button
    $('.del_item').click(function () {
        var hid_del_docs = $('#hid_del_docs');
        hid_del_docs.val($(this).attr('data-id'));

        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
            $('#frmSearch').submit();
        }, 2000);
    });

    //Toggle Delete Checkboxes
    $('#delSelected').click(function () {
        var selected = $("input[name='chkDoc']:checked");
        var hid_del_docs = $('#hid_del_docs');

        //clear form field
        hid_del_docs.val('');

        //get all selected checkboxes
        if(selected.length > 0){
            selected.each(function () {
                hid_del_docs.val(hid_del_docs.val() + ',' + $(this).attr('data-id'));
            });
        }
        if (hid_del_docs.val().length > 0) hid_del_docs.val(hid_del_docs.val().substr(1));
    });

    
    //transfer selected
    $('#tranSelected').click(function () {

    });

    //join videos selected
    $('#joinSelected').click(function () {

    });

    //View (eye icon) button
    $('.view_doc').click(function () {
        var btn = $(this);
        var id = btn.attr('data-id');
        var src = btn.attr('data-src');

        $('#modal_view_doc_id').text(id);
        $('#modal_view_doc_src1').attr('value', src);
        $('#modal_view_doc_src2').attr('src', src);
    });

    //Edit (pencil icon) button
    $('.edit_doc').click(function () {
        var btn = $(this);
        var id = btn.attr('data-id');
        var src = btn.attr('data-src');
        var grade = btn.attr('data-doc-grade');

        $('#modal_edit_doc_id').text(id);
        $('#modal_edit_doc_src1').attr('value', src);
        $('#modal_edit_doc_src2').attr('src', src);
        $('#modal_edit_doc_grade').val(grade);

        //get comment
        $.get("../videos/getdoccomment?docId="+id, function (data) {
            $('#modal_edit_doc_comment').text(data);
        });
    });

    //Save Button in Edit Modal
    $('#modal_edit_doc_save').click(function () {
        var id = $('#modal_edit_doc_id').text();
        var grade = $('#modal_edit_doc_grade').val();
        var comment = $('#modal_edit_doc_comment').val();

        console.log('id: ' + id);
        console.log('grade: ' + grade);
        console.log('comment: ' + comment);


        $('#hid_doc_id').val(id);
        $('#hid_doc_grade').val(grade);
        $('#hid_doc_comment').val(comment);

        //loading sign
        $(this).html('<img src="../images/loading_spinner.gif" style="height:20px;" />');

        //wait, then submit form
        setInterval(function () {
          $('#frmSearch').submit();
        }, 2000);
    });

    //Update progress
    setInterval(function () {
        $.post("../videos/searchTable", function (data) {
            $('#tblSearch').html(data);
        });
    }, 5000); //5 seconds
    
});