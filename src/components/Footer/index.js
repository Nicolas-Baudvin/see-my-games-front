import React from 'react';
import './footer.scss';
import { sitePlanNav, aproposNav, legalsNav } from 'src/data/navs';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'semantic-ui-react';

export default () => {
  return (
    <footer className="footer">
      <div className="footer-block">
        <nav className="footer-block__nav">
          <ul className="footer-block__nav-list">
            {
              sitePlanNav.map((item) => {
                if (item.title === "Plan du site") {
                  return <li key={item.title} className="footer-block__nav-list--item first"><Link to={item.path}>{item.title}</Link></li>;
                }
                return <li key={item.title} className="footer-block__nav-list--item"><Link to={item.path}>{item.title}</Link></li>;
              })
            }
          </ul>
        </nav>
        <div className="newsletter">
          <h3 className="newsletter-title">Newsletter</h3>
          <Input
            action={{
              color: 'blue',
              labelPosition: 'right',
              icon: 'send',
              content: 'Envoyer',
            }}
            placeholder="example@example.fr"
          />
        </div>
        <div className="copyright">
          Copyright &copy;
        </div>
      </div>
      <div className="footer-block">
        <nav className="footer-block__nav">
          <ul className="footer-block__nav-list">

            {
              aproposNav.map((item) => {
                if (item.title === "Assitance") {
                  return <li key={item.title} className="footer-block__nav-list--item first"><Link to={item.path}>{item.title}</Link></li>;
                }
                return <li key={item.title} className="footer-block__nav-list--item"><Link to={item.path}>{item.title}</Link></li>;
              })
            }

          </ul>
        </nav>
        <div className="social">
          <h3 className="social-title">Suivez nous</h3>
          <div className="social-icons">
            <Icon className="social-icon-facebook" name="facebook" size="big" />
            <Icon className="social-icon-twitter" name="twitter" size="big" />
            <Icon className="social-icon-linkedin" name="linkedin" size="big" />
          </div>

        </div>
      </div>
      <div className="footer-block">
        <nav className="footer-block__nav">
          <ul className="footer-block__nav-list">
            {
              legalsNav.map((item) => {
                if (item.title === "Mentions légales") {
                  return <li key={item.title} className="footer-block__nav-list--item first"><Link to={item.path}>{item.title}</Link></li>;
                }
                return <li key={item.title} className="footer-block__nav-list--item"><Link to={item.path}>{item.title}</Link></li>;
              })
            }
          </ul>
          <nav className="footer-block__nav account-nav">
            <ul className="footer-block__nav-list">
              <li className="footer-block__nav-list--item bold"><Link to="mon-compte">Mon compte</Link></li>
            </ul>
          </nav>
        </nav>
      </div>
    </footer>
  );
};
