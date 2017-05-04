import * as React from 'react';

export const LoginCallback: any = (props) => {
    window.opener.loginSuccess();
    window.close();
};