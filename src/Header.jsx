import { useMediaQuery } from '@edx/paragon';
import React, { useState } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import SearchModal from './Header/SearchModal';
import store from './Header/redux/store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set staleTime to 5 minutes
      staleTime: 5 * 60 * 1000,
      // Set cacheTime to 60 minutes
      cacheTime: 60 * 60 * 1000,
    },
  },
});
const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [openModal, setOpenModal] = useState(false);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <header>
          <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
          {isMobile ? (
            <MobileHeader setOpenModal={setOpenModal} />
          ) : (
            <DesktopHeader />
          )}
        </header>
      </QueryClientProvider>
    </Provider>
  );
};

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
