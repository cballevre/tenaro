import { useLogout, useTranslate } from '@refinedev/core';
import type { FC } from 'react';

interface LogoutButtonProps {
  style?: React.CSSProperties;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ style }) => {
  const { mutate: logout } = useLogout();

  const translate = useTranslate();

  return (
    <button type="button" style={style} onClick={() => logout()}>
      {translate('auth.logout')}
    </button>
  );
};
