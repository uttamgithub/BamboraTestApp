paymentApp.directive('bamboraPayment', [function () {
    return {
        templateUrl: '/js/app/directives/bambora-payment/bambora-payment.html',
        link: function (scope, element, attrs) {

            scope.state = {
                cardNumberComplete: false,
                cvvComplete: false,
                expiryComplete: false,

                cardNumberError: null,
                cvvError: null,
                expiryError: null,


                customCheckout: null,
                cardNumber: null,
                cvv: null,
                expiry: null,

                tokens: []
            };

            scope.state.customCheckout = customcheckout();
            
            var options = {
                classes: {
                    error: 'bambora-invalid',
                    complete: 'bambora-valid'
                }
            };

            var customCheckout = scope.state.customCheckout;

            // Create and mount the inputs
            options.placeholder = 'Card number';
            customCheckout.create('card-number', options).mount('#card-number');

            options.placeholder = 'CVV';
            customCheckout.create('cvv', options).mount('#card-cvv');

            options.placeholder = 'MM / YY';
            customCheckout.create('expiry', options).mount('#card-expiry');

            customCheckout.on('brand', function (event) {
                
                var cardLogo = '';
                if (event.brand && event.brand !== 'unknown') {
                    var filePath = 'https://cdn.na.bambora.com/downloads/images/cards/' + event.brand + '.svg';
                    cardLogo = 'url(' + filePath + ')';
                }
                document.getElementById('card-number').style.backgroundImage = cardLogo;
                //document.getElementById('card-number').style.backgroundRepeat= 'no-repeat';
                //document.getElementById('card-number').style.backgroundPositionX = 'right';
            });

            customCheckout.on('empty', function (event) {

                scope.$apply(function () {
                    if (event.empty) {
                        if (event.field === 'card-number') {
                            scope.state.cardNumberComplete = false;
                        } else if (event.field === 'cvv') {
                            scope.state.cvvComplete = false;
                        } else if (event.field === 'expiry') {
                            scope.state.expiryComplete = false;
                        }
                    }

                });

            });

            customCheckout.on('complete', function (event) {

                scope.$apply(function () {
                    if (event.field === 'card-number') {
                        scope.state.cardNumberComplete = true;
                        scope.state.cardNumberError = null;
                    } else if (event.field === 'cvv') {
                        scope.state.cvvComplete = true;
                        scope.state.cvvError = null;
                    } else if (event.field === 'expiry') {
                        scope.state.expiryComplete = true;
                        scope.state.expiryError = null;
                    }
                });

                
            });

            customCheckout.on('error', function (event) {

                scope.$apply(function () {
                    if (event.field === 'card-number') {
                        scope.state.cardNumberComplete = true;
                        scope.state.cardNumberError = event.message;
                    } else if (event.field === 'cvv') {
                        scope.state.cvvComplete = false;
                        scope.state.cvvError = event.message;
                    } else if (event.field === 'expiry') {
                        scope.state.expiryComplete = false;
                        scope.state.expiryError = event.message;
                    }
                });
            });

            scope.btnTokenize = function () {
                customCheckout.createToken(function (result) {

                    scope.$apply(function () {
                        var index = scope.state.tokens.length + 1;

                        scope.state.tokens.push({
                            index: index,
                            token: result
                        });
                    });

                    
                });
            };


        },
    };
}]);