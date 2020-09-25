function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level === "ADMIN") {
        getQuestions();
    }
    else {
        window.location.href="index.html";
    }

}

function displayQuestions(respond_data){
    //console.log(respond_data);
    //alert(respond_data);
    if (respond_data == "CONNECTION_ERROR") {
        console.log("000 Database Error!");
        return;
    }

    if ((respond_data == "NO_DATA")|| (respond_data == null)) {
        console.log("001 No data return.");
        return;
    }

    if (respond_data.length == 0) {
        console.log("002 No data return.");
        return;
    }

    let items = JSON.parse(respond_data);


    //When receiving data from a web server, the data is always a string.
    //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    //var item = JSON.parse(data);
    //console.log(items);

    layui.use('table', function() {
        let table = layui.table;

        table.render({
            elem: '#question_table'
            , toolbar: '#question_table_toolbar' //set tool bar on table top
            , defaultToolbar: ['filter', 'exports', 'print']
            , cols: [[ //Table Top Title
                {type:'checkbox'}
                , {field: 'id', title: 'ID', width: 80, sort: true}
                , {field: 'question', title: 'Question', width: 250}
                , {field: 'quest_type', title: 'Difficulty', width: 120, sort: true}
                , {field: 'answer1', title: 'Option1', width: 200}
                , {field: 'answer2', title: 'Option2', width: 200}
                , {field: 'answer3', title: 'Option3', width: 200}
                , {field: 'answer4', title: 'Option4', width: 200}
                , {field: 'correct_answer', title: 'Answer', width: 80}
                , {fixed: 'right', title:'Operation', toolbar: '#Operation_bar', width:178}
            ]]
            //, data: [{'id':'10','question':'a question','quest_type':'diff','answer1':'b','answer2':'c','answer3':'d','answer4':'a', 'correct_answer':'c'}]
            , data:items
            , page: true //show multiple pages
        });


        //Toolbar event
        table.on('toolbar(question_table)', function(obj){
            let checkStatus = table.checkStatus(obj.config.id);
            switch(obj.event){
                case 'getCheckData':
                    //let data = checkStatus.data;
                    //layer.alert('1st: '+JSON.stringify(data));
                    //alert(JSON.stringify(checkStatus.data));
                    //console.log(JSON.stringify(checkStatus.data));
                    break;
                case 'getCheckLength':
                    //let data = checkStatus.data;
                    window.location.href="add_question.html";
                    break;
            };
        });

        //Listen checkbox click event
        table.on('checkbox(question_table)', function(obj){
            //console.log(obj)
        });

        //Listen events from Operation bar
        table.on('tool(question_table)', function(obj){
            let data = obj.data;

            //Detail Event:
            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' detail');
                //alert(data.id);

            //Delete Event:
            } else if(obj.event === 'del'){
                layer.confirm('Delete can not rollback! Are you sure?', function(index){
                    obj.del();
                    layer.close(index);
                    deleteQuestion(data.id);
                });

                //if (window.confirm("Delete can not rollback! Are you sure?")) {
                //    obj.del();
                //    //console.log(data.id);
                //    deleteQuestion(data.id);
                //}

            //Edit Event:
            } else if(obj.event === 'edit'){
                //layer.alert('Edit this row: <br>'+ JSON.stringify(data))
                //console.log(data.id + data.question);
                jumpToEditQuestion(data.id, data.question, data.quest_type, data.answer1, data.answer2, data.answer3, data.answer4, data.correct_answer);
            }
        });

    });



}


function jumpToEditQuestion(id, question, quest_type, answer1, answer2,
    answer3, answer4, correct_answer){

    window.location.href="edit_question.html?id="+id+"&question="+question+"&quest_type="+quest_type+"&answer1="+
                answer1+"&answer2="+answer2+"&answer3="+answer3+"&answer4="+answer4+"&correct_answer="+correct_answer;
}


