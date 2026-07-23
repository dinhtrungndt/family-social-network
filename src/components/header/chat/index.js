
import { useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosCreate } from "react-icons/io";
import { IoSearchSharp } from 'react-icons/io5';
import { MdZoomOutMap } from "react-icons/md";
import { IMAGE } from '../../../constants/image/IMAGE.js';

const ChatHeader = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  const conversations = [
    { name: 'Nguyễn Văn A', type: 'ALL' },
    { name: 'Trần Thị B', type: 'NOSEEN' },
    { name: 'Nhóm gia đình', type: 'GROUP' },
    { name: 'Lê Văn C', type: 'NOSEEN' },
    { name: 'Team lớp học', type: 'GROUP' },
  ];

  const visibleConversations =
    activeTab === 'ALL'
      ? conversations
      : conversations.filter(conversation => conversation.type === activeTab);

  const handleClickTab = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="absolute right-0 top-10 z-20 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <p className="text-base font-semibold text-gray-800">Trò chuyện</p>
        <div className="flex items-center gap-2">
          <HiDotsHorizontal />
          <MdZoomOutMap />
          <IoIosCreate />
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <IoSearchSharp className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm trên Messenger"
            className="w-full border-none bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>
      </div>

      {/* Tab */}
      <div className="flex items-center justify-around border-b border-gray-100 px-4 py-1 pb-2 text-sm font-medium text-gray-600">
        <p className={`cursor-pointer ${activeTab === 'ALL' ? 'text-blue-600 bg-gray-200 px-2 py-1 rounded-lg' : ''}`} onClick={() => handleClickTab('ALL')}>Tất cả</p>
        <p className={`cursor-pointer ${activeTab === 'NOSEEN' ? 'text-blue-600 bg-gray-200 px-2 py-1 rounded-lg' : ''}`} onClick={() => handleClickTab('NOSEEN')}>Chưa đọc</p>
        <p className={`cursor-pointer ${activeTab === 'GROUP' ? 'text-blue-600 bg-gray-200 px-2 py-1 rounded-lg' : ''}`} onClick={() => handleClickTab('GROUP')}>Nhóm</p>
      </div>
      <div className="max-h-80 overflow-y-auto pb-2">
        {visibleConversations.map(conversation => (
          <div key={conversation.name} className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50">
            <img src={IMAGE.LOGO} alt={conversation.name} className="h-11 w-11 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">{conversation.name}</p>
              <p className="truncate text-xs text-gray-500">Tin nhắn gần đây hiển thị ở đây</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;
