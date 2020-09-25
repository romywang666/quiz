function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level !== "ADMIN") {
        window.location.href="index.html";
    }

    var id = $.query.get("id");

    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form
          ,layer = layui.layer
          ,layedit = layui.layedit
          ,laydate = layui.laydate;

        //date
        laydate.render({
            elem: '#birth_date'
        });

        //verification rules
        form.verify({
            user_name: function(value){
                if(value.length < 4){
                    return 'User Name must be at least 4 char.';
                }
            }
            ,pass: [
                /^[\S]{6,12}$/
                ,'password must be 6 - 12 char and no space.'
            ]
            ,content: function(value){
                layedit.sync(editIndex);
            }
        });

        //Listen Submit Event
        form.on('submit(update_user)', function(data){
            //console.log(data);

            //let items = JSON.parse(data.field);
            //console.log(items[0]);
            //layer.alert(JSON.stringify(data.field), {
            //    title: 'infomation submitted'
            //});
            //console.log(id);
            //alert(JSON.stringify(data.field));

            editUser(id);

            //return false;

        });
    })

    var role = $.query.get("user_level");

    $("#user_name").val($.query.get("user_name"));
    //$("#user_level").val(role);
    $("#user_level").find("option:contains(role)").attr("selected",true);
    $("#first_name").val($.query.get("first_name"));
    $("#last_name").val($.query.get("last_name"));
    $("#sex").val($.query.get("sex"));
    $("#birth_date").val($.query.get("birth_date"));
    $("#email").val($.query.get("email"));
    $("#phone_no").val($.query.get("phone_no"));
    $("#address").val($.query.get("address"));
    //console.log($.query.get("address"));
}

function editCancel(){
    window.location.href="admin_user.html";
}

function editUser(id){
    //console.log(id);

    let formData = new FormData();

    //formData.append("user_id", $("#user_id").val());
    formData.append("user_id", id);
    formData.append("user_name", $("#user_name").val());

    formData.append("user_level", $("#user_level").val());
    formData.append("first_name", $("#first_name").val());
    formData.append("last_name", $("#last_name").val());

    //console.log($("input[name='sex']:checked").val());
    formData.append("sex", $("input[name='sex']:checked").val());

    formData.append("birth_date", $("#birth_date").val());
    formData.append("email", $("#email").val());
    formData.append("phone_no", $("#phone_no").val());
    formData.append("address", $("#address").val());

    formData.append("action", "update_user");

    //console.log(formData);
    updateUser(formData);
}

