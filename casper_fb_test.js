재var url = "https://facebook.com", id='*****@naver.com', pass='******';
var result_message;		//알림메세지 저장
var fs = require('fs');	//알림메세지 파일로 저장 위해 필요한 모듈

//casper모듈을 초기화하고, debugging모드로 전
var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.start(url, function(){
	this.fill('form#login_form', {	//caper.fill 로그인 위한 form Element컨트롤 메서드
		"email": id,
		"pass": pass
	}, true);
});

casper.then(function() {
	// this.wait(4000);
	setTimeout(function(){}, 3000);
	this.click('a[name=notifications]');
});

casper.then(function(){
	this.wait(1000, function(){
		result_message = this.evaluate(function(){
			var list = document.querySelectorAll('#fbNotificationsFlyout .info');
			return Array.prototype.map.call(list, function(dom){
				return dom.innerText;                
			});
		});
	});
});

function writeFile(filename, contents){
	fs.write(filename, contents);
};

casper.run(function() {
	var msg = result_message.join("\\n===========\\n");
	this.echo(msg);
	writeFile('data/facebook_notification.txt', msg);
	this.exit();
});
