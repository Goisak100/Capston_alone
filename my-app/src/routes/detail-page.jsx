import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function DetailPage() {

    const location = useLocation();

    const isbn = location?.state?.isbn;

    const [postings, setPostings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isbn === undefined) return;
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/getPostingsByBook`, {
                    params: {
                        isbn: isbn,
                    }
                });
                setPostings(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

    }, [isbn]);

    if (isLoading) {
        return (
            <div>로딩 중입니다...</div>
        )
    }

    return (
        <div>
            <h1>DetailPage 페이지입니다.</h1>
            {postings.length === 0
                ? <div>아직 작성된 게시글이 존재하지 않습니다.</div>
                : postings.map((posting, index) => {
                    return (
                        <div key={index}>
                            <h3>제목: {posting.title}</h3>
                            <p>사진: {posting.imageUrl}</p>
                            <p>내용: {posting.content}</p>
                            <p>작성자: {posting.email}</p>
                            <p>좋아요: {posting.like}</p>
                        </div>
                    );
                })} 
        </div>
    )
}

// 이제 내가 해야 하는 기능 하나를 추가했다.
// 이를 위해서 JPA에서 엔티티를 설계하는 방법을 학습했다.
// 양방향 데이터를 그대로 직렬화하면 안 되는 것과, Serializable을 구현하지 않으면 직렬화할 수 없다는 것도 알았다.
// 설정하면서 주의해야 하는 부분도 학습했다. 성과는 확실히 있다. 그러고보면, 위에서 순환 참조 문제를 발견하지 못했다면, 꽤나
// 골머리를 앓았을 것이다. 일단, 주소를 직접 치고 들어가보는 것도 괜찮은 선택이라고 느꼈기 때문이다.
// 에러를 다각화에서 접하는 것, 또한 에러를 해석하는 능력을 키우는 것이 살아남는데 도움이 되는 듯하다.

// 공부를 잘하려면, 에러를 읽을 줄 알아야 한다. 무엇이 문제인지 다 알려준다. 그것을 캐치하는 능력이 제일 중요하다.
// 이 과정에서 모르면, 찾아보면 되는 거고, 다음에 비슷한 에러가 발생하지 않도록 노력하며, 설사 발견하더라도 수정할 수 있는
// 능력을 가지게 된다. 참 좋은 능력이다. (세간에서는 이를 문제해결능력이라고 부른다.)

// 기능 구현을 위해 처절히 발버둥치고, 그 과정에서 에러를 끊임없이 마주하며, 이를 해결하기 위해 발버둥쳐라.
// 그러면서, 에러를 대처하는 능력, 문제해결능력을 향상시켜라.


// 1. 이미지 경로 기반으로 사진을 출력해주는 것.
// 2. 메인화면에서 플러스 버튼을 눌러서 이미지를 등록하는 것
// 3. 이미지를 등록한다는 거는, 내가 어떤 책을 구매했는지 알 수 있어야 한다.
// 4. 마이페이지를 눌렀을 때 내가 업로드한 사진을 볼 수 있어야 한다. (이게 가장 쉽기는 할 듯하다)

// 5. 책을 구매하는 기능 (단순 클릭, 구매 목록에 추가되는 것, 이미지 등록에서 확인하기)
// 6. 로그인하는 기능
// 7. 회원가입하는 기능
// 9. 해당 기능은 실제로 결제가 되는 것이 아니라, 어떤 사이트에 덧붙여서 사용하는 느낌이기 때문이다.

// 공식 문서를 해석해서 읽는 것 (영어 읽기 능력의 중요성)
// GPT로 기본적인 내용 훑기, (항상 21년 9월 이전이라는 걸 인지하기)
// 구글링으로 교차 검증을 빠른 시일 안에 진행하기


// 일단, goisak100@naver.com이라고만 가정하자.
// 그럼 해당 페이지에서 사진을 등록하고 추가하는 것을 처리 해야 한다.


// 일단 웹페이지를 어떻게 띄우는지 알아야 한다. (팝업 창 말하는 거임)
// 아니, 팝업을 띄울 이유는 없다. 새로운 게시글을 작성하는 곳으로 이동하면 됨
// 어차피, 모바일 기준으로 될 텐데 이를 지금 고려할 필요는 없다.

// 기본적으로 어떻게 해야 할까?
// 일단 기능만 생각하자. 디자인은 잠시 빼자.

// 플러스 버튼을 누르면, 페이지를 이동한다. (업로드 하는 장소)
// 내가 후기를 작성할 수 있는 책들이 나열된다. (구매한 책 한정해서 적을 수 있음)
    // 원래는 한 번 작성하면, 더는 작성할 수 없게 되어야 함
    // 관련되어서 데이터를 처리하는 부분이 필요하긴 함


// 첫째, 일단 내가 구매한 책 목록을 불러와야 한다.
// 책을 불러오는 로직을 먼저 작성하자.

// upload-page.jsx를 만든다.
// 어떤 값을 전달할 수 있는가? 일단, email을 전달할 수 있다.
// 이메일을 전달해서, 해당 이메일을 가지고, 조회를 하자.
// 내가 email에 해당하는 User를 가져온다. 구매한 목록을 가져오면 되잖아.
// 일단 Orders를 가져오고, 각각의 OrderDetail을 가져와서.

// 어떻게 해야 하지?
// 지금 필요한 값이 무엇인가?
// 고객이 구매한 책의 목록을 가져오고 싶다. 중복 제거해야 함


// 이미지 생성하는 로직을 먼저 작성하자.

// 즉, 여기에서 코드를 작성해서 발송하면, 이미지가 생성된다. 하나씩 진행하자.
