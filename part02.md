### 2.2.1 윈도우 환경에서 Python 설치하기

#### 53쪽, 파이썬 공식 사이트

- Python 공식 사이트: [https://www.python.org/](https://www.python.org/)


#### 56쪽, 파이썬 설치 확인하기

```
python --version
```

---

### 2.2.2 윈도우 환경에서 uv 및 uvx 설치하기

#### 58쪽, uv 설치하기

```
powershell -ExecutionPolicy Bypass -c "irm https://astral.sh/uv/install.ps1 | iex"
```


#### 59쪽, uv 설치 확인하기

```
uv --version
uvx --version
```

---

### 2.2.3 macOS 환경에서 Python 설치하기

#### 61쪽, Homebrew 설치 확인하기

```
brew --version
```


#### 61쪽, Homebrew 설치하기

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


#### 62쪽, Homebrew 설치 확인하기

```
brew --version
```

#### 62쪽, Python 설치하기

```
brew install python
```


#### 62쪽, Python 설치 확인하기

```
python3 --version
```

---

### 2.2.4 macOS 환경에서 uv 및 uvx 설치하기

#### 63쪽, uv 설치하기

```
curl -LsSf https://astral.sh/uv/install.sh | sh
```


#### 64쪽, uv 설치 확인하기

```
uv --version
uvx --version
```

---

### 2.2.5 Claude Desktop 앱 설치하기

#### 65쪽, Claude Desktop 다운로드 페이지

- Claude Desktop 다운로드 페이지: [https://claude.ai/download](https://claude.ai/download)

---

### 2.2.6 MCP 설정 파일에 환경 정보 추가하기

- 예제 파일: [part02/book_sales_info.db](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/book_sales_info.db)

---

### 2.3.1 데이터 준비하기

- 예제 파일: [part02/bank_statements.xlsx](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/bank_statements.xlsx)

---

### 2.3.2 데이터 입력하기

- 예제 파일: [part02/bank_statements.csv](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/bank_statements.csv)


#### 79쪽, Claude Desktop으로 직접 업로드하기

```
업로드한 bank_statements.xlsx 파일을 다음과 같은 조건에 따라 데이터베이스에 추가해주세요.  
* 테이블 이름은 bank_statements 입니다.
* 첫번째 행에 있는 이름으로 칼럼 이름을 생성해주세요.
* ‘거래일시’, ‘거래내용’ 칼럼은 TEXT 타입으로 생성해주세요.
* ‘출금’, ‘입금’ 칼럼은 INTEGER 타입으로 생성해주세요.
```


#### 88쪽, 데이터 입력 검증하기

```
bank_statements 테이블의 ‘입금’, ‘출금’ 칼럼 합계 금액을 구해주세요.
```

---

### 2.3.3 데이터 조회하기

#### 90쪽, 자연어로 특정 조건의 합계 조회하기

```
- bank_statements 테이블의 ‘거래내역’ 칼럼값이 ‘강산북스’인 레코드의 ‘입금’ 합계액을 구해주세요. 
- ‘거래일시’가 ‘2024년 1월 2일’ 부터 ‘2024년 1월 10일’ 까지인 레코드를 대상으로 합계액을 구해야 합니다.
```


#### 91쪽, CSV 파일로 결과 내보내기

```
‘거래내용’ 별 ‘입금’과 ‘출금’ 합계 내역을 CSV 파일 형태로 조회해주세요.
```


#### 92쪽, SQL 생성 요청 및 수동 실행하기

```
‘거래내용’ 별 ‘입금’과 ‘출금’ 합계 내역을 구하기 위한 SQL을 생성해주세요.
```

---

### 2.4.1 데이터 입력하기

- 예제 파일: [part02/손익계산서_sample.pdf](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/%E1%84%89%E1%85%A9%E1%86%AB%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%80%E1%85%A8%E1%84%89%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5_sample.pdf)


#### 97쪽, PDF 업로드 및 프롬프트 입력

```
업로드한 PDF에 있는 손익계산서를 book_sales_info 데이터베이스에 입력해주세요.
- income_statement 테이블을 만들어서 입력해주세요.
- 문서 내에 있는 모든 내용, 즉, 영업수익, 이자수익, 예치금이자 까지 모든 사항을 칼럼으로 만들어서 데이터를 추가해주세요.
- 칼럼명은 한글로 해주세요.
```

- 결과 확인: [https://bit.ly/3KnCtZC](https://bit.ly/3KnCtZC)


#### 99쪽, 테이블 구조 수정하기

```
- [현재] 저장된 ‘기간’ 필드 데이터를 [수정]과 같이 ‘연도’ 와 ‘회기’로 같이 재구성해서 테이블을 다시 생성해주세요.
- ‘연도’ 와 ‘회기’ 칼럼의 속성은 ‘TEXT’ 로 지정해주세요.
[현재]
‘기간’ - 제47기(2003년)
[수정]
‘연도’ - ‘2003’
‘회기’ - ‘47’
```

---

### 2.4.2 데이터 조회하기

#### 102쪽, 분석 가능한 항목 제안 받기

```
income_statemenet 테이블에는 손익 계산서 데이터가 들어 있습니다. 해당 테이블에 있는 데이터로 어떤 분석이 가능할지 설명해주세요.
```

- 결과 확인: [https://bit.ly/4nwWXNQ](https://bit.ly/4nwWXNQ)


#### 103쪽, 자연어 보고서 및 시각화 요청하기

```
- income_statemenet 테이블에 있는 데이터를 이용해서 “당기순이익, 영업이익, 경상이익의 연도별 추이 분석”을 진행해주세요.
- 분석 진행 후 다양한 그래프와 함께 경영진에게 보고할 보고서를 작성해주세요.
- 보고서는 텍스트와 그래프로 적절히 구성이 돼야 합니다.
```

- 결과 확인: [https://bit.ly/4o0Dw1a](https://bit.ly/4o0Dw1a)


#### 105쪽, Claude Artifact란?

- 손익 추이 분석 보고서 예시: [https://bit.ly/Claude_Artifacts](https://bit.ly/Claude_Artifacts)


#### 106쪽, SQL 코드 생성 및 직접 실행

```
- income_statemenet 테이블에 있는 데이터를 이용해서 “당기순이익, 영업이익, 경상이익의 연도별 추이 분석”을 진행하려고 합니다.
- 분석 진행을 위한 SQL 코드를 알려주세요. SQL 코드는 SQLite에서 실행이 가능해야 합니다.
```

- 결과 확인: [https://bit.ly/4n5xgnP](https://bit.ly/4n5xgnP)


#### 107쪽, 전년대비 증감률을 계산하기 위한 SQL

```
-- 전년 대비 증감률 계산
SELECT
    연도,
    -- 현재년도 실적 (억원 단위)
    ROUND(영업이익 / 100000000.0, 1) AS 영업이익_억원,
    ROUND(경상이익 / 100000000.0, 1) AS 경상이익_억원,
    ROUND(당기순이익 / 100000000.0, 1) AS 당기순이익_억원,

    -- 전년 대비 증감률 계산
    CASE
        WHEN LAG(영업이익) OVER (ORDER BY 연도) > 0 THEN
            ROUND((영업이익 - LAG(영업이익) OVER (ORDER BY 연도)) * 100.0 / LAG(영업이익) OVER (ORDER BY 연도), 2)
        ELSE NULL
    END AS 영업이익_증감률,
    
    CASE
        WHEN LAG(경상이익) OVER (ORDER BY 연도) > 0 THEN
            ROUND((경상이익 - LAG(경상이익) OVER (ORDER BY 연도)) * 100.0 / LAG(경상이익) OVER (ORDER BY 연도), 2)
        ELSE NULL
    END AS 경상이익_증감률,

    CASE
        WHEN LAG(당기순이익) OVER (ORDER BY 연도) > 0 THEN
            ROUND((당기순이익 - LAG(당기순이익) OVER (ORDER BY 연도)) * 100.0 / LAG(당기순이익) OVER (ORDER BY 연도), 2)
        ELSE NULL
    END AS 당기순이익_증감률

FROM income_statement
WHERE 연도 IS NOT NULL
ORDER BY 연도;
```

---

### 2.5.1 데이터 입력하기

- KB부동산 데이터 허브: [https://data.kbland.kr](https://data.kbland.kr)


#### 112쪽, Claude를 활용한 구조 변환

- 예제 파일: [part02/apartment_index.xlsx](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/apartment_index.xlsx)
- 
```
업로드한 apartment_index.xlsx 파일에 있는 데이터를 다음 조건에 따라서 데이터베이스에 입력해주세요.
- 1행에는 년-월이 지정돼 있고, A 칼럼에는 지역이 저장돼 있습니다. 해당 데이터를 기반으로 ‘년’, ‘월’, ‘지역’, ‘지수’로 구성된 테이블을 만들어야 합니다. 예를 들어서 2019,08,전국,75.111417 같은 형태로 테이블에 데이터가 저장돼야 합니다.
- 테이블 이름은 ‘apartment_index’입니다. 
- ‘-’ 로 표시된 부분은 0으로 표시해주세요.
```


#### 113쪽, CSV 파일로 변환 요청하기 

- 예제 파일: [part02/apartment_index_transformed.csv]([https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/apartment_index.xlsx](https://github.com/gaheeyoon/mcp-vibecoding/blob/main/part02/apartment_index_transformed.csv))

```
업로드한 apartment_index.xlsx 파일에 있는 데이터를 테이블에 입력하기 위한 형태로 바꾸려고 합니다.
- 1행에는 년-월이 지정돼 있고, A 칼럼에는 지역이 저장돼 있습니다. 해당 데이터를 ‘년’, ‘월’, ‘지역’, ‘지수’ 형태로 바꾸려고 합니다. 예를 들어서 2019,08,전국,75.111417 같은 형태로 바꿔주세요.
- ‘-’ 로 표시된 부분은 0으로 표시해주세요.
- 작업결과는 CSV 파일 형태로 보여주세요.
```

- 결과 확인: [https://bit.ly/3Vm40Nt](https://bit.ly/3Vm40Nt)


#### 115쪽, 더 효율적인 대안: Gemini 활용하기 

- Gemini: [https://gemini.google.com/](https://gemini.google.com/)

---

### 2.5.2 데이터 조회하기


#### 119쪽, 데이터로 어떤 분석이 가능한지 알아보기

```
apartment_index 테이블에는 전국의 지역별 아파트 인덱스 지수가 저장돼 있습니다. 해당 테이블에 있는 데이터로 어떤 분석이 가능할지 설명해주세요
```

#### 120쪽, 변동성 중심 분석 예시

```
- “안정성이 높은 지역 vs 변동성이 큰 지역 분류”에 대한 분석을 진행하고 결과 보고서를 작성해주세요.
- 추세 데이터는 HTML 파일을 이용한 그래프로 그려주세요. 
```

- 결과 확인: [https://bit.ly/42hB25p](https://bit.ly/42hB25p)


#### 123쪽, 데이터베이스 기반 분석의 장점

```
지역 칼럼 값이 ‘강남구’, ‘서울’, ‘경기’, ‘오산시’ 의 모든 ‘지수’를 얻기 위한 S QL을 알려주세요.
```
