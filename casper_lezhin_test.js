/* 레진코믹스 홈 화면 검색창에 '먹는'을 치면 자동완성으로 뜨는 '먹는존재'
 * 를 클릭하여 이동한 페이지의 스크린샷을 찍고 타이틀을 가져온다. 창 크기는 모바일 화면.
*/

var casper = require('casper').create();
casper.options.viewportSize = {width: 500, height: 1000};

function getTitle() {
    var comicTitle = document.querySelectorAll('h1.title');
    return comicTitle.text;
}

casper.start('http://www.lezhin.com/', function() {
	this.click('#toggle-search');
    this.sendKeys('#search', '먹는', { keepFocus: true });	//keepFocus빼먹으면 안된다!
    
    casper.capture("page.png");
});

casper.then(function() {
	this.click('.tt-suggestion');
});

casper.then(function() {
    this.echo(this.getTitle());	//더 안정적이게 뽑으려면 setTimeout이나 wait준다.
    casper.capture("page2.png");
});

casper.run();