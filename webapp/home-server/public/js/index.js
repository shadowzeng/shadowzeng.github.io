var marked = require('marked');

var blogDom = document.getElementById('blog');

blogDom.addEventListener('keyup blur',function(){
    console.log(this.value);
});