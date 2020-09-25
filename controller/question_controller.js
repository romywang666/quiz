function getQuestions(){
    $.ajax({
        type:"POST",
        url:"model/questions_model.php",
        data:{action:"get_all_questions"},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
            //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
            alert('Database Error!');
        },
        success:function(data){
           //alert(data);
           console.log("li Wang" +data);
           displayQuestions(data);
        }
    }); 
}

function getQuestionImage(id){
    $.ajax({
        type:"POST",
        url:"model/questions_model.php",
        data:{id:id, action:"get_questionImage"},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert('getQuestionImage readyState:'+XMLHttpRequest.readyState + '   status:'+
            //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
            alert('Database Error!');
        },
        success:function(data){
           //console.log(data);
           //alert(data);
           displayImage(data);
        }
    }); 
}

function deleteQuestion(id){
    //alert(id);
    //var returnValue = window.confirm("Delete can not rollback! Are you sure?");
    //if (!returnValue) {
    //    return;
    //    alert('deleted');
    //}

    $.ajax({
        type:"POST",
        url:"model/questions_model.php",
        data:{id:id, action:"delete_question"},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
            //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
            alert('Database Error!');
        },
        success:function(){
            //alert(data);
            //window.location.reload();
        }
    });
}

function insertQuestion(data){
    console.log("question:  " + data);

    $.ajax({
        type:"POST",
        url:"model/questions_model.php",
        data:data,
        datatype: "json",
        enctype: 'multipart/form-data',
        processData: false, //设置为false,因为data值是FormData对象，不需要对数据做处理
        contentType: false, //设置为false,因为是构造的FormData对象
        //dataType: 'json', //status为200 却调用了error方法, dataType为json，但是返回的data不是json格式
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
            //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
            alert('Database Error!');
        },
        success:function(data){
            //alert( "Data Saved: " + data );
            //console.log(data);
            window.location.href="admin.html";
        }
    });
}


function updateQuestion(data){
    //alert("question:  " + JSON.stringify(data));
    //console.log(data);

    $.ajax({
        type:"POST",
        url:"model/questions_model.php",
        data:data,
        datatype: "json",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
            //  XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
            alert('Database Error!');
        },
        success:function(data){
            //alert( "Data Saved: " + data );
            window.location.href = "admin.html";
        }
    });
}