
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IMAGE } from '../../../constants/image/IMAGE';

const NotificationsHeader = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  const notifications = [
    { message: 'Nguyễn Văn A vừa đăng một bài viết mới', type: 'ALL' },
    { message: 'Trần Thị B đã bình luận vào bài viết của bạn', type: 'NOSEEN' },
    { message: 'Nhóm gia đình có thông báo mới', type: 'GROUP' },
  ];

  const visibleNotifications =
    activeTab === 'ALL'
      ? notifications
      : notifications.filter(notification => notification.type === activeTab);

  const handleClickTab = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="absolute right-0 top-10 z-20 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <p className="text-base font-semibold text-gray-800">Thông báo</p>
        <HiDotsHorizontal />
      </div>

      {/* Tab */}
      <div className="flex items-center justify-around border-b border-gray-100 px-4 py-1 pb-2 text-sm font-medium text-gray-600">
        <p className={`cursor-pointer ${activeTab === 'ALL' ? 'text-blue-600 bg-gray-200 px-2 py-1 rounded-lg' : ''}`} onClick={() => handleClickTab('ALL')}>Tất cả</p>
        <p className={`cursor-pointer ${activeTab === 'NOSEEN' ? 'text-blue-600 bg-gray-200 px-2 py-1 rounded-lg' : ''}`} onClick={() => handleClickTab('NOSEEN')}>Chưa đọc</p>
        <p className={`cursor-pointer ${activeTab === 'GROUP' ? 'text-blue-600 bg-gray-200 px-2 py-1 rounded-lg' : ''}`} onClick={() => handleClickTab('GROUP')}>Nhóm</p>
      </div>

      <div className="max-h-96 overflow-y-auto py-2">
        {visibleNotifications.map(({ message }, index) => (
          <div key={index} className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50">
            <img src={IMAGE.LOGO} alt="Thông báo" className="h-11 w-11 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-800">{message}</p>
              <p className="mt-1 text-xs text-gray-500">{index + 1} phút trước</p>
            </div>
          </div>
        ))}
      </div>


      <div className="border-t border-gray-100 px-4 py-3 text-center">
        <button className="text-sm font-medium text-blue-600 hover:underline" type="button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NotificationsHeader;
