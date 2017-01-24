/**
 * Copyright 2012 Tsvetan Tsvetkov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Tsvetan Tsvetkov (tsekach@gmail.com)
 */

// Modified by Simonmysun

// "use strict";
const PERMISSION_DEFAULT = 'default';
const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';
const PERMISSION = [
  PERMISSION_GRANTED,
  PERMISSION_DEFAULT,
  PERMISSION_DENIED,
];
const defaultSetting = {
  pageVisibility: false,
  autoClose: 0,
};
const emptyString = '';
const isSupported = (() => {
  let isSupported = false;
  try {
    isSupported = !!(
      /* Safari, Chrome */
      window.Notification ||
      /* Chrome & ff-html5notifications plugin */
      window.webkitNotifications ||
      /* Firefox Mobile */
      navigator.mozNotification ||
      /* IE9+ */
      (window.external && window.external.msIsSiteMode() !== undefined)
    );
  } catch (e) {
    console.log('Failed to detect whether notification is supported. ');
  }
  return isSupported;
})();
const ieVerification = Math.floor((Math.random() * 10) + 1);
const isFunction = value => (value && (value).constructor === Function);
const isString = value => (value && (value).constructor === String);
const isObject = value => (value && (value).constructor === Object);
const noop = () => {};
const settings = defaultSetting;
const getNotification = (title, options) => {
  let notification;
  if (window.Notification) {
    notification = new window.Notification(title, {
      icon: isString(options.icon) ? options.icon : options.icon.x32,
      body: options.body || emptyString,
      tag: options.tag || emptyString,
    });
  } else if (window.webkitNotifications) {
    notification = window.webkitNotifications.createNotification(options.icon, title, options.body);
    notification.show();
  } else if (navigator.mozNotification) {
    notification = navigator.mozNotification.createNotification(title, options.body, options.icon);
    notification.show();
  } else if (window.external && window.external.msIsSiteMode()) {
    window.external.msSiteModeClearIconOverlay();
    window.external.msSiteModeSetIconOverlay(
      (isString(options.icon) ? options.icon : options.icon.x16), title
    );
    window.external.msSiteModeActivate();
    notification = {
      ieVerification: ieVerification + 1,
    };
  }
  return notification;
};

const getWrapper = notification => ({
  close: () => {
    if (notification) {
      if (notification.close) {
        notification.close();
      } else if (window.external && window.external.msIsSiteMode()) {
        if (notification.ieVerification === ieVerification) {
          window.external.msSiteModeClearIconOverlay();
        }
      }
    }
  },
});

const requestPermission = (callback) => {
  if (!isSupported) {
    return;
  }
  const callbackFunction = isFunction(callback) ? callback : noop;
  if (
    window.webkitNotifications &&
    window.webkitNotifications.checkPermission
  ) {
    window.webkitNotifications.requestPermission(callbackFunction);
  } else if (window.Notification &&
             window.Notification.requestPermission) {
    window.Notification.requestPermission(callbackFunction);
  }
};

/* eslint consistent-return: "off" */
const permissionLevel = () => {
  if (!isSupported) {
    return;
  } else if (
    window.Notification &&
    window.Notification.permissionLevel
  ) {
    return window.Notification.permissionLevel();
  } else if (
    window.webkitNotifications &&
    window.webkitNotifications.checkPermission
  ) {
    return PERMISSION[window.webkitNotifications.checkPermission()];
  } else if (navigator.mozNotification) {
    return PERMISSION_GRANTED;
  } else if (
    window.Notification &&
    window.Notification.permission
  ) {
    return window.Notification.permission;
  } else if (
    window.external &&
    window.external.msIsSiteMode() !== undefined
  ) {
    return window.external.msIsSiteMode() ? PERMISSION_GRANTED : PERMISSION_DEFAULT;
  }
  return;
};

const isDocumentHidden = () => (
  settings.pageVisibility ? (
    document.hidden ||
    document.msHidden ||
    document.mozHidden ||
    document.webkitHidden
  ) : true);

const createNotification = (title, options) => {
  let notification;
  if (
    isSupported &&
    isDocumentHidden() &&
    isString(title) && (
      options && (
        isString(options.icon) ||
        isObject(options.icon)
      )
    ) && (
      permissionLevel() === PERMISSION_GRANTED
    )
  ) {
    notification = getNotification(title, options);
  }
  const notificationWrapper = getWrapper(notification);
  // Auto-close notification
  if (
    settings.autoClose &&
    notification &&
    !notification.ieVerification &&
    notification.addEventListener
  ) {
    notification.addEventListener('show', () => {
      const notification = notificationWrapper;
      setTimeout(() => {
        notification.close();
      }, settings.autoClose);
    });
  }
  return notificationWrapper;
};

const permissionRequest = () => {
  console.log(permissionLevel());
  try {
    console.log(`current: ${permissionLevel()}`);
    if (permissionLevel() === PERMISSION_DEFAULT) {
      requestPermission(() => {
        console.log(permissionLevel());
      });
    }
  } catch (e) {
    console.log('Failed to request permission. ');
  }
};

const showNotification = (notification) => {
  try {
    createNotification(notification.title, {
      body: notification.body,
      icon: notification.icon,
    });
  } catch (e) {
    console.log('Failed to show notification. ');
  }
};

export default {
  permissionLevel,
  showNotification,
  permissionRequest,
};
