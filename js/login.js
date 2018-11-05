// 登陆接口URl
var LOGIN_URL = 'http://127.0.0.1/user/login';

// DOM元素
var loginBtn = document.getElementById('loginBtn');
var username = document.getElementById('username');
var password = document.getElementById('password');
var eyePrompt = document.getElementById('eyePrompt');
var warnText = document.getElementById('warnText');

// 注册登录按钮事件
loginBtn.addEventListener('click', clickLoginBtn, false);
// 密码眼睛鼠标移入事件
eyePrompt.addEventListener('mouseover', mouseoverEyePrompt, false);
// 密码眼睛鼠标移出事件
eyePrompt.addEventListener('mouseout', mouseoutEyePrompt, false);
// 密码眼睛鼠标点击事件
eyePrompt.addEventListener('click', mouseoutEyeClick, false);

// 点击登陆
function clickLoginBtn() {
  // 重复点击无效
  if (loginBtn.className === 'loading') return;

  var usernameValue = username.value;
  var passwordValue = password.value;
  // 参数非空验证
  if (!usernameValue || !passwordValue) return;

  loginBtn.className = 'loading';
  var body = { username: usernameValue, password: passwordValue }
  fetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', },
    credentials: 'include',
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    // 正常回调处理
    loginBtn.className = 'loginBtn';

  }).catch(function (err) {
    // 异常处理
    loginBtn.className = 'loginBtn';
  })
}

var currentPasswordType = 'password';
// 鼠标移入密码眼睛
function mouseoverEyePrompt() {
  password.type = 'text';
}

// 鼠标移出密码眼睛
function mouseoutEyePrompt() {
  password.type = 'password';
}

// 鼠标点击密码眼睛
function mouseoutEyeClick() {
  eyePrompt.removeEventListener('mouseover', mouseoverEyePrompt);
  eyePrompt.removeEventListener('mouseout', mouseoutEyePrompt);
  if(currentPasswordType === 'password'){
    password.type = currentPasswordType = 'text';
  }else{
    password.type = currentPasswordType = 'password';
  }
  password.focus();
}
