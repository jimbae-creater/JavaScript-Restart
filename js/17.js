var dragStart = 0;
    var clickChecker = false;

    $('.slide-box').eq(0).on('mousedown', function(e){
        dragStart = e.clientX;
        clickChecker = true;
        // console.log(dragStart)
    });

    $('.slide-box').eq(0).on('mousemove', function(e){
        // console.log(e.clientX)
        if (clickChecker === true) {
            $('.slide-container').css('transform', `translateX( ${e.clientX - dragStart}px )`)
        }
    });

    $('.slide-box').eq(0).on('mouseup', function(e){
        if (e.clientX - dragStart < 200) {
            $('.slide-container').css('transform', `translateX( -100vw )`)
        }else {
            $('.slide-container').css('transform', `translateX( 0vw )`)
        }
    });
    
    $('.slide-box').eq(1).on('mousedown', function(e){
      dragStart = e.clientX;
      clickChecker = true;
      // console.log(dragStart)
  });

  $('.slide-box').eq(1).on('mousemove', function(e){
      // console.log(e.clientX)
      if (clickChecker === true) {
          $('.slide-container').css('transform', `translateX( ${e.clientX - dragStart}px )`)
      }
  });

  $('.slide-box').eq(1).on('mouseup', function(e){
      if (e.clientX - dragStart < 200) {
          $('.slide-container').css('transform', `translateX( -100vw )`)
      }else {
          $('.slide-container').css('transform', `translateX( 0vw )`)
      }
  });
    

    // 캐러셀 이전-다음 버튼
    // 다크모드때 썼던 코드로 클릭횟수 기억하고 이전과 다음 버튼이 서로 역으로 카운트하게 설계
    // var count = 0;

    // 

    var count = 0;
    var locate = $('.slide-container').css('transform','translateX(-'+ count +'00vw)');

    $('.next-btn').on('click', function() {
      if(count == 2){
        $('.slide-container').css('transform','translateX(0vw)');
        count = 0
      } else{
        count += 1;
        $('.slide-container').css('transform','translateX(-'+ count +'00vw)');
      }
      console.log(count)
    });

    $('.pre-btn').on('click', function() {
      if(count == 0){
        $('.slide-container').css('transform','translateX(-200vw)');
        count = 2
      } else{
        count -= 1;
        $('.slide-container').css('transform','translateX(-'+ count +'00vw)');
      }
      console.log(count)
      });

    // 캐러셀 기본 1,2,3 버튼
    $('.slide-1').on('click', function() {
      count = 0;
      $('.slide-container').css('transform','translateX(-'+ count +'00vw)');
    });

    $('.slide-2').on('click', function() {
      count = 1;
      $('.slide-container').css('transform','translateX(-'+ count +'00vw)');
    });

    $('.slide-3').on('click', function() {
      count = 2;
      $('.slide-container').css('transform','translateX(-'+ count +'00vw)');
    });
    

    // $('.pre-btn').on('click', function() {
    //   count -= 1;
    //   if(count%3 == 0){
    //     $('.slide-container').css('transform','translateX(0vw)');
    //   }
    //   if(count%3 == 1){
    //     $('.slide-container').css('transform','translateX(-100vw)');
    //   }
    //   if(count%3 == 2){
    //     $('.slide-container').css('transform','translateX(-200vw)');
    //   }
    // });


    // 정규식으로 이메일 형식 검증
    $('form').on('submit',function(e){
    var 입력한값 = document.getElementById('email').value;
    if ( /\S+@\S+\.\S+/.test(입력한값) ){
      alert('이메일형식아님')
      e.preventDefault();
    }
    });

    // 전송 버튼(#submit)을 눌렀을떄
    // 만약 아이디 폼(#id-form)이 빈칸이라면
    // 아이디를 입력하라는 얼럿을 띄워라
    $('#submit').on('click', function() {
      if(document.getElementById('id-form').value == 0){
        alert('아이디를 입력하시오');
        console.log('id-form.value');
        return false;
      };
    });

    // 서밋 버튼을 클릭할떄마다 pwVal로 정의된 password 값을 가져와서
    // 만약 알파벳 대문자 하나를 포함하지 == 않는다면 알러트로 비번 잘좀ㅋ 라고하고 로그에 벨류를 출력함.
    $('#submit').on('click', function() {
    
      var pwVal = document.getElementById('pw-form').value;
   
    if(/[A-Z]/.test(pwVal) == false ){
        alert('비번잘좀 ㅋ');
        console.log(pwVal);
        return false;
      };
    });


    // 지난 코드
    $('.navbar-toggler').on('click', function(){
      $('.list-group').toggleClass('list-group-folde');
        // console.log(zz);
    });

    $('#login').on('click', function(){
      $('.black-bg').addClass('show-modal');
    });
    
    $('.btn-danger').on('click', function() {
      $('.black-bg').removeClass('show-modal');
    });
