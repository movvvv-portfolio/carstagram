
// 게시글 업로드 모달
$("#open-post-modal").on('click', function () {
    $(".modal-overlay2").fadeIn();
    $('body').css("overflow", "hidden");
});

$(document).on('click',function (e) {
    if( $(".modal-overlay2").is(e.target)) {
        $(".modal-overlay2").fadeOut();
        $('body').css("overflowY", "scroll");
    };
});



$(document).ready(function () {
    // 페이지 로드 시 post_listing 에 대한 값을 불러온다
    // bsCustomFileInput.init()
    post_listing('bs-custom-file-input')
    alert('안녕')
})
// 포스팅 시간 나타내기

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

/* POST 요청 ajax 코드 */
function post_posting() {
    // 고유 id let 함수로 정의
    let hashtag = $('#post_hashtag').val()
    let comment = $('#post_comment').val()
    let today = new Date().toISOString()

    let picture = $('#customFile')[0].files[0]
    let form_data = new FormData()

    form_data.append("hashtag_give", hashtag)
    form_data.append("picture_give", picture)
    form_data.append("comment_give", comment)
    form_data.append("date_give", today)

    $.ajax({
        type: "POST",
        url: "/posting",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}


/* GET 요청 ajax 코드 */
function post_listing() {
    $.ajax({
        type: "GET",
        url: "/listing",
        data: {},
        success: function (response) {
            let posts = JSON.parse(response['posts'])

            for (let i = 0; i < posts.length; i++) {
                let post = posts[i]
                let time_post = new Date(post["date"])
                let time_before = time2str(time_post)
                let post_picture = posts[i]['post_pictures']
                let post_comment = posts[i]['post_comments']
                let post_pic = posts[i]['post_pic']
                let post_id = posts[i]['_id']['$oid']


                let temp_html =`
                            <div class="feed-box" id="feed_box">
                                <!--                상단의 이미지와 이름 그리고 ''' 아이콘-------------------------------------------------->
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2%; margin-left: 1%; margin-bottom: 2%;">
                                    <div style="display: flex; align-items: center">
                                        <div class="box-profile">
                                            <a href=""><img class="profile"
                                                            src="http://kaihuastudio.com/common/img/default_profile.png"></a>
                                        </div>
                                        <div style="margin-left: 10px">
                                            user_id
                                        </div>
                                    </div>
                                    <div>
                                        <button id="open-modal" class="btn-open-popup" style="border: none; background-color: white;">
                                            <span class="material-icons-outlined" style="margin-right: 15px;">more_horiz</span>
                                        </button>
                                    </div>
                                </div>
                                <!--                메인 피드 슬라이드 사진--------------------------------------------------------------->
                                <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false"
                                     data-bs-interval="false" style="height: 600px;">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="../static/${post_pic}"
                                                 class="d-block w-100 feed-picture" alt="...">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <!--                사진 아래 아이콘--------------------------------------------------------------------->
                                <div style="margin-top: 2%; display: flex; flex-direction: row; justify-content: space-between;">
                                    <div style="margin-left: 10px;">
                                        <button class="like-btn" onclick="like()"><span class="material-icons-outlined">favorite_border</span></button>
                                        <span class="material-icons-outlined">mode_comment</span>
                                        <span class="material-icons-outlined">send</span>
                                    </div>
                                    <div style="margin-right: 10px;">
                                        <span class="material-icons-outlined">bookmark_border</span>
                                    </div>
                                </div>
                                <div style="margin-left: 10px;">
                                    <!--                좋아요-->
                                    <div>좋아요 1개</div>
                                    <!--                    게시자 글-->
                                    <div>
                                        <div><a href='#' class="name">IlikeCar</a>
                                        <span style="font-weight: lighter; color: dodgerblue;">
                                        ${post_picture}
                                        </span>
                                        <span style="font-weight: lighter">${post_comment}</span>
                                        <span style="color: #c7c7c7">더보기</span>
                                        </div>
                                    </div>
                                    <!--                댓글모두보기-->
                                    <!--<div style="font-weight: lighter; color: grey">댓글 3,243개 모두보기</div>-->
                                    <!--                댓글-->
                                    <div id="" class="${post_id}">
                    
                                    </div>
                                    <!--                몇일,시간,분전-->
                                    <div style="font-weight: lighter; font-size: 10px;">${time_before}</div>
                                    <!--                댓글달기-->
                                    <div style="display:flex; flex-direction: row; justify-content: center; margin-left: -10px; margin-top: 10px; border-top: solid 1px #dbdbdb;">
                                        <span style="margin-left: 8px; margin-top: 7px;" class="material-symbols-outlined">mood</span>
                                        <input type="text" class="form-control"
                                               style="box-shadow: none; border: none; border-radius: 0px;" id="${post_id}"
                                               placeholder="댓글 달기 ..."/>
                                        <button id = "comment-1"onclick="add_comment('${post_id}')"
                                                style="background-color: white; border: none; width: 50px; margin-right: 8px; text-decoration: none; color: cornflowerblue; font-weight: bold">
                                            게시
                                        </button>
                                    <!--  -->
                                    </div>
                                </div>`
                $('#post-feed-box').append(temp_html)
            }
        }
    })
}


