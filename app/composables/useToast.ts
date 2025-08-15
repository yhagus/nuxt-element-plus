import type { MessageParams } from 'element-plus';

export function useToast() {
  const success = (message: string, options?: MessageParams) => {
    ElMessage({
      message,
      type: 'success',
      ...(options && typeof options === 'function' ? options : {}),
    });
  };
  const error = (message: string, options?: MessageParams) => {
    ElMessage({
      message,
      type: 'error',
      ...(options && typeof options === 'function' ? options : {}),
    });
  };
  const warning = (message: string, options?: MessageParams) => {
    ElMessage({
      message,
      type: 'warning',
      ...(options && typeof options === 'function' ? options : {}),
    });
  };
  const info = (message: string, options?: MessageParams) => {
    ElMessage({
      message,
      type: 'info',
      ...(options && typeof options === 'function' ? options : {}),
    });
  };
  const primary = (message: string, options?: MessageParams) => {
    ElMessage({
      message,
      type: 'primary',
      ...(options && typeof options === 'function' ? options : {}),
    });
  };

  return {
    primary,
    success,
    info,
    warning,
    error,
  };
}
