self.addEventListener('fetch', function () {
    return;
});

self.addEventListener('push', function (event) {
    const data = event.data?.json() || { title: 'Hello', body: 'You got a push!' };
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'icon.png'
    });
});
