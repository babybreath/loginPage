// 登陆接口URl
var LOGIN_URL = '/login.do';

// DOM元素
var loginBtn = document.getElementById('loginBtn');
var username = document.getElementById('username');
var password = document.getElementById('password');
var eyePrompt = document.getElementById('eyePrompt');
var warnText = document.getElementById('warnText');

// 注册登录按钮事件
loginBtn.addEventListener('click', clickLoginBtn, false);
// 注册密码眼睛鼠标移入事件
eyePrompt.addEventListener('mouseover', mouseoverEyePrompt, false);
// 注册密码眼睛鼠标移出事件
eyePrompt.addEventListener('mouseout', mouseoutEyePrompt, false);

// 点击登陆
function clickLoginBtn(){
	// 重复点击无效
	if(loginBtn.className === 'loading') return;
	
	var usernameValue = username.value;
	var passwordValue = password.value;
	// 参数非空验证
	if(!usernameValue || !passwordValue) return;
	
	loginBtn.className = 'loading';
	reqwest({
		url: LOGIN_URL,
		method: 'post',
		data: { username: usernameValue, password: passwordValue },
		success: function (res) {
			loginBtn.className = 'loginBtn';
			if(res.retcode !== 0){
			  	//warnText.innerHTML = res.msg;
			}else{
			  	//location.href = ...
			}
	    },
	    error: function (e){
	    	warnText.innerHTML = e.statusText;
	    	loginBtn.className = 'loginBtn';
	    }
	});
}

// 鼠标移入密码眼睛
function mouseoverEyePrompt(){
	password.type = 'text';
}

// 鼠标移出密码眼睛
function mouseoutEyePrompt(){
	password.type = 'password';
}
