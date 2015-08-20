EditableList
========

## Usage

Write your nested HTML lists like so:

    <div class='testList'></div>

Then activate with jQuery like so:

    <script>
            $(document).ready(function(){
                var myList = $(".testList").editablelist({
                    prefix: 'testList',
                    title: 'List Title',
                    group_title: 'Actual Items',
                    delete_confirm: 'Are you sure?',
                    values: ["One","Two","Three"]
                });
            });
        </script>

### Methods

You can get the list values in an array like this:

    var values = myList.getValues();

The array for the example above would be:

    ["One","Two","Three"]

### Configuration

You can change the follow options:

* `prefix` prefix for the inputs (default `edlist`)
* `title` title of the list (default `List title`)
* `group_title` title of the actual item list (default `Group title`)
* `delete_confirm` message whe you try to delete an item (default `Are you sure?`)

## Change Log

### 19th August 2015

* Create plugin and repository

* * *

Author: Guido Fonticelli

Copyright © 2015 Guido Fonticelli | BSD & MIT license