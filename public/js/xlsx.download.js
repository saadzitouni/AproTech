$('#button').click(function(){
    $('#mytable').table2excel({
        exclude:".noExl",
        name:"StudentTble",
        filename:"StudentTble"
    });
});