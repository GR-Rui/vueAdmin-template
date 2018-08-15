<template>
  <div class="app-container">
    <!-- 单文件上传 -->
    <el-upload
        class="avatar-uploader"
        action="http://upload.qiniu.com/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="hoho"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <!-- 多文件上传 -->
      <el-upload
        ref="upload"
        action="http://upload.qiniu.com/"
        list-type="picture-card"
        multiple
        :on-success="handleSuccess"
        :data="hoho"
        :before-upload="beforeUpload"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/match'
import { imageView } from '@/utils'

export default {
  data() {
    return {
      imageUrl: '',
      hoho:{},
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = imageView(res.hash, 80, 80, 1)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return;
      }
      return getQiniuToken({}).then(
        response => {
          const data = response.data
          this.hoho.token = data.token
          this.hoho.key = file.name
        }
      )
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      return getQiniuToken({}).then(
        response => {
          const data = response.data
          this.hoho.token = data.token
          this.hoho.key = file.name
        }
      )
    },
    submitUpload() {
      this.$refs.upload.submit();
    },

    beforeUpload(file) {
      console.log(file);
      const keyName = Number.parseInt(Math.random() * 100000000, 10) + '.png'
      return getQiniuToken({}).then(
        response => {
          const data = response.data
          this.hoho.token = data.token
          this.hoho.key = keyName
        }
      )
    },

    handleSuccess(res, file, fileList) {
      // this.imageUrl = imageView(res.hash, 80, 80, 1)
      console.log(file);
    }



  }
};
</script>

<style>
.line {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

