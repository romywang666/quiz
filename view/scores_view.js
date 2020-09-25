var item;

function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level !== "TESTER") {
        logoutQuiz();
    }
}

function displayScores(data, sort){
    //alert(data);
    var rec_item = JSON.parse(data);
    if (sort=='up'){
        //alert('up');
        item = rec_item.sort(sortScoresUP);
    }else{
        //alert('down');
        item = rec_item.sort(sortScoresDown);
    }
    setScoresView();
    $("span.scores_title").html('Score&nbsp;DEC');
}

function sortScoresUP(a,b){
    return a.score-b.score;
}

function sortScoresDown(a,b){
    return b.score-a.score;
}

function scoresOnclick(){
    //down
    //alert($("span.scores_title").html());
    if ($("span.scores_title").html() == 'Score&nbsp;DEC'){
        //alert($(".scores_title").html);
        item = item.sort(sortScoresUP);
        $(".scores_area").empty();
        setScoresView();
        $("span.scores_title").html('Score&nbsp;ASC');
    //up
    } else {
        //alert($(".scores_title").html);
        item = item.sort(sortScoresDown);
        $(".scores_area").empty();
        setScoresView();
        $("span.scores_title").html('Score&nbsp;DEC');
    }
}

function setScoresView(){
    //alert(item);
}