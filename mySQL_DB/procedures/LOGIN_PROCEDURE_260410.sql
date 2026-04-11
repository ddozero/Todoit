/******************************************************************************
 * 프로젝트명 : TODOIT (Job Application Management)
 * 프로시저명 : LOGIN_USER
 * 작성자    : DOYEONG KIM
 * 작성일    : 2026-04-10
 * 설명      : 사용자 아이디/비밀번호를 확인하여 로그인 결과를 반환
 * - 결과값(SP_RESULT): 성공(1), 아이디없음(0), 비밀번호불일치(-1), 오류(-99)
 * - 결과메시지(SP_MESSAGE): 처리 결과 메시지 반환
 * - 사용자명(SP_NAME): 로그인 성공 시 사용자 이름 반환
 ******************************************************************************/

USE TODOIT;

-- 기존 프로시저가 있다면 삭제
DROP PROCEDURE IF EXISTS `LOGIN_USER`;

-- 구분자를 $$로 변경
DELIMITER $$

CREATE PROCEDURE `LOGIN_USER`(
    IN  SP_USER_ID    VARCHAR(100),
    IN  SP_PASSWORD   VARCHAR(200),
    OUT SP_RESULT     INT,
    OUT SP_MESSAGE    VARCHAR(100),
    OUT SP_NAME       VARCHAR(100)
)
BEGIN
    -- 변수 선언
    DECLARE V_COUNT INT DEFAULT 0;
    DECLARE V_PASSWORD VARCHAR(200);
    DECLARE V_NAME VARCHAR(100);

    -- 에러 핸들링
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET SP_RESULT = -99;
        SET SP_MESSAGE = '로그인 처리 중 오류가 발생했습니다.';
        SET SP_NAME = NULL;
    END;

    -- 기본값 세팅
    SET SP_RESULT = -99;
    SET SP_MESSAGE = '';
    SET SP_NAME = NULL;

    START TRANSACTION;

/***********************************조회*****************************************/
    -- 1. 아이디 존재 여부 확인
    SELECT COUNT(*)
      INTO V_COUNT
      FROM `USER`
     WHERE `USER_ID` = SP_USER_ID;

    IF V_COUNT = 0 THEN
        SET SP_RESULT = 0;
        SET SP_MESSAGE = '존재하지 않는 아이디입니다.';

    ELSE
        -- 2. 사용자 정보 조회
        SELECT `PASSWORD`, `NAME`
          INTO V_PASSWORD, V_NAME
          FROM `USER`
         WHERE `USER_ID` = SP_USER_ID;

        -- 3. 비밀번호 비교
        IF V_PASSWORD = SP_PASSWORD THEN
            SET SP_RESULT = 1;
            SET SP_MESSAGE = '로그인 성공';
            SET SP_NAME = V_NAME;
        ELSE
            SET SP_RESULT = -1;
            SET SP_MESSAGE = '비밀번호가 일치하지 않습니다.';
        END IF;
    END IF;
/******************************************************************************/

    COMMIT;

END $$

-- 다시 세미콜론(;)으로 구분자 복구
DELIMITER ;


 ============================================================
  [ 테스트 및 결과 확인 쿼리 ]
 ============================================================
 SET @out_result = 0;
 SET @out_message = '';
 SET @out_name = '';
 
 CALL LOGIN_USER('MANAGER', '1234', @out_result, @out_message, @out_name);
 
 SELECT
 	@out_result AS '실행결과',
 	@out_message AS '결과메시지',
    @out_name AS '사용자명';
 ============================================================ 