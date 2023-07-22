/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { FullscreenModal, Icon, SearchField } from '@edx/paragon';
import React, { useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { ArrowBack, Close } from '@edx/paragon/icons';
import { ArrowBack } from '@edx/paragon/icons';
import messages from '../generic/messages';
import useSearchSuggestions from './useSearchSuggestions';
// import { useHistory, useLocation } from 'react-router';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { setSearchModal } from '../../../../redux/slice/searchModalSlice';
// import {
//   resetSearchFilters,
//   setSearchString,
// } from '../../../../redux/slice/searchQuerySlice';
// import useSearchSuggestions from '../../../../hooks/useSearchSuggestions';
// import {
//   addPage,
//   clearAllPages,
//   loadPages,
//   removePage,
// } from '../../../../redux/slice/recentPagesSlice';
// import logoPlaceholder from '../../../../assets/place-holders/org-place-holder.svg';

const SearchModal = ({ intl, openModal, setOpenModal }) => {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const isOpenSearchModal = useSelector((state) => state.searchModal.open);
  const [searchSuggestionValue, setSearchSuggestionValue] = useState('');
  const { searchSuggestionsResults } = useSearchSuggestions(
    searchSuggestionValue
  );
  // const recentSearch = useSelector((state) => state.recentPages.pages);
  // const history = useHistory();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const query = searchParams.get('q');
  //   dispatch(setSearchString(query || ''));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  // useEffect(() => {
  //   dispatch(loadPages());
  // }, [dispatch]);

  const handleSubmitSearch = (value) => {
    // dispatch(resetSearchFilters());
    // dispatch(setSearchString(searchSuggestionValue));
    // dispatch(setSearchModal(false));
    // setSearchSuggestionValue('');
    setOpenModal(false);
    window.location.replace(`/homepage/search?q=${value}`);
  };

  return (
    <FullscreenModal
      className="search-modal"
      title="search-modal"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <div className="d-flex align-items-center search-wrapper">
        <Icon
          src={ArrowBack}
          loadPages
          onClick={() => {
            // setSearchSuggestionValue('');
            // dispatch(setSearchModal(false));
            setOpenModal(false);
          }}
          className="mr-1.5"
        />
        <SearchField
          onChange={(value) => {
            setSearchSuggestionValue(value);
          }}
          onSubmit={handleSubmitSearch}
          placeholder={intl.formatMessage(
            messages['header.search.placeholder']
          )}
        />
      </div>
      {searchSuggestionsResults?.length > 0 && (
        <div className="search-result-modal-wrapper px-4 pt-3">
          {searchSuggestionsResults?.map((result) => (
            <a
              key={result?.data?.id}
              href={`/homepage/course/${result?.data?.course_metadata?.course_slug}`}
              onMouseDown={() => {
                setSearchSuggestionValue('');
                // dispatch(addPage(result?.data?.course_metadata));
                // dispatch(setSearchModal(false));
                window.location.replace(
                  `/homepage/course/${result?.data?.course_metadata?.course_slug}`
                );
              }}
            >
              <div key={result?.data?.content?.display_name} className="py-2">
                <span className="suggestion-title pb-2">
                  {result?.data?.content?.display_name}
                </span>
                <p className="second-title-wrapper">
                  <span>
                    {result?.data?.course_metadata?.partner?.organization?.name}
                  </span>
                  . <span>{result.isProgram ? 'Program' : 'Course'}</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
      {/* {recentSearch.length > 0 && (
        <div className="px-4 pt-4 recent-view-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>
              <FormattedMessage
                id="searchModal.recentlyViewed.text"
                defaultMessage="Recently viewed"
              />
            </h4>
            <span className="font-sm" onClick={() => dispatch(clearAllPages())}>
              <FormattedMessage id="clearAll.text" defaultMessage="Clear all" />
            </span>
          </div>
          {recentSearch.map((recentView) => (
            <div
              className="d-flex align-items-center mb-2.5"
              key={recentView?.paid_course?.course_id}
            >
              <div className="logo-img-wrapper ">
                <img
                  src={
                    recentView?.partner?.organization?.logo ?? logoPlaceholder
                  }
                  alt="org-logo"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <p className="recent-title">
                    {recentView?.additional_metadata?.display_name}
                  </p>
                  <p className="recent-institution">
                    {recentView?.partner?.organization?.name}
                  </p>
                </div>
                <Icon
                  src={Close}
                  onClick={() => dispatch(removePage(recentView?.course_slug))}
                />
              </div>
            </div>
          ))}
        </div>
      )} */}
      {/* TODO: Need Backend Data */}
      {/* <TrendingWords />
      <TrendingCourses /> */}
    </FullscreenModal>
  );
};

SearchModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchModal);