import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>عن الكنيسة</h3>
          <p>كنيسة العذراء مريم بالمليحة</p>
          <p>نحن نخدم ونساعد بعضنا البعض</p>
        </div>

        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <ul>
            <li><a href="/">الرئيسية</a></li>
            <li><a href="/activities">الأنشطة</a></li>
            <li><a href="/attendance">الحضور</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>تواصل معنا</h3>
          <ul>
            <li>العنوان: المليحة، القاهرة</li>
            <li>الهاتف: +20 123 456 7890</li>
            <li>البريد الإلكتروني: info@church.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 كنيسة العذراء مريم بالمليحة - جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
};

export default Footer;
