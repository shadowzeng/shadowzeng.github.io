var $ = require('jquery');
var marked = require('marked');

$('#blog').on("keyup blur",function () {
    $('#show').html(marked($(this).val()))
})