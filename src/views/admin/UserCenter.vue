<template>
  <div class="user-center">
    <h1 class="header">个人中心</h1>
    <div class="main">
      <label class="upload" for="upload-input">
        <el-avatar class="upload-avatar" :src="avatarUrl" fit="scale-down" :size="150" title="更换头像" alt="上传头像"></el-avatar>
        <span class="upload-text">上传头像</span>
      </label>
      <input 
        type="file" 
        id="upload-input"
        style="display:none;" 
        @change="handleUploadImg" 
        accept="image/jpg, image/jpeg, image/png"/>
      <TitleInput class="signature" :value.sync="signature" title="个性签名"></TitleInput>
    </div>
    <div class="footer">
      <el-button size="medium" @click="handleCancel">取消</el-button>
      <el-button class="confirm-btn" type="primary" size="medium" @click="handleSubmit">修改</el-button>
    </div>
  </div>
</template>

<script>
import TitleInput from '@/components/TitleInput';
import { countWord } from '@/utils'

export default {
  name: "UserCenter",
  components: {
    TitleInput
  },
  data() {
    return {
      avatarUrl: '',
      signature: '',
      avatarFile: ''
    }
  },
  methods: {
    handleUploadImg(e) {
      const file = e.target.files[0];
      if(!this.beforeAvatarUpload(file)) {
        return;
      }
      this.handleAvatarSuccess(file);
    },
    handleAvatarSuccess(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.avatarFile = file;
        this.avatarUrl = e.target.result;
      }
    },
    handleSubmit() {
      const formData = new FormData();
      // 当avatar没更改 this.avatarFile为空
      formData.append('avatar', this.avatarFile);
      const id = this.$store.state.userInfo.id;
      formData.append('id', id);
      formData.append('signature', this.signature);
      if(!this.checkData(this.signature)) {
        this.$message.warning('字数过多，个性签名不能超过25个字，请删减！')
        return;
      }
      return this.$axios.postUserInfo(formData).then(res => {
        const avatar = res.data.path;
        let userInfo = {};
        if(avatar) {
          userInfo.avatar = avatar;
        }
        if(this.signature) {
          userInfo.signature = this.signature;
        }
        this.$store.dispatch('updateUserInfo', userInfo);
        this.$router.push('/admin');
        this.$message.success('修改成功!');
      }).catch(err => {
        this.$message.error('修改失败');
      })
    },
    beforeAvatarUpload(file) {
      const isAccept = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isAccept) {
        this.$message({
          type: 'error',
          message: '上传头像图片只能是JPG、JPEG或者PNG格式!'
        });
      }
      if(!isLt2M) {
        this.$message({
          type: 'error',
          message: '上传头像图片大小不能超过 2MB!'
        });
      }
      return isAccept && isLt2M;
    },
    getUserInfoData() {
      const { avatar, signature } = this.$store.state.userInfo;
      this.avatarUrl = avatar || '';
      this.signature = signature;
    },
    checkData(str) {
      if(countWord(str) > 50) {
        return false;
      }
      return true;
    },
    handleCancel() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getUserInfoData();
  }
}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.user-center {
  .header {
    padding-bottom: 20px;
    border-bottom: 1px solid $borderColor;
  }

  .main {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    padding: 10px 5% 0;
    .signature {
      width: 100%;
      margin: 30px 0;
    }

    .upload {
      display: flex;
      align-items: center;
      flex-direction: column;
      &-avatar,
      &-text {
        cursor: pointer;
      }
      &-text {
        margin-top: 10px;
        font-size: 12px;
        &:hover {
          color: $hoverFontColor;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    .confirm-btn {
      margin-left: 30px;
    }
  }
}
</style>
