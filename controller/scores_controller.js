function onload(){
    //alert('get scores');
    getScores();
}

function getScores(){
    //alert('getscores');
    $.ajax({
        type:"POST",
        url:"model/scores_model.php",
        data:{action:"get_all_scores"},
        error: function() { alert("Jquery Ajax request error!!!"); },
        success:function(data){
            //alert();
            displayScores(data,'down');
        }
    });
}