

$(document).ready(function () {
    init();
    initEvent();
    btnOrder();
    changeImg();

});


//btnOrder 주문하기 버튼 클릭하면 장바구니 담김 알람 뜨게하기
function btnOrder() {
    $("#btnOrder").click(function () {
        alert("장바구니에 담겼습니다.")
    })
}


// 전역 변수 선언 및 초기화
var $menu = null;
var $menuName = null;
var $selectedItem = null;


// 전역에서 사용할 요소 초기화
function init() {
    $menu = $("ul.menu");
    $menuName = $("#menuName");
}

// 이벤트 초기화
function initEvent() {
    // 메뉴 추가
    $("#add").click(function () {
        addMenu();
    })

    $menu.on("click", "li", function () {
        selectItem($(this));
    })

    // 선택 항목 삭제
    $("#remove").click(function () {
        removeMenuItem();
    })
}

// 메뉴 추가 처리
function addMenu() {
    // 텍스트 입력 값 구하기
    var menuName = $menuName.val();

    // 신규 메뉴 아이템 문자열 만들기
    var newMenuItem = "<li style='list-style: none;'>" + menuName + "</li>";

    // 선택 메뉴 아이템이 있는 경우 신규 메뉴 아이템을 선택 메뉴 아이템 아래에 추가
    if ($selectedItem) {
        $selectedItem.after(newMenuItem);
    } else {
        // 메뉴에 신규 메뉴 아이템 추가
        $menu.append(newMenuItem);
    }
}

// 메뉴 선택 처리
function selectItem($item) {
    // 기존 선택 메뉴 아이템이 있는 경우 선택 효과 제거
    if ($selectedItem != null)
        $selectedItem.removeClass("select");

    // 신규 선택 메뉴 아이템 처리
    $selectedItem = $item;
    $selectedItem.addClass("select");

}

// 선택 메뉴 항목 삭제
function removeMenuItem() {
    if ($selectedItem) {

        $selectedItem.remove();
        $selectedItem = null;

    } else {
        alert("선택 메뉴가 존재 하지 않습니다.")
    }
}







//지역변수에서 전역변수로 뺌. tabMenu 내에서 접근할 수 있도록 하기 위해서
var tabPanel1 = null;

function changeImg() {
    tabMenu("#itemslideul");
    //1) tabPanel 함수로부터 객체를 리턴받음
    tabPanel1 = tabPanel("#tabPanel1");
    //2) 객체 내에 들어있는 tabPanel 내부의 함수를 호출
    tabPanel1.setSelectPanel(0); //1은 임의의 숫자 그냥 넣어줌

}

function tabMenu(selector) {
    var $tabMenu = null;
    var $menuItems = null;
    var $selectMenuItem = null;

    function init() {
        $tabMenu = $(selector);
        $menuItems = $tabMenu.find(".itemslide");
    }
    function initEvent() {
        $menuItems.click(function () {
            setSelectItem($(this));

            //전역변수로 저장된 tabPanel1내에 들어있는 setSelectPanel 을 직접 호출한다.
            tabPanel1.setSelectPanel($(this).index()); //지금은 함수 관계가 끈끈한 상태.
        });
    }

    function setSelectItem($item) {
        if ($selectMenuItem)
            $selectMenuItem.removeClass("select");  //이미 선택된게 있으면 셀렉트를 지움
        $selectMenuItem = $item;
        $selectMenuItem.addClass("select"); //새로운걸 선택했을 때 셀렉트를 추가
    }
    init();
    initEvent();
}
function tabPanel(selector) {
    var $tabPanels = null;
    var $selectPanel = null;

    function init(selector) {
        $tabPanels = $(selector).find(".itemImg");
    }

    function setSelectPanel(index) {
        // 기존 선택된 패널이 있으면 셀렉트 클래스를 제거해라
        if ($selectPanel)
            $selectPanel.removeClass("select");
        $selectPanel = $tabPanels.eq(index);
        $selectPanel.addClass("select");
    }

    init(selector);

    //{}객체를 만들어서 함수를 리턴 (외부에서 호출할 수 있도록)
    return {
        setSelectPanel: setSelectPanel
    }
}


