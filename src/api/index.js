/**
 * api接口统一管理
 */
import { post, $delete, put } from './http';

// 验证码
export const codeImage = () => post('garlic-web-api/auth/code/image');
// 修改设备
export const apiUpdeteDevice = (data) => put('api/device', data);
// 删除设备
export const apiDelDevice = (data) => $delete('api/device', data);
