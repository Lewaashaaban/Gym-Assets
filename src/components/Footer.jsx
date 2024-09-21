import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About</h5>
            <p className="grey-text text-lighten-4">
              This is a website for selling gym equipment online.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Let's Connect!!</h5>
            <ul>
              <div className="social-links">
                <a href="https://www.facebook.com/Hadi.Zeidan.794">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/hadiizeidan/">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/hadi-zeidan-a8ab45205/">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright"></div>
    </footer>
  );
};

export default Footer;
