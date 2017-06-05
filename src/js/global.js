$(function(){
    $.getJSON('projects.json', function(data){
        for (var i=0;i<data.length;i++) {
            var arrary = data[i];
            $('.projects').append('<div class="name">'+arrary.name+'</div><div class="github">'+arrary.github+'</div><div class="demo"><a href="'+arrary.demo+'">Demo</a></div>')
        }
    });
});