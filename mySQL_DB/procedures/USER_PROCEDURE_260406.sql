/******************************************************************************
 * 프로젝트명 : TODOIT (Job Application Management)
 * 프로시저명 : SIGNUP_USER
 * 작성자    : DOYEONG KIM
 * 작성일    : 2026-04-06
 * 설명      : 회원가입 정보를 받아 USER 테이블에 저장
 * - USER_NO는 'YYMMDDHHmmss + 랜덤3자리'로 자동 생성함.
 * - 결과값(SP_RESULT): 성공(1), 오류(0)
 ******************************************************************************/

USE TODOIT;

-- 기존 프로시저가 있다면 삭제 
DROP PROCEDURE IF EXISTS `SIGNUP_USER`;

-- 구분자를 $$로 변경 
DELIMITER $$

CREATE PROCEDURE `SIGNUP_USER`(
	IN SP_USER_ID   VARCHAR(100),
	IN SP_PASSWORD  VARCHAR(200),
	IN SP_NAME      VARCHAR(100),
	IN SP_PHONE     VARCHAR(50),
	IN SP_EMAIL     VARCHAR(100),
	OUT SP_RESULT   INT
)
BEGIN
	-- 에러 핸들링
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET SP_RESULT = 0;
	END;

	-- 트랜잭션 시작
	START TRANSACTION;

/***********************************저장*****************************************/
	INSERT INTO `USER` (
		`USER_NO`,
		`USER_ID`,
		`PASSWORD`,
		`NAME`,
		`PHONE`,
		`EMAIL`,
		`CREATED_AT`
	)
	VALUES (
		-- USER_NO : 'YYMMDDHHmmss + 랜덤3자리'
		CONCAT(DATE_FORMAT(NOW(), '%y%m%d%H%i%s'), LPAD(FLOOR(RAND() * 1000), 3, '0')),
		SP_USER_ID,
		SP_PASSWORD,
		SP_NAME,
		SP_PHONE,
		SP_EMAIL,
		NOW()
	);
/******************************************************************************/
	-- 확정 및 결과 값 세팅
	COMMIT;
	SET SP_RESULT = 1;

END $$ -- 프로시저 끝

-- 다시 세미콜론(;)으로 구분자 복구
DELIMITER ;

/* ============================================================
 * [ 테스트 및 결과 확인 쿼리 ]
 * ============================================================
 * SET @out_res = 0;
 * CALL SIGNUP_USER('MANAGER', '1234', '관리자', '010-1234-5678', 'MANAGER@example.com', @out_res);
 * SELECT @out_res AS '실행결과';
 * SELECT * FROM `USER` ORDER BY CREATED_AT DESC;
 * ============================================================ */