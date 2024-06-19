import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue';

export default function (title, onOk, onCancel, options = {}) {
  Modal.confirm({
    title: title,
    icon: createVNode(ExclamationCircleOutlined),
    mask: options.mask || false,
    maskClosable: options.maskClosable || true,
    okText: '确认',
    cancelText: '取消',
    onOk,
    onCancel: onCancel || (() => { })
  })
}