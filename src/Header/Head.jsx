/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getLocale } from '@edx/frontend-platform/i18n';
import useGetConfig from './useGetConfig';
import safariFavicon from '../assets/favicon.png';

const Head = () => {
  const { favicon } = useGetConfig();
  useEffect(() => {
    const setFont = () => {
      const body = document.querySelector('body');
      if (getLocale() === 'fa' || getLocale() === 'fa-ir') {
        body.className = 'lang_fa';
      } else if (getLocale() === 'ar') {
        body.className = 'lang_ar';
      } else {
        body.removeAttribute('class');
      }
    };
    setFont();
  }, [getLocale()]);
  return (
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      <link rel="apple-touch-icon" href={safariFavicon} />
       <link rel="mask-icon" href={favicon} color="#000000" />
    </Helmet>
  );
};

export default Head;
