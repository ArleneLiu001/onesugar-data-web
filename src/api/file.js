import { fileUrl } from '../config'
import { upload } from './axios'

export default {
  // 上传
  upload: upload(`${fileUrl}/file/uploadfile`, true),
}
