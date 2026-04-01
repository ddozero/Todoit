import { useState } from 'react'
import './App.css'

function MyPage() {
  const [isEdit, setIsEdit] = useState(false);

  const [user, setUser] = useState({
    profileImg: 'https://test.com/',
    name: '김도영',
    engName: 'kim do yeong',
    gender: '여성',
    birth: '1995-06-10',
    age: 31,
    nationality: '대한민국',
    phone: '010-1234-5678',
    email: 'dozero@test.com',
    address: '경기도 김포시'
  });

  //텍스트 입력 처리 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  //사진 업로드 처리
  const handleImageChage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user, profileImg: reader.result
        });
      };
      reader.readeAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>MY PAGE</h1>
      <div>
        <h2>내 정보</h2>
        <button onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? '저장' : '수정'}
        </button>
      </div>
      <hr />
      {/*프로필 사진*/}
      <div>
        <img src={user.profileImg} alt="프로필" />
        {isEdit && (
          <div>
            <input type="file" accept="image/*" onChange={handleImageChage} />
          </div>
        )}
      </div>

      {/*마이페이지 정보 입력*/}
      <div>
        <InforItem label="이름" name="name" value={user.name} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="영문 이름" name="engName" value={user.engName} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="성별" name="gender" value={user.gender} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="생년월일" name="birth" value={user.birth} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="연령" name="age" value={user.age} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="국적" name="nationality" value={user.birth} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="휴대폰" name="phone" value={user.birth} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="이메일" name="email" value={user.email} isEdit={isEdit} onChage={handleChange} />
        <InforItem label="주소" name="address" value={user.address} isEdit={isEdit} onChage={handleChange} />
      </div>
    </div>
  );
}

function InforItem({ label, name, value, isEdit, onChange }) {
  return (
    <div>
      <label>{label}</label>
      {isEdit ? (
        <input name={name} value={value} onChange={onChange} />) :
        (
          <span>{value}</span>
        )}
    </div>
  );

}

export default MyPage;