const webpush = require('web-push');

webpush.setVapidDetails(
    process.env.CONTACT_EMAIL_ADDRESS,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const subscription = JSON.parse(process.env.PUSH_SUBSCRIPTION);

const payload = JSON.stringify({
    title: '🎉 GitHub Action',
    body: 'Main branch just got a new push!'
});

webpush.sendNotification(subscription, payload)
    .then(() => console.log('✅ Notification sent!'))
    .catch(err => console.error('❌ Notification failed:', err));
