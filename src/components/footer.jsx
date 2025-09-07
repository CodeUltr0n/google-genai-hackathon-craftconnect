import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagramSquare,
  faPinterest,
  faFacebook,
  faTelegram,
  faXTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

const footerLinks = {
  'Shop by Craft': [
    { name: 'Blue Pottery', path: '/shop/pottery' },
    { name: 'Kantha Work', path: '/shop/kantha' },
    { name: 'Warli Art', path: '/shop/warli' },
    { name: 'Pashmina', path: '/shop/pashmina' },
  ],
  'About': [
    { name: 'Our Story', path: '/about' },
    { name: 'Our Mission', path: '/mission' },
    { name: 'Contact Us', path: '/contact' },
  ],
  'Support': [
    { name: 'FAQs', path: '/faq' },
    { name: 'Shipping & Returns', path: '/shipping' },
    { name: 'Seller Support', path: '/seller-support' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand and Mission */}
          <div className="lg:col-span-1 pr-8">
            <h3 className="text-xl font-bold tracking-wider mb-2">Bharatiya Bazaar</h3>
            <p className="text-xs text-slate-400">
              A platform dedicated to bringing India's authentic crafts to the world.
            </p>
          </div>

          {/* Columns 2, 3, 4: Navigation Links */}
          {Object.keys(footerLinks).map(title => (
            <div key={title}>
              <h4 className="font-semibold mb-3">{title}</h4>
              <ul className="space-y-1">
                {footerLinks[title].map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-sm">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar: Copyright and Social Media */}
      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Bharatiya Bazaar. All rights reserved.
          </p>
          {/* This is the corrected social icons container */}
          <div className="flex items-center gap-5">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faInstagramSquare} size="lg" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faPinterest} size="lg" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faTelegram} size="lg" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faXTwitter} size="lg" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


