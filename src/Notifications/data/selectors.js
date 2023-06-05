import { createSelector } from '@reduxjs/toolkit';

export const selectNotificationStatus = () => state => state.notifications.notificationStatus;

export const selectNotificationTabsCount = () => state => state.notifications.tabsCount;

export const selectNotificationTabs = () => state => state.notifications.appsId;

export const selectSelectedAppNotificationIds = (appName) => state => state.notifications.apps[appName] ?? [];

export const selectShowNotificationTray = () => state => state.notifications.showNotificationTray;

export const selectNotifications = () => state => state.notifications.notification;

export const selectNotificationsByIds = createSelector(
  state => state.notifications.notifications,
  state => state.notifications.apps[state.notifications.appName] || [],
  (notifications, notificationIds) => notificationIds.map(notificationId => notifications[notificationId]),
);

export const selectSelectedAppName = () => state => state.notifications.appName;

export const selectPaginationData = () => state => state.notifications.pagination;
