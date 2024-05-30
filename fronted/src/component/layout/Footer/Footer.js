import React from 'react';
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id='footer' className='  -z-10  flex mt-0 '>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playStore" />
            <img src={appStore} alt="appStore" />

        </div>
        <div className="midFooter">
            <h1>ECOMMERCE.</h1>
            <p>High Quility is our first priority</p>
            <p>Copyright 2021 &copy; MeSurehkumar </p>

        </div>
        <div className="rightFooter">
            <h4>Follow me</h4>
            <a href="http://instagram.com/mr.nyol_oo7">Instagram</a>
            <a href="https://www.youtube.com/channel/UC7-iZwmCHhE07_Xw14zH-MA">Youtube</a>
            <a href="https://www.youtube.com/channel/UC7-iZwmCHhE07_Xw14zH-MA">facebook</a>


        </div>

    </footer>
    
  )
}

export default Footer