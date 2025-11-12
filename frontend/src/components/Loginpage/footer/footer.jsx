// import React from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

import './footer.css';
const footer = () => {
    return (
            <footer>
               <div className="footer-container">
               <div className="name"><i><PiMicrosoftExcelLogoFill /> Excel-Analytics</i></div> 
               <div className="social-media">
                  <IoLogoLinkedin />
                  <SiGmail />
                  <FaGithub />
               </div>
               <div className="since">
                    Since 2025
               </div>
               </div>
               <div className="footer-container alignment">
               <div className="contact-info">
                  <span>support@excelanalytics.com</span> <br/>
                  <span>+1(555)123-4567</span>
               </div>
               <div className="copyright">
                  <p>© ExcelAnalytics. All rights reserved.</p>
               </div>
               <div className="links">
                   <span><a href="/privacy">Privacy Policy</a></span> <br/>
                   <span><a href="/terms">Terms of Service</a></span>
               </div>
               </div>
            </footer>
    );
};

export default footer ;