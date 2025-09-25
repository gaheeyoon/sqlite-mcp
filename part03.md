### 3.2.1 데이터 베이스 만들기

- 예제 파일: [part03/book_sales.csv](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part03/book_sales.csv)
- 예제 파일: [part03/book_master.csv](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part03/book_master.csv)


#### 151쪽, SQL로 데이터 조회 테스트

```
SELECT * FROM book_sales;
```

---

### 3.2.2 자연어로 데이터 조회하기

#### 152쪽, Claude에 첫 질문 던지기

```
book_sales 테이블에서 ISBN 값이 ‘9791158394202’인 도서의 연월별 판매수량을 구해주세요. 판매수량은 sales_qty 칼럼에 값이 저장돼 있습니다.
```


#### 156쪽, Claude에 그래프 그리기 요청하기 

```
연월별 판매 수량을 막대 그래프로 그려주세요.
```

---

### 3.3.1 도서(전체) 월별판매내역 챗봇 구성하기

#### 160쪽, Claude 프로젝트 시작하기 

```
당신은 도서의 판매 정보를 수집해서 그래프로 그려주는 챗봇입니다. 다음 <SQL>을 실행해서 나온 데이터를 이용해서 대시보드 형태의 판매 보고서를 작성해주세요.
SELECT
    SUBSTR(sales_date, 1, 4) AS year,
    SUBSTR(sales_date, 5, 2) AS month,
    SUM(sales_qty) AS total_sales_qty
FROM book_sales
GROUP BY SUBSTR(sales_date, 1, 4), SUBSTR(sales_date, 5, 2)
ORDER BY year, month;
```


#### 162쪽, 지침에 입력할 SQL 작성하기 

```
- book_sales 테이블에서 연도별 월별 판매 수량 합계를 구하려고 합니다.
- 적절한 SQL 문을 만들어주세요. sales_qty 칼럼으로 판매 수량을 구해주세요.
```


#### 163쪽, 챗봇 테스트해보기

```
판매내역 보고서를 작성해주세요
```

- 결과 확인: [https://bit.ly/4namxbQ](https://bit.ly/4namxbQ)

---

### 3.3.2 전체 도서 월별판매내역 챗봇 업그레이드하기

#### 164쪽, 불필요한 항목은 제거

```
- 제목은 “위키북스 월별 판매내역 분석” 으로 수정해주세요 .
- 총판매량, 평균 월판매량, 최고 월 판매량, oYY 성장률 부분은 삭제해주세요.
- 계절별 판매 분포 데이터는 삭제해주세요.
- 주요 인사이트 대신 연월별 판매 내역을 테이블 형태로 보여주세요.
```

#### 165쪽, TSX 파일로 대시보드 저장하기

- 결과 확인: [https://bit.ly/3VTeN1O](https://bit.ly/3VTeN1O)


#### 167쪽, 프로젝트 지침 수정하기 

```
- book-sales-dashboard.tsx 와 같은 구성의 보고서를 만들어주세요.
```

---

### 3.4.1 개별 도서 월별판매내역 챗봇 구성하기

#### 172쪽, 새 프로젝트 만들기 

```
- 당신은 도서의 판매 정보를 수집해서 그래프로 그려주는 챗봇입니다.
- 사용자가 입력한 ‘ISBN’ 칼럼 값을 이용해서 다음 <SQL>을 실행해주세요

<SQL>

SELECT
    bs.isbn,
    bm.title,
    substr(bs.sales_date, 1, 4) AS year,
    substr(bs.sales_date, 5, 2) AS month,
    SUM(bs.sales_qty) AS total_sales_qty
FROM book_sales bs
INNER JOIN book_master bm ON bs.isbn = bm.isbn
WHERE bs.isbn = ‘ISBN’
GROUP BY bs.isbn, bm.title, substr(bs.sales_date, 1, 4),
substr(bs.sales_date, 5, 2)
ORDER BY year, month;
```


#### 174쪽, Claude에게 SQL 요청하기

```
다음 조건을 만족하는 SQL 문을 작성해주세요
- 입력받은 ISBN 칼럼 값으로 book_sales 테이블에서 연도별, 월별 판매수량을 구합니다. 판매수량은 ‘sales_qty’ 칼럼에 저장돼 있습니다.
- 입력받은 ISBN 칼럼 값으로 book_master 테이블에서 도서명을 구합니다.
도서명은 ‘title’ 칼럼에 저장돼 있습니다.
- book_sales 테이블과 book_master 테이블은 isbn 값으로 조인합니다.
- 출력순서는 ISBN, title, 연도, 월, 판매수량입니다.
```

---

### 3.4.2 개별 도서 월별판매내역 챗봇 업그레이드하기

#### 180쪽, 불필요한 항목은 제거

```
“상세 판매 데이터” 테이블에 있는 “비율” 칼럼은 삭제해 주세요.
```

#### 184쪽, 지침에 템플릿 파일 연결하기

```
- book-sales-chart.tsx와 같은 구성의 보고서를 만들어주세요.
```

#### 185쪽, 보고서 공유 및 수정하기

- 결과 확인: [https://bit.ly/4nxishs](https://bit.ly/4nxishs)


#### 186쪽, 사용자 지정 버튼 클릭 후 변형 요청

```
월별 판매량 바 차트에서 연도별로 색상을 구분해 주세요.
```
