import React from 'react';
import "./Footer.css";

export default function Footer() {
  return (
    // <footer className="bg-light py-3 mt-5">
    //   <div className="container text-center">
    //     <small>© {new Date().getFullYear()} PropertyList — Built with React & Express</small>
    //   </div>
    // </footer>
    <footer>
      <div class="f-info">
        <div class="f-info-socials">
          <i class="fa-brands fa-square-facebook"></i>
          <i class="fa-brands fa-square-linkedin"></i>
          <i class="fa-brands fa-square-github"></i>
        </div>
        <div class="f-info-brand">&copy; Wanderlust Private Limited</div>
        <div class="f-info-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
