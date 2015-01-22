// page 객체를 생성한다.
// WebPage를 컨트롤 하기 위한 초기화 단계이다.
var page = require('webpage').create(), address, output, size;

// arguments 갯수를 판단, 실행명령 방법을 보여준다.
if (phantom.args.length < 2) {
  console.log('Usage: filename.js URL filename');
  phantom.exit();
} else {
  // 웹사이트 주소와 output imageName
  address = phantom.args[0];
  output = phantom.args[1];

  // WebPage Object의 Properties 많은데
  // 그중 viewportSize 즉, 보여지는 이미지 크기를 설정
  page.viewportSize = { width: 100, height: 10 }; //height는 상관없는듯

  // 자, 웹사이트에 접속
  page.open(address, function (status) {
    // status 성공여부를 반환
    if (status !== 'success') {
      console.log('Unable to load the address!');
    } else {
      // 엘리먼트들이 로딩을 기다리기 위해서
      // setTimeout 을 사용
      window.setTimeout(function () {
        page.render(output);
        phantom.exit();
      }, 2000);
    }
  });
}