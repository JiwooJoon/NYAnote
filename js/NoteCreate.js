
function getMemoArray() {
    let memoArray = localStorage.getItem("memoArray")
    if (!memoArray) {
        memoArray = [];
        localStorage.setItem("memoArray", JSON.stringify(memoArray))
    } else {
        memoArray = JSON.parse(memoArray)
    }
    return memoArray;
}

function addlocalstage(key, memoObj) {
    let memoArray = getMemoArray()
    localStorage.setItem(key, JSON.stringify(memoObj))
    
    memoArray.push(key)
    localStorage.setItem("memoArray", JSON.stringify(memoArray));
}

function addMemotoDOM(key, memoObj){
    let memo = document.createElement("textarea");

    memo.setAttribute("spellcheck", "false")

    let span = document.createElement("div")
    span.setAttribute("class", "memos")
    span.setAttribute("id","text")
    span.setAttribute("draggable","flase")
    span.setAttribute("value", key)

    span.innerHTML = `
    <div class="memohead">
        <textarea id="mtitle" spellcheck="flase"></textarea>
        <button>X</button>
    </div>
    <div class=memomain>
        <textarea id="mform" spellcheck="flase" ></textarea>
    </div>
    <div class="memobottom" draggable="false">
        <button id="memoBold" value="1">B</button>
        <button id="memoBig">+</button>
        <button id="memoSmall">-</button>
        <div class="dragzone">
        drag
        </div>
        <div class="sizezone" draggable="false">
        size
        </div>
    </div>
    `
    
    const main = document.querySelector('body');
    main.appendChild(span)
    $(span).offset({left: memoObj.x})
    $(span).offset({top: memoObj.y})
}
function addMemotoDOMimage(key, memoObj, file){
    let span = document.createElement("div")
    span.setAttribute("class", "memos")
    span.setAttribute("id","image")
    span.setAttribute("draggable","flase")
    span.setAttribute("value", key)

    console.log(file)
    let url_ = URL.createObjectURL(file);


    span.innerHTML = `
    <div class=memohead>
        <textarea id="mtitle" spellcheck="flase"></textarea>
        <button>X</button>
    </div>
    <div class=memomain>
        <img src=${url_}>
    </div>
    `

    $(span).css("width", "30%")
    $(span).css("height", "30%")
    
    main = document.querySelector('body');
    main.appendChild(span)
}

function addMemotoDOMsound(key, memoObj, file){
    let span = document.createElement("div")
    span.setAttribute("class", "memos")
    span.setAttribute("id","sound")
    span.setAttribute("draggable","flase")

    console.log(file)
    let url_ = URL.createObjectURL(file);

    span.setAttribute("value", url_)


    span.innerHTML = `
    <div class=memohead>
        <textarea id="mtitle" spellcheck="flase"></textarea>
        <button>X</button>
    </div>
    <div class=memomain>
        <audio src=${url_} controls>
    </div>
    `
    
    main = document.querySelector('body');
    main.appendChild(span)
}

function addMemotoDOMvideo(key, memoObj, file){
    let span = document.createElement("div")
    span.setAttribute("class", "memos")
    span.setAttribute("id","video")
    span.setAttribute("draggable","flase")

    console.log(file)
    let url_ = URL.createObjectURL(file);

    span.setAttribute("value", url_)


    span.innerHTML = `
    <div class=memohead>
        <textarea id="mtitle" spellcheck="flase"></textarea>
        <button>X</button>
    </div>
    <div class=memomain>
        <video controls preload="auto">
            <source src=${url_} type="video/mp4">
        </video>
    </div>
    `
    
    main = document.querySelector('body');
    main.appendChild(span)
}

function addMemotoDOMyoutube(key, link){
    let span = document.createElement("div")
    span.setAttribute("class", "memos")
    span.setAttribute("id","youtube")
    span.setAttribute("draggable","flase")
    span.setAttribute("value", link)

    console.log(link)
    let url_ = link;


    span.innerHTML = `
    <div class=memohead>
        <textarea id="mtitle" spellcheck="flase"></textarea>
        <button>X</button>
    </div>
    <div class=memomain>
    <iframe width="100%" height="100%"
    src="${url_}" controls=1; frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    </div>
    <div class=memobottom draggable="false">
        <div class="dragzone">
        drag
        </div>
        <div class="sizezone">
        size
        </div>
    </div>
    `
    
    main = document.querySelector('body');
    main.appendChild(span)
}

function removeMemoDOM(key) {
    let memo = document.getElementByName(key)
    memo.parentNode.removeChild(memo)
    localStorage.removeItem("key")
}

let btnText = document.querySelector('#btnAddText')
    let btnImage = document.querySelector('#btnAddImage')
    let btnSound = document.querySelector('#btnAddSound')
    let btnVideo = document.querySelector('#btnAddVideo')
    let btnYou = document.querySelector('#btnYouTube')

    // 로컬스토리지 사용흔적 나중에 db로 바꿀것
    // let memoArray = getMemoArray()
    // for (let i =0; i<memoArray.length;i++) {
    //     let key = memoArray[i]
    //     let value = JSON.parse(localStorage[key])
    //     addMemotoDOM(key, value);
    // }

    btnText.addEventListener('click', function(e) {
        let currentData = new Date()
        let key = "memo" + currentData.getTime()

        let memoObj = {
            "kind" : "text",
            "title" : " ",
            "form" : " ",
            "x" : 0,
            "y" : 0,
            "Nheight" : 200,
            "NWidth" : 200,
            "bold" : 200,
            "mysize" : 15
        }

        addlocalstage(key, memoObj)
        addMemotoDOM(key, memoObj);
    })

    btnImage.addEventListener('change', function(e){
        let memoArray = getMemoArray()
        let kindMemo = e.target.value

        let file = e.target.files[0]

        let currentData = new Date()
        let key = "memo" + currentData.getTime()
        let memoObj = {
            "kind" : kindMemo,
            "file" : file
        }

        localStorage.setItem(key, JSON.stringify(memoObj))
    
        memoArray.push(key)
        localStorage.setItem("memoArray", JSON.stringify(memoArray));

        addMemotoDOMimage(key, memoObj, file)
    })

    btnSound.addEventListener('change', function(e){
        let memoArray = getMemoArray()
        let kindMemo = e.target.value

        let file = e.target.files[0]

        let currentData = new Date()
        let key = "memo" + currentData.getTime()
        let memoObj = {
            "kind" : kindMemo,
            "file" : file
        }

        localStorage.setItem(key, JSON.stringify(memoObj))
    
        memoArray.push(key)
        localStorage.setItem("memoArray", JSON.stringify(memoArray));

        addMemotoDOMsound(key, memoObj, file)
    })

    btnVideo.addEventListener('change', function(e){
        let memoArray = getMemoArray()
        let kindMemo = e.target.value

        let file = e.target.files[0]

        let currentData = new Date()
        let key = "memo" + currentData.getTime()
        let memoObj = {
            "kind" : kindMemo,
            "file" : file
        }

        localStorage.setItem(key, JSON.stringify(memoObj))
    
        memoArray.push(key)
        localStorage.setItem("memoArray", JSON.stringify(memoArray));

        addMemotoDOMvideo(key, memoObj, file)
    })

    btnYou.addEventListener('click', function(e){
        let memoArray = getMemoArray()
        let kindMemo = e.target.value


        let currentData = new Date()
        let key = "memo" + currentData.getTime()
        let memoObj = {
            "kind" : kindMemo,
        }

        localStorage.setItem(key, JSON.stringify(memoObj))
    
        memoArray.push(key)
        localStorage.setItem("memoArray", JSON.stringify(memoArray));

        let xy = $(this).offset();
        var divY = xy.top;
        var divX = xy.left - 450;
        
        $('#modalYou').offset({left: divX});
        $('#modalYou').offset({top: divY});
        $('#youlink').val("");
        $('#modalYou').css("visibility", "visible")
        $('#modalYou').css("name", key)
    })

    $('#btnYouOk').on('click', function () { 
        let key = $('#modalYou').css('name')
        $('modalYou').css('name', '')

        let link = $('#youLink').val();

        $('#youLink').val("");
        $('#modalYou').css("visibility","hidden");
        addMemotoDOMyoutube(key,link)
     })

    $('#btnYouClose').on('click', function () {
        $('#modalYou').css("visibility","hidden");
    })
    
    
        // let allButtons = document.getElementsByTagName('button');
        // for(let i =0; i<allButtons.length; i ++) {
        //     allButtons[i].addEventListener('click',createMemo(event))
        // }
    
        //메모 공용
        $(document).on('click',".memos .memohead button", function (event) {
            let memoArray = getMemoArray()
            let key = $(this).parent().parent().attr("value")
            $(this).parent().parent().remove()
            if(memoArray) {
                for(let i=0 ; i<memoArray.length; i++) {
                    if (key == memoArray[i]) {
                        memoArray.splice(i, 1); //배열에서 해당 메모를 제외한다.
                    }
                }
    
                localStorage.removeItem(key);
                localStorage.setItem("memoArray", JSON.stringify(memoArray));
                
            }
        })
    
        $(document).on('click',".memos .dragzone", function (event) {
            $(this).parent().parent().draggable({
                disabled: false,
                cursor:"move",
                stack:".memos",
                opacity:0.8
            })
        })
    
        $(document).on('click', ".memos .sizezone", function (evnet) {
            $(this).parent().parent().draggable({
                disabled: true})
        })

        
        $(document).on('blur',".memos", function(evnet){
            let key = $(this).parent().parent().attr("value")
            let myid = $(this).parent().parent().attr("id")
            let mytitle = $(this).val();
            let xy = $(this).parent().parent().offset();
            let divX = xy.top;
            let divY = xy.left;
            let divH = $(this).parent().parent().height();
            let divW = $(this).parent().parent().width();

            let mybold = $(this).parent().parent().
                children().next().children("#mform").css("font-weight")
            let mysize = parseInt($(this).parent().parent().children()
                .next().children("#mform").css("font-size"))
            let myform = $(this).parent().parent().children()
                .next().children("#mform").val()

            let memoObj = {
                "memotype" : myid,
                "memotitle" : mytitle,
                "memovalue" : myform,
                "memoX" : divX,
                "memoY" : divY,
                "memosizeH" : divH,
                "memosizeW" : divW,
                "txtBold" : mybold,
                "txtSize" : mysize
            }

            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(memoObj),
            });

        })
        //메모공용
    

        //텍스트 메모
        $(document).on('click',".memos #memoBold", function (event) {
            if ($(event.target).attr("value") == "1"){
                $(event.target).parent().parent().children().next().children("#mform").css("font-weight","bold")
                $(event.target).attr("value", "0")
            } else {
                $(event.target).parent().parent().children().next().children("#mform").css("font-weight","normal")
                $(event.target).attr("value", "1")
            }
        })
    
        $(document).on('click',".memos #memoBig", function (event) {
            let memoSize = parseInt($(event.target).parent().parent().children().next().children("#mform").css("font-size"))
            memoSize = memoSize+3;
            $(event.target).parent().parent().children().next().children("#mform").css("font-size", memoSize)
            console.log($(event.target).parent().parent().children().next().children("#mform"))
            console.log(memoSize);
        })
        $(document).on('click',".memos #memoSmall", function (event) {
            let memoSize = parseInt($(event.target).parent().parent().children().next().children("#mform").css("font-size"))
            memoSize = memoSize-3;
            $(event.target).parent().parent().children().next().children("#mform").css("font-size", memoSize)
            console.log($(event.target).parent().parent().children().next().children("#mform"))
            console.log(memoSize);
        })

        //텍스트 메모
        
        //이미지 사운드 메모

        $(document).on('mouseout', ".memos .memomain", function (evnet) {
            $(this).parent().draggable({
                disabled: true})
        })

        $(document).on('click',".memos .memomain", function (event) {
            $(this).parent().draggable({
                disabled: false,
                cursor:"move",
                stack:".memos",
                opacity:0.8
            })
        })

        //이미지/사운드 메모

        //헤더 슬라이드
        $('#headerbutton').on('click', function() {
            $('header').slideDown(500);
        })

        $('#headup').on('click', function() {
            $('header').slideUp(500);
        })

        //헤더 슬라이드
        
        //사이드 슬라이드
        $('#sideToggle').on('click', function() {
            $('aside').toggle('slide',{
                direction: 'right'}, 500);
        })
        $('#sidebutton').on('click', function() {
            $('aside').toggle('slide',{
                direction: 'right'}, 500);
        })

        //모달
        $('#logo').on('click', function() {
            $('#modalWrap').css("display","block");
        })
        $('#btnClose').on('click', function () {
            $('#modalWrap').css("display","none");
        })

        $('#btnClear').on('click', function () {
            clearMemos();
        })

//창 닫히면 서버로 데이터 전송
window.addEventListener('beforeunload', function (e) {
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({

        }),
    });
  });