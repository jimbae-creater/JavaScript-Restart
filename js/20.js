

// 필수기능) 제이슨 파일 추출하여 아이템 리스트 생성하는기능
    // console.log('asdasds') //js 파일 작동 확인
    let productData = null; // 데이터를 저장할 변수 선언

    
    // 제이슨 파일을 불러옴
    fetch("store.json")
    // 데이터에서 카드의 이미지, 브랜드명, 제품명, 가격을 가져옴
    .then(res => res.json())
    .then(
        function(data){
            // console.log(data) //성공시 데이터 가져와봄
            console.log('성공')
            renderCards(data.products); // 카드 렌더링 함수 호출
            productData = data.products; // 데이터를 변수에 저장
        }
    )
    // 실패 메시지
    .catch(function(error){
        console.log('실패함')
    });

    // console.log(productData) //비동기라서 불러올 수 없음

    // 가져온 데이터를 카드 html에 적절히 배치하여 카드를 하나 생성함
    function renderCards(products){
        // 이를 아이디만큼 반복하여 가져옴
        products.forEach(i => {
            var card = `
                <div class="col-4">
                    <div class="product">
                        <img src="../codingAppleJS-chapter3/img/${i.photo}" alt="${i.title}">
                        <div class="product-info">
                            <h6>${i.brand}</h6>
                            <h5 class="item">${i.title}</h5>
                            <p class="price">₩${i.price}</p>
                            <a href="#" data-bs-toggle="tooltip" data-bs-title="장바구니에 담기" class="btn btn-primary">
                                <i class="bi bi-cart-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `
            $('#main').append(card);

            // **툴팁을 다시 초기화**
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
        });
    }

    // 선택)json 데이터를 가져와야하는데 데이터가 없는 경우


// 추가기능) 제품을 6개씩 불러오며, 이후엔 불러오기 버튼으로 제품을 6개 단위로 가져옴.


// 필수기능) 검색 기능
    // 검색된 제품 변수 생성, 최초 빈값 어레이 데이터.
    var searchedProduct = [];

    // 검색폼에 체인지가 일어나면 발동 
    $('.form-control').change(function(){
        // 검색된 제품 변수 초기화
        searchedProduct = [];

        // 순간 제품 목록을 지워버림
        $('#main').html('');

        //폼에서 검색어 가져오기
        var searchWord = $('.form-control').val().toLowerCase(); // 대소문자 구분 없이 검색
        // console.log(searchWord); //폼에서 검색어 잘 가져오는지 체크

        // 2. 문자안에 특정 문자가 들어있는지 검사하고 싶으면 .includes() 아니면 .indexOf() 쓰면 될듯요
        function searching(){
            productData.forEach(item => {
                if (item.title.includes(searchWord) == true){
                    searchedProduct.push(item);
                }
            });
        }
        
        searching();
        
        // console.log(searchedProduct); 
        
        // 검색 결과를 렌더링
        if (searchedProduct.length > 0) {
            renderCards(searchedProduct);
        } else {$('#main').addClass('h-100').html(emptyState);}

        searchAndHighlight(searchWord)
    });
    // 검색폼

    var emptyState = `
        <div class="empty-state h-100">
            <i class="bi bi-cart-x"></i>
            <p>검색된 제품이 없습니다</p>
        </div>
    `

    // 3. 검색어에 하이라이트

    // HTML중간중간 원하는 글자에 노란색 배경입히는건 html과 css 잘하면 됩니다.
    // **<p>안녕하세요</p>** 를
    // **<p><span style="background : yellow">안</span>녕하세요</p>**
    // 이렇게 바꾸면 원하는 곳만 노랗게 바꿀 수 있을듯요
    
    function searchAndHighlight(searchWord) {
        const searchLower = searchWord.toLowerCase();
        const items = document.querySelectorAll('.item');

        items.forEach(item => {
            const itemText = item.textContent;

            if (itemText.toLowerCase().includes(searchLower)) {
                // 검색어만 강조 표시
                const regex = new RegExp(`(${searchWord})`, 'gi');
                item.innerHTML = itemText.replace(regex, '<span style="background-color: yellow;">$1</span>');
            } else {
                // 검색어가 없으면 원래 텍스트 복원
                item.innerHTML = itemText;
            }
        });
    }

// 필수기능) 장바구니에 제품 넣기
    // 기능 1) 담기 버튼으로 제품 추가
        // 기능 1.1: 담기버튼 호버시 등장하도록 수정
    // 기능 2) 제품을 드래그&드롭으로 장바구니에 추가


// 필수) 장바구니 구매 기능
    // 기능1: 결제 예정 금액 실시간 계산
    // 선택)기능2: 수량별 제품 개별 가격 계산
    // 기능3: 구매시 이름/연락처 입력하는 다이얼로그 등장
    // 기능4: canvas를 이용하여 영수증을 이미지로 출력하여 보여줌
    // 선택) 기능5: 기능3과 4를 스탭퍼 UI로 연결하면 사용성 좋을듯
    // 선택) 수량을 0으로 만들어서 주문하기 버튼을 누르는 경우? -> 결재 단계전에 검사기능 추가하여 갯수 0일시 목록에서 삭제