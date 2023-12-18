<template>
    <div id="app"> <!-- Vue 인스턴스의 마운트 지점 -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link href="http://postcode.map.daum.net/code/jsonp.js" rel="javascript">
        <div class="container">
            <div class="profile-section">
                <div class="profile-icon">
                    <i class="fas fa-user-circle"></i>
                </div>
                <label for="profileImage" class="change-photo-btn">사진 변경</label>
                <input type="file" id="profileImage" name="profileImage" accept="image/*" style="display: none;">
                <img id="photo-preview" :src="photoPreview" alt="프로필 사진 미리보기" style="display: none;">
            </div>

            <div class="form-section">
                <h2>나의 정보 수정</h2>
                <form>
                    <label for="newNickName">내 닉네임 변경:</label>
                    <input type="text" id="newNickName" name="newNickName" v-model="newNickName" required>

                    <label for="newPassword">바꿀 비밀번호:</label>
                    <input type="password" id="newPassword" name="newPassword" v-model="newPassword" required>

                    <label for="confirmPassword">비밀번호 확인:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" required>

                    <label for="phoneNumber">휴대전화번호:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" placeholder="010-0000-0000" v-model="phoneNumber" required>

                    <label for="address">주소:</label>
                    <div>
                        <input type="text" id="address" name="address" v-model="address" required>
                        <button type="button" @click="searchAddress">우편번호 찾기</button>
                    </div>

                    <label for="detailAddress">상세 주소:</label>
                    <input type="text" id="detailAddress" name="detailAddress" v-model="detailAddress">

                    <label for="currentPassword">현재 비밀번호 확인:</label>
                    <input type="password" id="currentPassword" name="currentPassword" v-model="currentPassword" required>

                    <button type="button" @click="saveChanges">수정</button>
                    <button type="button" @click="cancelChanges">취소</button>
                </form>
            </div>
        </div>
    </div>
</template>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            padding: 20px;
            width: 500px; /* 조절 가능 */
        }

        .profile-section {
            width: 29%; /* 조절 가능 */
        }

        .profile-icon {
            font-size: 180px;
            margin-bottom: 16px;
        }

        .form-section {
            width: 48%; /* 조절 가능 */
        }

        .profile-image {
            width: 100%;
            margin-bottom: 16px;
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        input, textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 16px;
            box-sizing: border-box;
        }

        button {
            background-color: #de3c90;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .change-photo-btn {
            background-color: #e43c8d;
            color: #fff;
            padding: 8px;
            border: none;
            border-radius: 9px;
            cursor: pointer;
            margin-bottom: 20px;
        }

        #photo-preview {
            max-width: 100%;
            height: auto;
            margin-bottom: 16px;
        }
    </style>
    <!-- 다음 우편번호 서비스 스크립트 -->
    <script>
        export default{
            data() {
              return{
                newNickName: '',
                newPassword: '',
                confirmPassword: '',
                phoneNumber: '',
                address: '',
                detailAddress: '',
                currentPassword: '',
                photoPreview: '#'
              }
            },
            methods: {
                saveChanges: function () {
                    console.log('바꿀 비밀번호:', this.newPassword);
                    console.log('비밀번호 확인:', this.confirmPassword);
                    console.log('휴대전화번호:', this.phoneNumber);
                    console.log('주소:', this.address);
                    console.log('상세 주소:', this.detailAddress);
                    console.log('현재 비밀번호 확인:', this.currentPassword);
                },
                cancelChanges: function () {
                    console.log('변경이 취소되었습니다.');
                },
                searchAddress: function () {
                    // 주소 검색 로직을 추가할 수 있습니다.
                    console.log('우편번호 찾기');
                }
            }
        }
    </script>