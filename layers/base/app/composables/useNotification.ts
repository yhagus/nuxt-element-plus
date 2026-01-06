import { ElNotification } from 'element-plus';

export interface NotificationOptions {
  type?: 'success' | 'warning' | 'info' | 'error' | 'primary';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: number;
  showClose?: boolean;
  dangerouslyUseHTMLString?: boolean;
}

export function useNotification() {
  const defaultOptions: NotificationOptions = {
    type: 'info',
    duration: 4500,
    position: 'top-right',
    offset: 20,
    showClose: true,
    dangerouslyUseHTMLString: false,
  };

  const show = (title: string, message: string, options: NotificationOptions = {}) => {
    const finalOptions = { ...defaultOptions, ...options };
    return ElNotification({
      title,
      message,
      ...finalOptions,
    });
  };

  const success = (title: string, message: string, options?: Omit<NotificationOptions, 'type'>) => {
    return show(title, message, { ...options, type: 'success' });
  };

  const warning = (title: string, message: string, options?: Omit<NotificationOptions, 'type'>) => {
    return show(title, message, { ...options, type: 'warning' });
  };

  const info = (title: string, message: string, options?: Omit<NotificationOptions, 'type'>) => {
    return show(title, message, { ...options, type: 'info' });
  };

  const error = (title: string, message: string, options?: Omit<NotificationOptions, 'type'>) => {
    return show(title, message, { ...options, type: 'error' });
  };

  const primary = (title: string, message: string, options?: Omit<NotificationOptions, 'type'>) => {
    return show(title, message, { ...options, type: 'primary' });
  };

  return {
    show,
    success,
    warning,
    info,
    error,
    primary,
  };
}

export default useNotification;
