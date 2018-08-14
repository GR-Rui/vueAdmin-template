<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="赛事名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="年度" inline="true">
            <el-select v-model="form.year" placeholder="请选择年份">
              <el-option label="2018年" value="2018"></el-option>
              <el-option label="2017年" value="2107"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="届数" inline="true">
            <el-select v-model="form.year" placeholder="请选择届数">
              <el-option label="第一届" value="1"></el-option>
              <el-option label="第二届" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="起止日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="date" placeholder="结束日期" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="主办方">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="承办方">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/match'
import { imageView } from '@/utils'

export default {
  data() {
    return {
      form: {
        name: "",
        region: ""
      },
      imageUrl: '',
      hoho: {}
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = imageView(res.hash, 80, 80, 1)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
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

