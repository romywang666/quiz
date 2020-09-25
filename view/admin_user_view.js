function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level === "ADMIN") {
        getUsers();
    }
    else {
        window.location.href="index.html";
    }

    //let s = '[{"id":"10","user_name":"QU0001","user_level":"ADMIN","first_name":"Mike","last_name":"Jackson", ' +
    //  '"sex":"Male","birth_date":"1969/09/09","email":"xxx@gmail.com","phone_no":"627-829-0010","address":"6776 stree"}]';
    //displayUsers(s);
}


function displayUsers(respond_data){
    //console.log(respond_data);

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
    //console.log(items[0]);


    layui.use('table', function() {
        let table = layui.table;

        table.render({
            elem: '#users_table'
            , toolbar: '#users_table_toolbar' //set tool bar on table top
            , defaultToolbar: ['filter', 'exports', 'print']
            , cols: [[ //Table Top Title
                {type:'checkbox'}
                , {field: 'id', title: 'ID', width: 50}
                , {field: 'user_name', title: 'User Name', width: 120, sort: true}
                , {field: 'user_level', title: 'Role', width: 100}
                , {field: 'first_name', title: 'First Name', width: 100}
                , {field: 'last_name', title: 'Last Name', width: 100}
                , {field: 'sex', title: 'Sex', width: 80}
                , {field: 'birth_date', title: 'Birth Date', width: 110}
                , {field: 'email', title: 'Email', width: 220}
                , {field: 'phone_no', title: 'Phone#', width: 120}
                , {field: 'address', title: 'Address'}
                , {fixed: 'right', title:'Operation', toolbar: '#Operation_bar', width:178}
            ]]
            , data:items
            , page: true //show multiple pages
        });


        //Toolbar event
        table.on('toolbar(users_table)', function(obj){
            let checkStatus = table.checkStatus(obj.config.id);
            switch(obj.event){
                case 'getCheckData':
                    //let data = checkStatus.data;
                    //layer.alert('1st: '+JSON.stringify(data));
                    //alert(JSON.stringify(checkStatus.data));
                    console.log(JSON.stringify(checkStatus.data));
                    break;
                case 'getCheckLength':
                    //let data = checkStatus.data;
                    window.location.href="add_user.html";
                    break;
            };
        });


        //Listen checkbox click event
        table.on('checkbox(users_table)', function(obj){
            //console.log(obj)
        });


        //Listen events from Operation bar
        table.on('tool(users_table)', function(obj){
            let data = obj.data;

            //Detail Event:
            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' detail');
                //alert(data.id);

                //Delete Event:
            } else if(obj.event === 'del'){
                layer.confirm('Delete can not rollback! Are you sure?', function(index){
                    deleteUser(data.id);
                    obj.del();
                    layer.close(index);
                });


                //Edit Event:
            } else if(obj.event === 'edit'){
                //layer.alert('Edit this row: <br>'+ JSON.stringify(data))
                //console.log(data.id + data.question);
                jumpToEditUser(data.id, data.user_name, data.user_level, data.first_name, data.last_name, data.sex,
                  data.birth_date, data.email, data.phone_no, data.address);
            }
        });

    });

}

function jumpToEditUser(id, user_name, user_level, first_name, last_name, sex, birth_date, email, phone_no, address) {

  window.location.href = "edit_user.html?id=" + id + "&user_name=" + user_name + "&user_lever=" + user_level +
    "&first_name=" + first_name + "&last_name=" + last_name + "&sex=" + sex +
    "&birth_date=" + birth_date + "&email=" + email + "&phone_no=" + phone_no + "&address=" + address;

}




