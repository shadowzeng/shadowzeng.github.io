import $ from 'jquery';
import marked from 'marked';

$('#blog').on("keyup blur",function () {
    $('#show').html(marked($(this).val()))
})
