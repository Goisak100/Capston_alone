export default function MyPage() {
    return (
        <div>
            <h1>MyPage 페이지입니다.</h1>
        </div>
    )
}

// 마이 페이지에 오면, 해야 하는 건 다음과 같다.

// 일단, 유저의 이메일을 건넨다.
// 해당 이메일을 기반으로 포스팅을 조회한다.
// 포스팅을 출력한다.
// 포스팅을 수정할 수 있는가? 일단, 수정도 삭제도 안 되는 걸로 하자.
// 그러고보니까, 포스팅에는 like가 있어야 하지 않나? like를 누르면, 그대로 반영되는 로직이 필요한 걸로 알고 있는데....