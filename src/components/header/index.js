import { useState } from 'react';
import { BiPhotoAlbum } from 'react-icons/bi';
import { FaAngleDown, FaFacebookMessenger, FaHome } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { IMAGE } from '../../constants/image/IMAGE.js';

import Search from './search.js';

const Header = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  const handleClickTab = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-between p-2 px-4 bg-gray-100 shadow-md">
      <div className="flex items-center space-x-6">
        <img src={IMAGE.LOGO} alt="Logo" className="w-12 h-12" />
        <Search />
      </div>
      <div className="flex items-center space-x-56">
        <div onClick={() => handleClickTab('HOME')} className={`p-2 cursor-pointer ${activeTab === 'HOME' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}>
          <FaHome size={24} className={`${activeTab === 'HOME' ? 'text-blue-500' : 'text-gray-500'}`} />
        </div>
        <div onClick={() => handleClickTab('ALBUM')} className={`p-2 cursor-pointer ${activeTab === 'ALBUM' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}>
          <BiPhotoAlbum size={24} className={`${activeTab === 'ALBUM' ? 'text-blue-500' : 'text-gray-500'}`} />
        </div>
        <div onClick={() => handleClickTab('ACCOUNT')} className={`p-2 cursor-pointer ${activeTab === 'ACCOUNT' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}>
          <MdOutlineSupervisorAccount size={24} className={`${activeTab === 'ACCOUNT' ? 'text-blue-500' : 'text-gray-500'}`} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <FaFacebookMessenger className="text-black text-4xl cursor-pointer bg-gray-300 rounded-full p-2" />
        <IoNotificationsSharp className="text-black text-4xl cursor-pointer bg-gray-300 rounded-full p-2" />
        {/* Account */}
        <div className="relative cursor-pointer">
          <img src={IMAGE.LOGO} alt="Avatar" className="w-10 h-10" />
          {/* <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div> */}
          <FaAngleDown className="absolute bottom-0 right-0 w-4 h-4 bg-gray-200 rounded-full border-2 border-white" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
