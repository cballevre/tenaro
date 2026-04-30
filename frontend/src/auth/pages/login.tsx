import { GoogleOutlined } from '@ant-design/icons';
import { AuthPage } from '@refinedev/antd';
import { useTranslate } from '@refinedev/core';

const Login = () => {
  const translate = useTranslate();

  return (
    <AuthPage
      type="login"
      title={false}
      providers={[
        {
          name: 'google',
          label: translate('pages.login.providers.google'),
          icon: (
            <GoogleOutlined
              style={{
                fontSize: 18,
                lineHeight: 0,
              }}
            />
          ),
        },
      ]}
    />
  );
};

export { Login };
