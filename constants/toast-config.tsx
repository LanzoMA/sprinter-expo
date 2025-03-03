import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import baseTheme from './base-theme';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: baseTheme.common.success,
        backgroundColor: baseTheme.dark.surfaceDark,
      }}
      text1Style={{
        color: baseTheme.dark.text,
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: baseTheme.common.error,
        backgroundColor: baseTheme.dark.surfaceDark,
      }}
      text1Style={{
        color: baseTheme.dark.text,
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

export default toastConfig;
