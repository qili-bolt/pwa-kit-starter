/**
 * Bolt button
 */
import React, {useEffect} from 'react'
import {useCommerceAPI} from '../../commerce-api/contexts'
import useBasket from '../../commerce-api/hooks/useBasket'
import useNavigation from '../../hooks/use-navigation'

import useExternalScripts from '../hooks/useExternalScripts'

const BoltButton = () => {
    const api = useCommerceAPI()
    const basket = useBasket()
    const navigate = useNavigation()

    useExternalScripts(
        'bolt-track',
        'https://connect-staging.bolt.com/track.js',
        'Q-5UMctK0oYN.WBkb35idJLik.8525421b537cdc6bb6f58ef68750884f067ebcc3a0f2abf820a2f00c9a6ae601'
    )
    useExternalScripts(
        'bolt-connect',
        'https://connect-staging.bolt.com/connect.js',
        'Q-5UMctK0oYN.WBkb35idJLik.8525421b537cdc6bb6f58ef68750884f067ebcc3a0f2abf820a2f00c9a6ae601'
    )

    useEffect(async () => {
        configureBolt()
    }, [window.BoltCheckout])

    const configureBolt = () => {
        var sfccData
        var callbacks = {
            close: function () {
                // This function is called when the Bolt checkout modal is closed.
                if (sfccData) {
                    navigate('/checkout/confirmation')
                }
            },
            onCheckoutStart: function () {
                // This function is called after the checkout form is presented to the user.
            },

            // eslint-disable-next-line no-unused-vars
            onEmailEnter: function (email) {
                // This function is called after the user enters their email address.
            },

            onShippingDetailsComplete: function () {
                // This function is called when the user proceeds to the shipping options page.
                // This is applicable only to multi-step checkout.
            },

            onShippingOptionsComplete: function () {
                // This function is called when the user proceeds to the payment details page.
                // This is applicable only to multi-step checkout.
            },

            onPaymentSubmit: function () {
                // This function is called after the user clicks the pay button.
            },
            success: function (transaction, callback) {
                // This function is called when the Bolt checkout transaction is successful.
                sfccData = transaction
                callback()
            }
        }

        var cart = {
            id: basket.basketId
        }
        var hints = {
            fetch_cart_metadata: {
                SFCCSessionID: api.auth.authToken
            }
        }
        window.BoltCheckout.configure(cart, hints, callbacks)
    }
    return (
        <div>
            <div data-tid="instant-bolt-checkout-button">
                <object data="https://connect-staging.bolt.com/v1/checkout_button?publishable_key=Q-5UMctK0oYN.WBkb35idJLik.8525421b537cdc6bb6f58ef68750884f067ebcc3a0f2abf820a2f00c9a6ae601"></object>
            </div>
        </div>
    )
}

export default BoltButton
