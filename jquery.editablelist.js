// Para usar este plugin son necesarios:
// JQuery
// Bootstrap 3
// Nestable
// IBox css from Inspinia Admin template

(function( $ ) {

    'use strict';

    $.fn.getValues = function () {
        var rtrn = new Array;
        $(this).find('.inputTxt').each(function(){
            rtrn.push($(this).val());
        });

        return rtrn;
    };

    $.fn._getItemHtml = function (options) {

        var defaults = {
            value:"",
            prefix:"",
            delete_confirm: "Esta seguro?"
        };

        var opts = $.fn.extend(defaults, options);


        var $list = $('<li>',{ class:"dd-item dd3-item" });
        $list.append(
            $('<i>',{ class:"dd-handle dd3-handle fa fa-bars" }).html('Drag')
        );
        var $divContent = $("<div>", {class: "dd3-content"});
        var $divRow = $("<div>", {class: "row"});
        var $divHiddenInputDiv = $("<div>", {class: "col-md-8 contentInput",style:"display: none"});
        var $input = $("<input>",{class:"form-control inputTxt",type:"text",name:opts.prefix+"_value[]"}).val(opts.value);
        $divHiddenInputDiv.append($input);

        //save input value
        $input.keypress(function(e) {
            if(e.which == 13) {
                if($input.val()!=''){
                    $divContentText.html($input.val());
                    $divContentText.show();
                    $btnEdit.show();
                    $divHiddenInputDiv.hide();
                }
                return false;
            }
        });

        var $divContentText = $("<div>", {class: "col-md-8 contentText", style:"margin-top: 7px"}).html(opts.value);

        var $divContentActions = $("<div>", {class: "col-md-4 text-right contentActions"});
        var $btnEdit = $("<button>", {type: "button",class:"btn btn-primary btnEdit",style:"margin-right:5px"}).append(
            $("<i>", { class:"fa fa-pencil" } )
        );
        var $btnDelete = $("<button>", {type: "button",class:"btn btn-danger btnDelete"}).append(
            $("<i>", { class:"fa fa-trash" } )
        );
        $btnDelete.click(function(){
            if (confirm(opts.delete_confirm)){
                $list.remove();
            }
        });

        $btnEdit.click(function(){
            $input.val($divContentText.html());
            $divHiddenInputDiv.show();
            $divContentText.hide();
            $btnEdit.hide();
            $input.focus();
        });

        $divContentActions.append($btnEdit);
        $divContentActions.append($btnDelete);

        $divRow.append($divHiddenInputDiv);
        $divRow.append($divContentText);
        $divRow.append($divContentActions);
        $divContent.append($divRow);

        $list.append($divContent);

        return $list;
    };

    $.fn.editablelist = function (options) {

        var $this = this;

        // Opciones por defecto si no se indican
        var defaults = {
            prefix:"edlist",
            title:"List title",
            group_title: "Group title",
            delete_confirm: "Are you sure?",
            values: new Array
        };

        // Extiende las opciones
        var opts = $.fn.extend(defaults, options);


        var $ibox = $("<div>",{class:"ibox float-e-margins"});
            var $divTitle = $("<div>", {class: "ibox-title"});
                $divTitle.html($("<h5>").html(opts.title));

            var $divContent = $("<div>", {class: "ibox-content"});
                var $input = $("<input>",{class:"form-control contentMatchesTxt",name:"content",type:"text", id:"content",style:"margin-bottom:10px"});
                var $divPanel = $("<div>", {class: "panel panel-default"});
                    $divPanel.append(
                        $("<div>", {class: "panel-heading"}).html(opts.group_title)
                    );
                    var $inputCantidad = $("<input>",{class:"cantidad",name:"cantidad",type:"hidden", value:"0"});
                    var $divPanelBody = $("<div>", {class: "panel-body"});
                        var $divNestable = $("<div>", {class: "dd", id:"nestable"});
                        var $olList =  $("<ol>", {class: "dd-list"});
                        $divNestable.append($olList);

        if(opts.values.length !== 0){
            $(opts.values).each(function(k,v){
                $olList.append(
                    $this._getItemHtml({
                        value: v,
                        prefix: opts.prefix,
                        delete_confirm: opts.delete_confirm
                    })
                )
            })
        }

        //add new item
        $input.keypress(function(e) {
            if(e.which == 13) {
                if($input.val()!=''){
                    $olList.append(
                        $this._getItemHtml({
                            value: $input.val(),
                            prefix: opts.prefix,
                            delete_confirm: opts.delete_confirm
                        })
                    );
                    $input.val("");
                }
                return false;
            }
        });

        $divPanelBody.append($divNestable);
        $divPanel.append($divPanelBody);

        $divContent.append($input);
        $divContent.append($inputCantidad);
        $divContent.append($divPanel);

        $ibox.append($divTitle);
        $ibox.append($divContent);

        $(this).append($ibox);

        $divNestable.nestable({
            maxDepth:1,
            group:Math.random() * (10 - 1) + 1
        });

        return this;

    };

}( jQuery ));

