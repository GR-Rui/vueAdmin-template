<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                class="avatar-uploader"
                :action="serverUrl"
                name="file"
                multiple
                :data="hoho"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
       <el-row v-loading="quillUpdateImg">
        <quill-editor
                v-model="detailContent"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                @ready="onEditorReady($event)"
        >
        </quill-editor>
       </el-row>
    </div>
</template>


<script>
import { getQiniuToken } from '@/api/match'
import { imageView } from '@/utils'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import * as Quill from 'quill';
import { quillEditor } from 'vue-quill-editor'
// import { ImageResize } from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize);

// const quill = new Quill(myQuillEditor, {
//     modules: {
//         imageResize: {
//             modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
//         },
//     }
// });

export default {
  components: {
    quillEditor
  },
  data() {
      return {
          quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
          serverUrl: 'http://upload.qiniu.com/',  // 这里写你要上传的图片服务器地址
          hoho:{},
          detailContent: '', // 富文本内容
          editorOption: {
            placeholder: '',
            theme: 'snow',  // or 'bubble'
            modules: {
              toolbar: {
                  container: toolbarOptions,  // 工具栏
                  handlers: {
                      'image': function (value) {
                          if (value) {
                              document.querySelector('.avatar-uploader input').click()
                          } else {
                              this.quill.format('image', false);
                          }
                      }
                  }
              }
            }
          }  // 富文本编辑器配置
      }
  },
  methods: {
      // 上传图片前
      beforeUpload(res, file) {
        // 显示loading动画
        this.quillUpdateImg = true
        return getQiniuToken({}).then(
          response => {
            const data = response.data
            this.hoho.token = data.token
            // this.qiniuSession.key = keyName
          }
        )
      },
      // 上传图片成功
      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.hash) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', imageView(res.hash, 100, 100, 1))
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },
      // 上传图片失败
      uploadError(res, file) {
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },

      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.detailContent = html
      }
  }
}

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]

</script>

<style>
</style>

