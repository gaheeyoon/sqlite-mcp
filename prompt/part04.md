### 4.1 인세 메일 자동 발송 템플릿 소개

- 인세 메일 자동 발송 템플릿: [https://bit.ly/royalty_mail](https://bit.ly/royalty_mail)

---

### 4.1.3 인세 자동 메일 발송 템플릿 사용해보기

- 인세 메일 자동 발송 템플릿: [https://bit.ly/royalty_mail](https://bit.ly/royalty_mail)

---

### 4.2.1 월별, ISBN별 판매 데이터 구하기

#### 213쪽, 두 테이블을 조합해 데이터 만들기

```
book_master 테이블과 book_sales 테이블을 사용하여, 2025년 상반기(1월~6월) 동안의 도서별 월간 판매 실적을 집계하는 SQL을 작성해주세요.
- 조인(결합) 조건: book_master.isbn = book_sales.isbn
- 기간 조건: book_sales.sales_date 가 ‘20250101’부터 ‘20250630’까지
- 그룹 조건: 도서(ISBN) 및 판매 연월별로 그룹화
- 집계 항목: 판매수량(sale_qty)과 판매금액(sale_amt)의 합계

[최종 결과 컬럼]
- book_master.isbn
- book_master.title
- book_master.author
- sales_date (연월만 추출, 예: ‘202501’)
- sale_qty (월별 합계)
- sale_amt (월별 합계)
```

#### 214쪽, Claude가 생성한 SQL 코드 

```
SELECT
    bm.isbn,
    bm.title,
    bm.author,
    SUBSTR(bs.sales_date, 1, 6) AS sales_date,
    SUM(bs.sales_qty) AS sale_qty,
    SUM(bs.sales_amt) AS sale_amt
FROM book_master bm
INNER JOIN book_sales bs ON bm.isbn = bs.isbn 
WHERE bs.sales_date >= '20250101'
    AND bs.sales_date <= '20250630'
GROUP BY
    bm.isbn,
    bm.title,
    bm.author,
    SUBSTR(bs.sales_date, 1, 6)
ORDER BY
    bm.isbn,
    SUBSTR(bs.sales_date, 1, 6);
```

---

### 4.2.2 판매 데이터를 피벗 형태로 바꾸기

#### 218쪽, Claude에게 요청할 프롬프트

```
2025년 상반기(1월~6월) 동안의 도서별 판매 실적을 집계하는 SQL을 작성해주세요. 최종 결과는 각 도서의 월별 판매 실적과 인세가 하나의 행에 가로로 펼쳐진 형태여야 합니다.
- 조인(결합) 조건: book_master.isbn = book_sales.isbn
- 기간 조건: book_sales.sales_date가 ‘20250101’ 부터 ‘20250630’ 까지
- 그룹 조건: 도서(isbn, title, author) 별로 그룹화
- 집계 항목: 각 월에 해당하는 판매수량(sale_qty)과 판매금액(sale_amt)의
합계
- 인세 항목: 판매수량 합계*book_master.price*0.1

[최종 결과 컬럼]
- book_master.isbn
- book_master.title
- book_master.author
- 1월_판매수량 (2025년 1월의 sale_qty 합계)
- 1월_판매금액 (2025년 1월의 sale_amt 합계)
- 2월_판매수량 (2025년 2월의 sale_qty 합계)
- 2월_판매금액 (2025년 2월의 sale_amt 합계)
- 3월_판매수량 (2025년 3월의 sale_qty 합계)
- 3월_판매금액 (2025년 3월의 sale_amt 합계)
- 4월_판매수량 (2025년 4월의 sale_qty 합계)
- 4월_판매금액 (2025년 4월의 sale_amt 합계)
- 5월_판매수량 (2025년 5월의 sale_qty 합계)
- 5월_판매금액 (2025년 5월의 sale_amt 합계)
- 6월_판매수량 (2025년 6월의 sale_qty 합계)
- 6월_판매금액 (2025년 6월의 sale_amt 합계)
- 총판매수량(2025년 1월~6월의 sale_qty 합계)
- 인세(book_master.price*총판매수량*0.1)
```

#### 220쪽, Claude가 생성한 피벗형 SQL 예시

```
SELECT
    bm.isbn,
    bm.title,
    bm.author,
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202501' THEN
bs.sales_qty ELSE 0 END) AS '1월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202501' THEN
bs.sales_amt ELSE 0 END) AS '1월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202502' THEN
bs.sales_qty ELSE 0 END) AS '2월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202502' THEN
bs.sales_amt ELSE 0 END) AS '2월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202503' THEN
bs.sales_qty ELSE 0 END) AS '3월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202503' THEN
bs.sales_amt ELSE 0 END) AS '3월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202504' THEN
bs.sales_qty ELSE 0 END) AS '4월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202504' THEN
bs.sales_amt ELSE 0 END) AS '4월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202505' THEN
bs.sales_qty ELSE 0 END) AS '5월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202505' THEN
bs.sales_amt ELSE 0 END) AS '5월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202506' THEN
bs.sales_qty ELSE 0 END) AS '6월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202506' THEN
bs.sales_amt ELSE 0 END) AS '6월_판매금액',
    SUM(bs.sales_qty) AS '총판매수량',
    (bm.price * SUM(bs.sales_qty) * 0.1) AS '인세'
FROM book_master bm
INNER JOIN book_sales bs ON bm.isbn = bs.isbn
WHERE bs.sales_date >= '20250101'
    AND bs.sales_date <= '20250630'
GROUP BY
    bm.isbn,
    bm.title,
    bm.author,
    bm.price
ORDER BY
    bm.isbn;
```

---

### 4.2.3 인세 지급 정보 포함하기

#### 223쪽, SQL 프롬프트 요청 방식

```
- 아래 [SQL]에 author_master 테이블에 있는 [추가칼럼]을 추가하는 SQL문을 작성해주세요.
- author_master 테이블의 isbn 칼럼과 book_master 테이블의 isbn 칼럼이 같은 값을 가지고 있습니다.

[추가칼럼] 
main_author, main_author_mail, jumin_num, bank_num, rep,

[SQL]
SELECT
    bm.isbn,
    bm.title,
    bm.author,
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202501' THEN bs.sales_qty ELSE 0 END) AS ‘1월_판매수량’,
.
.
    SUM(bs.sales_qty) AS '총판매수량',
    (bm.price * SUM(bs.sales_qty) * 0.1) AS '인세'
FROM book_master bm
INNER JOIN book_sales bs ON bm.isbn = bs.isbn
WHERE bs.sales_date >= '20250101'
    AND bs.sales_date <= '20250630'
GROUP BY
    bm.isbn,
    bm.title,
    bm.author,
    bm.price
ORDER BY
    bm.isbn;
```

#### 225쪽, Claude가 생성한 SQL 결과

```
SELECT
    bm.isbn,
    bm.title,
    bm.author,
    am.main_author,
    am.main_author_mail,
    am.jumin_num,
    am.bank_num,
    am.rep,
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202501' THEN bs.sales_qty ELSE 0 END) AS '1월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202501' THEN bs.sales_amt ELSE 0 END) AS '1월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202502' THEN bs.sales_qty ELSE 0 END) AS '2월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202502' THEN bs.sales_amt ELSE 0 END) AS '2월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202503' THEN bs.sales_qty ELSE 0 END) AS '3월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202503' THEN bs.sales_amt ELSE 0 END) AS '3월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202504' THEN bs.sales_qty ELSE 0 END) AS '4월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202504' THEN bs.sales_amt ELSE 0 END) AS '4월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202505' THEN bs.sales_qty ELSE 0 END) AS '5월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202505' THEN bs.sales_amt ELSE 0 END) AS '5월_판매금액',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202506' THEN bs.sales_qty ELSE 0 END) AS '6월_판매수량',
    SUM(CASE WHEN SUBSTR(bs.sales_date, 1, 6) = '202506' THEN bs.sales_amt ELSE 0 END) AS '6월_판매금액',
    SUM(bs.sales_qty) AS '총판매수량',
    (bm.price * SUM(bs.sales_qty) * 0.1) AS '인세'
FROM book_master bm
INNER JOIN book_sales bs ON bm.isbn = bs.isbn
LEFT JOIN author_master am ON bm.isbn = am.isbn
WHERE bs.sales_date >= '20250101'
    AND bs.sales_date <= '20250630'
GROUP BY
    bm.isbn,
    bm.title,
    bm.author,
    bm.price,
    am.main_author,
    am.main_author_mail,
    am.jumin_num,
    am.bank_num,
    am.rep
ORDER BY
    bm.isbn;
```

---

### 4.3.2 메일 템플릿 만들기

#### 233쪽, 텍스트 메일 템플릿 작성

```
안녕하세요. 위키북스 출판사 정산 담당자입니다.

2025년 상반기 전자책 판매 내역을 정리했습니다.

이번에 인세로 총 tot_royalty 원을 지급해드릴 수 있을 것 같은데요,
아래 계좌번호가 맞는지 확인해주시면 인세를 송금해드리겠습니다.
좋은 책을 집필해주셔서 다시 한번 감사드립니다.

고맙습니다. :)

[도서 기본 정보]

ISBN : ebook_isbn
도서명 : book_title

[2025 상반기 판매내역(수량 / 금액)]

1월 : (1_qty / 1_amt)
2월 : (2_qty / 2_amt)
3월 : (3_qty / 3_amt)
4월 : (4_qty / 4_amt)
5월 : (5_qty / 5_amt)
6월 : (6_qty / 6_amt)

[2025 정산내역]

총 판매금액 : tot_amt
인세 지급액 : tot_royalty

[계좌 번호]

bank_num

[참고 사항]

* 인세 지급액은 총 판매금액의 25% 금액으로, 사업소득세 3.3%를 공제하고
계좌로 입금됩니다.
* 여러 명의 저자가 있을 경우 요청한 비율에 따라서 인세가 분할
지급됩니다.
```

#### 236쪽, HTML 템플릿으로 변환하기

```
다음 데이터를 HTML 형태의 메일로 보내려고 합니다. 가장 최소한의 표준적인 HTML문법을 사용해서 재구성해주세요

안녕하세요. 위키북스 출판사 정산 담당자입니다.

2025년 상반기 전자책 판매 내역을 정리했습니다.
이번에 인세로 총 tot_royalty 원을 지급해드릴 수 있을 것 같은데요,
아래 계좌번호가 맞는지 확인해주시면 인세를 송금해드리겠습니다.
좋은 책을 집필해주셔서 다시 한번 감사드립니다.

고맙습니다. :)
.
.
.
```

#### 236쪽, HTML 템플릿
```
<!DOCTYPE html>
<html lang=""ko"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>전자책 인세 지급 안내</title>
</head>
<body style=""font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;"">
    <table style=""max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;"">
        <tr>
            <td style=""padding: 30px;"">
                <h2 style=""color: #2c3e50; margin-bottom: 20px;"">인세 지급 안내</h2>
                
                <p style=""margin-bottom: 15px;"">안녕하세요. 위키북스 출판사 정산 담당자입니다.</p>
                
                <p style=""margin-bottom: 15px;"">2025년 상반기 전자책 판매 내역을 정리했습니다.<br>
                이번에 인세로 총 <strong>tot_royalty</strong> 원을 지급해드릴 수 있을 것 같은데요,<br>
                아래 계좌번호가 맞는지 확인해주시면 인세를 송금해드리겠습니다.<br>
                좋은 책을 집필해주셔서 다시 한번 감사드립니다.<br><br>
                고맙습니다. :)</p>
                
                <h3 style=""color: #34495e; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;"">도서 기본 정보</h3>
                <table style=""width: 100%; table-layout: fixed; border-collapse: collapse; margin-bottom: 25px;"">
                    <colgroup>
                        <col style=""width: 30%;"">
                        <col style=""width: 70%;"">
                    </colgroup>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">ISBN</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">ebook_isbn</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">도서명</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">book_title</td>
                    </tr>
                </table>
                
                <h3 style=""color: #34495e; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;"">2025 판매내역 (수량 / 금액)</h3>
                <table style=""width: 100%; table-layout: fixed; border-collapse: collapse; margin-bottom: 25px;"">
                    <colgroup>
                        <col style=""width: 30%;"">
                        <col style=""width: 70%;"">
                    </colgroup>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">1월</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">(1_qty 권 / 1_amt 원)</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">2월</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">(2_qty 권 / 2_amt 원)</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">3월</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">(3_qty 권 / 3_amt 원)</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">4월</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">(4_qty 권 / 4_amt 원)</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">5월</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">(5_qty 권 / 5_amt 원)</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">6월</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">(6_qty 권 / 6_amt 원)</td>
                    </tr>
                </table>
                
                <h3 style=""color: #34495e; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;"">2025 정산내역</h3>
                <table style=""width: 100%; table-layout: fixed; border-collapse: collapse; margin-bottom: 25px;"">
                    <colgroup>
                        <col style=""width: 30%;"">
                        <col style=""width: 70%;"">
                    </colgroup>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">총 판매금액</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd;"">tot_amt 원</td>
                    </tr>
                    <tr>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: bold;"">인세 지급액</td>
                        <td style=""padding: 8px 12px; border: 1px solid #ddd; color: #e74c3c; font-weight: bold;"">tot_royalty 원</td>
                    </tr>
                </table>
                
                <h3 style=""color: #34495e; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;"">계좌 번호</h3>
                <div style=""padding: 15px; background-color: #ecf0f1; border-radius: 5px; font-size: 14px;"">
                    bank_num
                </div>
                
                <h3 style=""color: #34495e; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;"">참고 사항</h3>
                <div style=""padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; color: #856404;"">
                    <div style=""white-space: nowrap;"">* 인세 지급액은 총 판매금액의 25% 금액으로, 사업소득세 3.3%를 공제하고 계좌로 입금됩니다.</div>
                    <div>* 여러 명의 저자가 있을 경우 요청한 비율에 따라서 인세가 분할 지급됩니다.</div>
                </div>

            </td>
        </tr>
    </table>
</body>
</html>
```


### 4.3.3 메일 자동 발송 프로그램 구현하기

#### 239쪽, 제목 만들기

```
=SUBSTITUTE("xxx 님 안녕하세요. 2025년 상반기 전자책 인세 정산 내역
관련해서 메일 드립니다.", "xxx", $C2)
```

#### 241쪽, 본문 만들기

```
=LET(
    template, 'mail-temp'!$B$2,
    step1, SUBSTITUTE(template, "tot_royalty", $V2),
    step2, SUBSTITUTE(step1, "ebook_isbn", $A2),
    step3, SUBSTITUTE(step2, "book_title", $B2),
    step4, SUBSTITUTE(step3, "1_qty", $I2),
    step5, SUBSTITUTE(step4, "1_amt", $J2),
    step6, SUBSTITUTE(step5, "2_qty", $K2),
    step7, SUBSTITUTE(step6, "2_amt", $L2),
    step8, SUBSTITUTE(step7, "3_qty", $M2),
    step9, SUBSTITUTE(step8, "3_amt", $N2),
    step10, SUBSTITUTE(step9, "4_qty", $O2),
    step11, SUBSTITUTE(step10, "4_amt", $P2),
    step12, SUBSTITUTE(step11, "5_qty", $Q2),
    step13, SUBSTITUTE(step12, "5_amt", $R2),
    step14, SUBSTITUTE(step13, "6_qty", $S2),
    step15, SUBSTITUTE(step14, "6_amt", $T2),
    step16, SUBSTITUTE(step15, "tot_amt", $U2),
    SUBSTITUTE(step16, "bank_num", $G2)
)
```

#### 246쪽, 자동 발송 프로그램 작성하기 

```
다음과 같은 조건으로 메일을 발송하는 구글 앱스 스크립트 코드를 만들어 주세요. Y 칼럼이 체크가 되면 메일이 발송이 되고, 발송 완료 후 체크 상태가 해제돼야 합니다.

- E 칼럼 : 받는 사람 메일 주소
- W 칼럼 : 메일 제목
- X 칼럼 : 메일 본문
- Y 칼럼 : 발송 여부
- Z 칼럼 : 메일 상태
```

---

### 4.4.1 HTML 코드 수정하기

#### 252쪽, Claude에게 HTML 코드 수정 요청하기

```
<기존 메일> 내용을 기초로 <기존 HTML> 내용을 만들었습니다. <수정 메일> 내용을 기초로 <기존 HTML>과 같은 구성의 HTML 코드를 생성해주세요.

<기존 메일>

안녕하세요. 위키북스 박찬규입니다.
2025년 상반기 전자책 판매 내역을 정리했습니다.
이번에 총 tot_royalty 원에 대한 인세를 지급해드릴 수 있을 것 같은데요,

[2025 전자책 정산내역]

총 판매금액 : tot_amt
인세 지급액 : tot_royalty

[계좌 번호]
.
.
</기존 메일>

<수정 메일>

안녕하세요. 위키북스 박찬규입니다.
2025년 상반기 전자책 판매 내역을 정리했습니다.
이번에 총 tot_royalty 원에 대한 인세를 지급해드릴 수 있을 것 같은데요,
.
.
[2025 전자책 정산내역]

총 판매금액 : tot_amt
인세 지급액 : tot_royalty
실지급 인세 : real_royalty

[계좌 번호]
.
.
</수정 메일>

<기존 HTML>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initialscale=1.0">
    <title>전자책 인세 지급 안내</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color:
#333; margin: 0; padding: 20px; background-color: #f9f9f9;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;">
        <tr>
            <td style="padding: 30px;">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">인세 지급 안내</h2>
                <p style="margin-bottom: 15px;">안녕하세요. 위키북스 출판사
정산 담당자입니다.</p>
.
.
.
</기존 HTML>
```


#### 255쪽, LET 함수 수정하기

```
=LET(
    template, 'mail-temp'!$B$2,
    step1, SUBSTITUTE(template, "tot_royalty", $V2),
    step2, SUBSTITUTE(step1, "ebook_isbn", $A2),
    ...
    step16, SUBSTITUTE(step15, "tot_amt", $U2),
    step17, SUBSTITUTE(step16, "real_royalty", $W2),
    SUBSTITUTE(step16, "bank_num", $G2)
)
```

#### 257쪽, 코드에서 변경할 부분

```
let subject = row[23]; // X열: 메일 제목
let body = row[24]; // Y열: 메일 본문
let checked = row[25]; // Z열: 발송 체크
let status = row[26]; // AA열: 발송 상태
```


#### 258쪽, 프롬프트 예시: AI에게 요청하는 방식

```
다음과 같이 구성된 [코드]를 수정해주세요.

기존 구성:
- W 칼럼: 메일 제목
- X 칼럼: 메일 본문
- Y 칼럼: 발송 체크
- Z 칼럼: 발송 상태

변경 후 구성:
- X 칼럼: 메일 제목
- Y 칼럼: 메일 본문
- Z 칼럼: 발송 체크
- AA 칼럼: 발송 상태

→ 이에 따라 참조되는 row[] 인덱스를 모두 수정해주세요.

[코드]
기존 코드(mailSendCode.txt) 입력
```
