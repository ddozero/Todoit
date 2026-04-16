/******************************************************************************
 * 프로젝트명 : TODOIT (JOB APPLICATION MANAGEMENT)
 * 프로시저명 : CHECK_USER_ID
 * 작성자    : DOYEONG KIM
 * 작성일    : 2026-04-16
 * 설명      : 입력받은 USER_ID의 중복 여부를 확인
 * - 결과값(SP_RESULT): 존재(1), 없음(0)
 ******************************************************************************/

USE TODOIT;

-- 기존 프로시저 삭제
DROP PROCEDURE IF EXISTS `CHECK_USER_ID`;

DELIMITER $$

CREATE PROCEDURE `CHECK_USER_ID`(
    IN  SP_USER_ID   VARCHAR(100),
    OUT SP_RESULT    INT
)
BEGIN
    -- 변수 선언
    DECLARE V_COUNT INT DEFAULT 0;

    /***********************************중복체크*****************************************/
    SELECT COUNT(*)
      INTO V_COUNT
      FROM `USER`
     WHERE `USER_ID` = SP_USER_ID;

    IF V_COUNT > 0 THEN
        -- 이미 존재하는 아이디
        SET SP_RESULT = 1;
    ELSE
        -- 사용 가능한 아이디
        SET SP_RESULT = 0;
    END IF;
    /******************************************************************************/

END $$

DELIMITER ;