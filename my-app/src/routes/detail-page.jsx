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


// 자, 그러면 이제 무슨 기능을 추가해야 하지?
// 단순하게 조회하는 기능은 구현했다. 무엇이 본질인지 파악하면서 우선순위를 매겨서 기능 구현을 하자.

// 1. 이미지 경로 기반으로 사진을 출력해주는 것.
// 2. 메인화면에서 플러스 버튼을 눌러서 이미지를 등록하는 것
// 3. 이미지를 등록한다는 거는, 내가 어떤 책을 구매했는지 알 수 있어야 한다.
// 4. 마이페이지를 눌렀을 때 내가 업로드한 사진을 볼 수 있어야 한다. (이게 가장 쉽기는 할 듯하다)

// 5. 책을 구매하는 기능 (단순 클릭, 구매 목록에 추가되는 것, 이미지 등록에서 확인하기)
// 6. 로그인하는 기능
// 7. 회원가입하는 기능
// 9. 해당 기능은 실제로 결제가 되는 것이 아니라, 어떤 사이트에 덧붙여서 사용하는 느낌이기 때문이다.

// 일단 가장 쉬운 것부터 한 번 해보자. 지금은 에너지를 보충할 필요성이 있다.