
function verifiedUser(user_name, password){
    $.ajax({
        type:"POST",
        url:"model/index_model.php",
        data:{user_name:user_name, password:password, action:"get_a_user"},
        //error: function() { alert("Jquery Ajax request error!!!"); },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                   //alert('readyState:'+XMLHttpRequest.readyState + '   status:'+
                   //       XMLHttpRequest.status + '    Text:' + XMLHttpRequest.responseText);
                   alert('Database Error!');
                   //window.location.href="/50x.html";
            },
        success:function(data){
            //alert(data);
            if (data == "ADMIN") {
                showAdminPage();
            } else if (data == "TESTER"){
                showUserPage();
            } else if ((data == "ERROR") || (data == 0)) {
                alert('User Name not found in database! '+ data);
            } else {
                alert(data);
            }
        }
    });
}

