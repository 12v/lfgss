const webpush = require('web-push');
const crypto = require('crypto');

const hasher = input => {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}
console.log('Hash of CONTACT_EMAIL_ADDRESS:', hasher(process.env.CONTACT_EMAIL_ADDRESS));
console.log('Hash of PUSH_SUBSCRIPTION:', hasher(process.env.PUSH_SUBSCRIPTION));
console.log('Hash of VAPID_PRIVATE_KEY:', hasher(process.env.VAPID_PRIVATE_KEY));
console.log('Hash of VAPID_PUBLIC_KEY:', hasher(process.env.VAPID_PUBLIC_KEY));

webpush.setVapidDetails(
    'mailto:' + process.env.CONTACT_EMAIL_ADDRESS,
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
