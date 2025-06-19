

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
                <div class="col-4" draggable="true" data-id="${i.id}">
                    <div class="product">
                        <img src="../codingAppleJS-chapter3/img/${i.photo}" alt="${i.title}" draggable="false">
                        <div class="product-info">
                            <h6>${i.brand}</h6>
                            <h5 class="item">${i.title}</h5>
                            <p class="price">₩${i.price.toLocaleString()}</p>
                            <a href="#" 
                                data-id="${i.id}"
                                data-bs-toggle="tooltip" 
                                data-bs-title="장바구니에 담기" 
                                class="btn btn-primary"
                            >
                                    <i class="bi bi-cart-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `
            $('#main').append(card);
        });
        // **툴팁을 다시 초기화**
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
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
// 형제 요소의 (이미지, 아이템, 프라이스)를 가져와 카트 데이터에 저장해라.
// 카트 데터에 저장된 아이템들은 장바구니에 계속 보여진다.
    // 카트 기본 세팅
    var cartItems = []; //응애 카트
    // const stringifyCart = JSON.stringify(cartItems); // 카트에 넣기 위한 스트링파이
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart(cartItems);
    updateCartSummary(cartItems)


    // renderCart
    // 페이지 로드 시
    // const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // cartData = savedCart;

    // 기능 1) 담기 버튼으로 제품 추가
    $('#main').on('click', 'a[data-id]', function(e) {
        e.preventDefault();              // <a> 기본 동작 막기
        const id = $(this).data('id');   // data-id 값 꺼내오기
        // console.log(id); // 아이디 잘 가져오는지 체크

        const pickProduct = productData.find(p => p.id === id); //꺼내온 아이디로 프로덕 데이터의 아이디 동일한 요소 가져와 변수화함.
        
        if (cartItems.find(p => p.id === id)) { //방금 수집한 아이디랑 카트 내부에 있는 오브젝트의 아이디값과 비교
            // console.log('트루!');
            pickProduct.quantity += 1; // 똑같은 아이디 있으면 퀀티티만 1개 플러스
        } else {
            cartItems.push(pickProduct) // 똑같은게 없으면 아이템 정보 복사 및 퀀티티 1개 누적
            pickProduct.quantity = 1;
            // console.log('뽤쓰');
        }
        // console.log(cartItems); // 아이템 추가 잘 됐는지 확인
        localStorage.setItem('cart', JSON.stringify(cartItems));
        // **UI 갱신**: 매개변수로 넘긴 cartItems를 기준으로
        renderCart(cartItems);
        updateCartSummary(cartItems)
    });

    // 기능 1-1) 장바구니 비우기
    $('.empty').on('click', function(){
        cartItems = [];
        localStorage.setItem('cart',JSON.stringify(cartItems));
        renderCart(cartItems);
        updateCartSummary(cartItems)
    });
    
    // 카드 렌더링 기능
    function renderCart(cartItems) {
        // 기존 항목 초기화
        const container = $('.cart-items');
        container.empty();
        // 카드 렌더링식
        if (cartItems.length === 0) {
            console.log('감지123'); // 아이템 추가 잘 됐는지 확인
            $('.empty-state').removeClass('d-none');
            $('.cart-calc').removeClass('expanded');
          // empty-state 보이기
        } else {
            $('.empty-state').addClass('d-none');
            $('.cart-calc').addClass('expanded');
            cartItems.forEach((item, i) => {
                // 카드 아이템 정의
                const cartItemHtml = `
                    <div class="product-2">
                        <img src="img/${cartItems[i].photo}"  alt="${item.title}" class="">
                        <div class="product-info d-flex flex-column w-100">
                            <h5>${cartItems[i].title}</h5>
                            <p class="">₩${cartItems[i].price.toLocaleString()}</p>
                            <div class="amount-calc ">
                                <button type="button" data-id="${item.id}" data-action="increment" class="btn btn-primary btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                    </svg>
                                </button>
                                <span class="amout-now">${item.quantity}</span>
                                <button type="button" data-id="${item.id}" data-action="decrement" class="btn btn-primary btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>`
                    $('.cart-items').append(cartItemHtml); // cartItems 받아서 카드 생성
            });
        }
      }
      

      function updateCartSummary(cartItems) {
        // 계산 전용
        const productTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingFee = productTotal > 50000 ? 0 : 4000;
        const grandTotal  = productTotal + shippingFee;
      
        // 화면 반영
        $('.pay-product').text(`₩${productTotal.toLocaleString()}`);
        $('.pay-ship').text(`₩${shippingFee.toLocaleString()}`);
        $('.pay-total').text(`₩${grandTotal.toLocaleString()}`);
      }

    $('.cart-container').on('click', 'button[data-action]', function(e){
        e.preventDefault();
        const id     = $(this).data('id');
        const action = $(this).data('action'); // 'increment' or 'decrement'
        updateQuantity(id, action);
    });

    function updateQuantity(itemId, action) {
        // 1) cartItems 배열에서 index 찾기
        const idx = cartItems.findIndex(c => c.id === itemId);
        if (idx < 0) return;
      
        // 2) 증가/감소
        if (action === 'increment') {
          cartItems[idx].quantity += 1;
        } else {
          cartItems[idx].quantity -= 1;
          // 3) 0 이하가 되면
          if (cartItems[idx].quantity < 1) {
            // a) confirm 창 띄워 제거할지 물어보기
            if (confirm('수량이 0이 됩니다. 장바구니에서 제거할까요?')) {
              cartItems.splice(idx, 1);
            } else {
              cartItems[idx].quantity = 1;
            }
          }
        }
      
        // 4) 로컬스토리지 갱신
        localStorage.setItem('cart', JSON.stringify(cartItems));
        // 5) UI 다시 그리기
        renderCart(cartItems);
        updateCartSummary(cartItems)
      }
      
      // jQuery 이벤트 위임
        $('#main')
            .on('dragstart', '[draggable]', function(e) {
                const id = $(this).data('id');
                e.originalEvent.dataTransfer.setData('text/plain', id);
                $(this).addClass('dragging');
            })
            .on('dragend', '[draggable]', function() {
                $(this).removeClass('dragging');
            });

      


        // 클로즈 버튼을 사용하여 저장된 아이템을 카트 데이터와 카트 UI에서 제거할 수 있다.
        // 상품의 개수를 설정할 수 있다. 
        // 개수를 0개로 만드는 경우 얼럿창이 등장하며 해당 제품을 장바구니에서 제외할것인지 묻는다.
        
        // 프라이스는 전부 합해서 '상품가'에 보여진다.
        // 배송비는 기본적으로 4,500₩이다. 단, 구매 금액이 5만원이 이상이면 0원이다.
        // 결제 예정금액은 위의 상품가와 배송비를 합한 금액이다.
    // 기능 2) 제품을 드래그&드롭으로 장바구니에 추가


// 필수) 장바구니 구매 기능
    // 기능1: 결제 예정 금액 실시간 계산
    // 선택)기능2: 수량별 제품 개별 가격 계산
    // 기능3: 구매시 이름/연락처 입력하는 다이얼로그 등장
    // 기능4: canvas를 이용하여 영수증을 이미지로 출력하여 보여줌
    // 선택) 기능5: 기능3과 4를 스탭퍼 UI로 연결하면 사용성 좋을듯
    // 선택) 수량을 0으로 만들어서 주문하기 버튼을 누르는 경우? -> 결재 단계전에 검사기능 추가하여 갯수 0일시 목록에서 삭제