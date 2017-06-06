var data = [
    {
        "name": "BookmarkletJS",
        "github": "https://github.com/DimidCO/BookmarkletJS",
        "demo": "/BookmarkletJS"
    },
    {
        "name": "Fake",
        "github": "https://github.com/DimidCO/Sample",
        "demo": "/Fake"
    },
    {
        "name": "Sample",
        "github": "https://github.com/DimidCO/Sample",
        "demo": "/Sample"
    }
];

$(function(){
//    $.getJSON('projects.json', function(data){
        for (var i=0;i<data.length;i++) {
            var arrary = data[i];
            $('.projects').append('<name>'+arrary.name+'</name><a href="'+arrary.demo+'" target="_blank">Demo</a><github>'+arrary.github+'</github>')
        }
//    });
});