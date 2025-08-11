import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        const handleConfirm = () => {
          setOrderPlaced(true)
        }

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total} /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
            </div>

            <Popup
              className="checkout-button"
              trigger={
                <button type="button" className="checkout-button float-end">
                  Checkout
                </button>
              }
              modal
              overlayClassName="popup-overlay"
            >
              <div className="card payment-popup">
                <h2>Select Payment Method</h2>
                <form>
                  <div>
                    <input type="radio" id="card" name="payment" disabled />
                    <label htmlFor="card">Card</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="netbanking"
                      name="payment"
                      disabled
                    />
                    <label htmlFor="netbanking">Net Banking</label>
                  </div>
                  <div>
                    <input type="radio" id="upi" name="payment" disabled />
                    <label htmlFor="upi">UPI</label>
                  </div>
                  <div>
                    <input type="radio" id="wallet" name="payment" disabled />
                    <label htmlFor="wallet">Wallet</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="COD"
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>
                  <span className="order-total-label mt-lg-3">
                    Total Items: {cartList.length}
                  </span>
                  <span className="order-total-label">
                    Total Price:{' '}
                    <span className="order-total-value">
                      <b>Rs {total} /-</b>
                    </span>
                  </span>
                </form>
                <button
                  type="button"
                  className={`confirm-btn ${
                    paymentMethod === 'COD' ? 'active' : 'disabled-btn'
                  }`}
                  disabled={paymentMethod !== 'COD'}
                  onClick={handleConfirm}
                >
                  Confirm Order
                </button>
              </div>
            </Popup>

            {/* Success Popup */}
            {orderPlaced && (
              <Popup
                open={orderPlaced}
                modal
                closeOnDocumentClick
                onClose={() => setOrderPlaced(false)}
                overlayClassName="popup-overlay"
              >
                <div className="success-popup">
                  <div className="success-icon">✔</div>
                  <h2>Order Placed!</h2>
                  <p>Your order has been placed successfully.</p>
                </div>
              </Popup>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
