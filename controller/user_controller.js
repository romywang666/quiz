function getUsers(){
    $.ajax({
        type:"POST",
        url:"model/users_model.php",
        data:{action:"get_all_users"},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
            //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
            alert('Get users from database error!');
        },
        success:function(data){
           displayUsers(data);
        }
    }); 
}




function updateUser(data){
    $.ajax({
        type:"POST",
        url:"model/users_model.php",
        data:data,
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
           window.location.href="admin_user.html";
        }
    });
}

function insertUser(data){
    $.ajax({
        type:"POST",
        url:"model/users_model.php",
        data:data,
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
            window.location.href="admin_user.html";
        }
    });
}

function deleteUser(user_id){
  //alert("controler user_id:"+user_id);
  $.ajax({
    type:"POST",
    url:"model/users_model.php",
    data:{user_id:user_id, action:"delete_users"},
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
        //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
        alert('Database Error!');
    },
    success:function(data){
      //alert(data);
      //window.location.reload();
    }
  });
}


