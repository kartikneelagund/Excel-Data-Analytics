import "./Help.css"
import { iconsImgs } from "../utils/images"
import { useLocation, useNavigate } from 'react-router-dom';

const Financial = () => {


  return (
    <div className="subgrid-two-item grid-common grid-c8">
        <div className="grid-c-title text-silver-v1">
            <h2 className="lg-value">Help</h2>
          
        </div>
        <div className="grid-c8-content">
            <div className="help-container">
  <div className="help-title">
    <h1>Help & Support</h1>
    <p className="sub-title">Find answers to common questions below.</p>
  </div>

  <div className="help-content-split">
    {/* Left: FAQ Section */}
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <h3>How do I reset my password?</h3>
        <p>You can reset your password from the login page by clicking on "Forgot Password".</p>
      </div>

      <div className="faq-item">
        <h3>How do I contact support?</h3>
        <p>You can contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
      </div>

      <div className="faq-item">
        <h3>Where can I view my account settings?</h3>
        <p>Go to your profile in the top-right after login.</p>
      </div>
    </div>

    {/* Right: Contact Form Section */}
    <div className="contact-section">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</div>



       </div>
    </div>
  )
}

export default Financial
