// Placeholder untuk fitur notification.
// expo-notifications tetap terpasang di package/app.json agar mudah diaktifkan saat memakai native/development build.

export async function registerForPushNotifications() {
  return null;
}

export async function scheduleLocalNotification() {
  return false;
}

export async function cancelAllNotifications() {
  return;
}

export function getNotificationNote() {
  return 'Notifications are reserved for native/development build.';
}
