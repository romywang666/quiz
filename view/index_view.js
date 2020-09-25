function login_check(){
  var uname = $("#uname").val();
  var upwd = $("#upassword").val();

  //window.sessionStorage.setItem("verified",false);
  if(uname.trim()===""){
    alert("Please input a User Name!!!");
    return;
  }
  if(upwd.trim()===""){
    alert("Please input a Password!!!");
    return;
  }

  verifiedUser(uname,upwd);
}

function showAdminPage(){
  var uname = $("#uname").val();
  window.sessionStorage.setItem("user_name",uname);
  window.sessionStorage.setItem("auth_level","ADMIN");
  window.location.href="admin.html";
}

function showUserPage(){
  var uname = $("#uname").val();
  window.sessionStorage.setItem("user_name",uname);
  window.sessionStorage.setItem("auth_level","TESTER");
  window.location.href="user_quiz.html";
}