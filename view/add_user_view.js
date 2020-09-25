function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level !== "ADMIN") {
        window.location.href="index.html";
    }


    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form
          ,layer = layui.layer
          ,layedit = layui.layedit
          ,laydate = layui.laydate;

        //日期
        laydate.render({
            elem: '#birth_date'
        });

        //自定义验证规则
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
        form.on('submit(submit_user)', function(data){
            //console.log(JSON.stringify(data.field));

            //let items = JSON.parse(data.field);
            //console.log(items[0]);
            //layer.alert(JSON.stringify(data.field), {
            //    title: 'infomation submitted'
            //});
            //alert(JSON.stringify(data.field))
            addUser();

            //return false;

        });
    })
}

function addCancel(){
    window.location.href="admin_user.html";
}

function addUser(){
    let formData = new FormData();

    formData.append("user_name", $("#user_name").val());
    formData.append("password", $("#password").val());
    formData.append("user_level", $("#user_level").val());
    formData.append("first_name", $("#first_name").val());
    formData.append("last_name", $("#last_name").val());

    //console.log($("input[name='sex']:checked").val());
    formData.append("sex", $("input[name='sex']:checked").val());

    formData.append("birth_date", $("#birth_date").val());
    formData.append("email", $("#email").val());
    formData.append("phone_no", $("#phone_no").val());
    formData.append("address", $("#address").val());

    formData.append("action", "add_user");

    console.log(formData);
    insertUser(formData);
}

