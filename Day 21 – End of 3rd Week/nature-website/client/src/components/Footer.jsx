import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-primary-400" />
              <span className="font-bold text-xl">NatureExplorer</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover the beauty of nature with our comprehensive database of plants and trees from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/plants" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Plants
                </Link>
              </li>
              <li>
                <Link to="/trees" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Trees
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@natureexplorer.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Nature St, Green City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for nature lovers
          </p>
          <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} NatureExplorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;