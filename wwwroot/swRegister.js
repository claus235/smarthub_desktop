if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/worker.js')
        .then(function (swRegistration) {
            var serviceWorker;

            if (swRegistration.installing) {
                //console.log('Resolve at installing: ', swRegistration);
                serviceWorker = swRegistration.installing;
            } else if (swRegistration.waiting) {
                //console.log('Resolve at waiting: ', swRegistration);
                serviceWorker = swRegistration.waiting;
            } else if (swRegistration.active) {
                //console.log('Resolve at installing: ', swRegistration);
                serviceWorker = swRegistration.active;
            }

            if (serviceWorker) {
                serviceWorker.addEventListener('statechange', function (e) {
                    console.log(e.target.state);
                });
            }

            swRegistration.addEventListener('updatefound', function (e) {
                swRegistration.installing.addEventListener('statechange', function (e) {
                    console.log('New service worker state: ', e.target.state);
                });
                console.log('Update Found', swRegistration);
            });

            swRegistration.update();
        })
        .catch(function (error) {
            console.log('Error occurred', error);
        });

    navigator.serviceWorker.addEventListener('controllerchange', function (e) {
        console.log('Controller Changed');
    });
}