# Mạng Xã Hội Gia Đình

Ứng dụng mạng xã hội và nhắn tin riêng tư dành cho gia đình. Ứng dụng cung
cấp không gian trò chuyện 1-1, trò chuyện nhóm, chia sẻ tệp/media và các tiện
ích cộng tác như ghi chú, bình chọn và nhắc việc.

Đây là **frontend React**. Backend không nằm trong repository này và phải cung
cấp REST API, Socket.IO và các endpoint upload/notification tương ứng.

## Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ](#công-nghệ)
- [Yêu cầu môi trường](#yêu-cầu-môi-trường)
- [Cài đặt và chạy local](#cài-đặt-và-chạy-local)
- [Cấu hình biến môi trường](#cấu-hình-biến-môi-trường)
- [Luồng sử dụng](#luồng-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Kết nối backend](#kết-nối-backend)
- [Build và triển khai](#build-và-triển-khai)
- [Kiểm thử](#kiểm-thử)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)

## Tính năng

### Tài khoản và bảo mật

- Đăng ký, đăng nhập và đăng xuất.
- Tự động khôi phục session sau khi tải lại trang bằng access token và refresh
  token.
- Tự động refresh token khi API trả về `401`; các request phát sinh trong lúc
  refresh được xếp hàng và gửi lại sau khi refresh thành công.
- Bảo vệ route: người chưa đăng nhập chỉ truy cập được `/login` và
  `/register`.
- Đăng nhập bằng QR: tạo phiên QR, quét QR và xác nhận phiên từ thiết bị đã
  đăng nhập.
- Cập nhật thông tin cá nhân và ảnh đại diện.

### Nhắn tin

- Trò chuyện trực tiếp giữa hai thành viên.
- Trò chuyện nhóm và cập nhật tin nhắn theo thời gian thực qua WebSocket.
- Gửi tin nhắn văn bản, tệp, hình ảnh và tin nhắn thoại.
- Ghi âm trực tiếp trên trình duyệt và phát audio với waveform.
- Emoji/reaction cho tin nhắn.
- Trả lời tin nhắn, chỉnh sửa và thu hồi tin nhắn.
- Xóa tin nhắn ở phía người dùng, xóa nội dung cuộc trò chuyện và hoàn tác
  một số thao tác xóa.
- Trạng thái đang nhập, đã đọc và danh sách người đã đọc.
- Âm thanh thông báo khi nhận tin nhắn mới.
- Ghim/bỏ ghim tin nhắn, xem media trong cuộc trò chuyện và tìm kiếm tin nhắn.
- Chia sẻ một hoặc nhiều tin nhắn sang cuộc trò chuyện khác.
- Tìm kiếm thành viên và truy cập các cuộc trò chuyện gần đây.

### Nhóm gia đình

- Tạo, đổi tên, đổi ảnh đại diện và xóa nhóm.
- Thêm/xóa thành viên, phân quyền thành viên.
- Hiển thị cây thành viên nhóm.
- Chế độ chỉ đọc và các thiết lập nhóm.
- Ghim hoặc tắt thông báo cho cuộc trò chuyện.
- Đồng bộ tức thời khi thành viên được thêm, xóa hoặc khi nhóm bị giải tán.

### Tiện ích trong cuộc trò chuyện

- Tạo và hiển thị ghi chú (`note`).
- Tạo bình chọn, thêm lựa chọn, bỏ phiếu và đóng bình chọn.
- Tạo nhắc việc, đánh dấu hoàn thành và xóa nhắc việc.
- Thông báo trình duyệt/Web Push khi người dùng cho phép.
- Giao diện responsive, hỗ trợ theme sáng/tối và cài đặt dạng PWA.

## Công nghệ

- React 19 và Create React App (`react-scripts`).
- React Router 7.
- Zustand cho state cục bộ và React Query cho dữ liệu server/cache.
- Axios với interceptor xác thực và refresh token.
- Socket.IO Client cho nhắn tin thời gian thực.
- Tailwind CSS, React Icons và Emoji Picker.
- React Hook Form + Zod cho form và validation.
- `html5-qrcode` cho quét QR.
- `wavesurfer.js` cho audio waveform.
- Service worker/Web Push cho thông báo nền.

## Yêu cầu môi trường

- Node.js 18 trở lên (khuyến nghị Node.js LTS).
- npm 9+ hoặc pnpm 8+.
- Một backend đang chạy và cho phép CORS từ địa chỉ frontend.
- Trình duyệt hiện đại có hỗ trợ WebSocket, MediaRecorder và Notification API
  nếu muốn dùng đầy đủ tính năng audio/Web Push.

## Cài đặt và chạy local

```bash
git clone <repository-url>
cd family-social-network
npm install
```

Hoặc dùng pnpm (repository có `pnpm-lock.yaml`):

```bash
pnpm install
```

Tạo file `.env` ở thư mục gốc:

```env
REACT_APP_API_URL=http://localhost:1711/api
REACT_APP_SOCKET_URL=http://localhost:1711
REACT_APP_VAPID_PUBLIC_KEY=<public-vapid-key>
```

Khởi động development server:

```bash
npm start
# hoặc
pnpm start
```

Mở [http://localhost:3000](http://localhost:3000). Thay đổi mã nguồn sẽ được
hot reload tự động.

> CRA chỉ đọc biến môi trường có tiền tố `REACT_APP_`. Sau khi sửa `.env`,
> cần khởi động lại development server.

## Cấu hình biến môi trường

| Biến | Bắt buộc | Mô tả |
| --- | --- | --- |
| `REACT_APP_API_URL` | Có | Base URL REST API, thường kết thúc bằng `/api`. |
| `REACT_APP_SOCKET_URL` | Có | Origin của máy chủ Socket.IO, không thêm `/api`. |
| `REACT_APP_VAPID_PUBLIC_KEY` | Khi dùng Web Push | Public VAPID key do backend cung cấp. |

Nếu không cấu hình, code có fallback về `http://localhost:1411/api` và
`http://localhost:1411`. Nên khai báo rõ hai biến URL để tránh nhầm cổng.

Không đưa access token, refresh token, private VAPID key, khóa database hoặc
secret backend vào frontend. Giá trị `REACT_APP_*` được nhúng vào bundle khi
build nên mọi giá trị tại đây đều có thể bị người dùng xem.

## Luồng sử dụng

1. Mở ứng dụng và đăng ký tài khoản mới hoặc đăng nhập.
2. Sau khi đăng nhập, chọn một thành viên để mở chat 1-1 hoặc chọn/tạo nhóm.
3. Gửi văn bản, emoji, tệp, hình ảnh hoặc giữ nút ghi âm để tạo tin nhắn
   thoại.
4. Mở menu tin nhắn để reaction, trả lời, chỉnh sửa, thu hồi, ghim, chia sẻ
   hoặc xóa tin nhắn.
5. Dùng thanh tìm kiếm để tìm thành viên, tin nhắn hoặc media.
6. Trong nhóm, quản trị viên có thể mở phần thành viên/cài đặt để quản lý
   thành viên, vai trò, chế độ chỉ đọc và thông tin nhóm.
7. Cho phép thông báo khi trình duyệt hỏi quyền nếu muốn nhận Web Push.
8. Có thể vào `/qr-scan` từ thiết bị đã đăng nhập để quét phiên đăng nhập QR.

Các route chính:

| Route | Quyền truy cập | Mục đích |
| --- | --- | --- |
| `/login` | Công khai | Đăng nhập tài khoản. |
| `/register` | Công khai | Tạo tài khoản mới. |
| `/chat` | Đã đăng nhập | Khu vực chat chính. |
| `/qr-scan` | Đã đăng nhập | Quét/ủy quyền phiên QR. |

Route không tồn tại được chuyển về `/chat`.

## Cấu trúc dự án

```text
public/                 Tài nguyên tĩnh, manifest và service worker
src/
  api/                  Các module gọi REST API
  components/           Component giao diện dùng chung và modal
  constants/            Hằng số ứng dụng
  hooks/                React hooks dùng chung
  pages/                Các màn hình login, register, QR và chat
  routers/              Khai báo route và bảo vệ route
  services/             Socket.IO service
  stores/               Zustand stores (auth, chat, UI, theme)
  utils/                Token, push notification, format và validation
scripts/
  postbuild-obfuscate.js  Xử lý bundle sau production build
nginx.conf              Cấu hình Nginx cho SPA và cache asset
.htaccess               Fallback rewrite cho Apache/hosting tĩnh
```

Axios được cấu hình tại `src/api/axiosClient.js`; trạng thái xác thực nằm ở
`src/stores/auth.store.js`; kết nối thời gian thực nằm ở
`src/services/socket.service.js`.

## Kết nối backend

Frontend đang gọi các nhóm REST endpoint sau dưới `REACT_APP_API_URL`:

- `/auth`: register, login, refresh token, thông tin tài khoản và QR login.
- `/users`: tìm kiếm, chat gần đây, pinned/muted conversation và profile.
- `/groups`: danh sách nhóm, thành viên, vai trò, avatar và settings.
- `/messages`: lịch sử chat 1-1/nhóm, tìm kiếm, media, pin và clear chat.
- `/uploads`: upload tệp/media.
- `/polls`: tạo, lấy danh sách, vote, thêm option và đóng poll.
- `/notes`: tạo, lấy danh sách và xóa note.
- `/reminders`: tạo, lấy danh sách, đổi trạng thái và xóa reminder.
- `/notifications/subscribe`: đăng ký Web Push subscription.

Backend cần hỗ trợ CORS với credentials vì frontend gửi cookie/refresh token
qua Axios. Socket.IO cần xác thực token trong handshake:

```js
const socket = io(SOCKET_ORIGIN, {
  auth: { token: accessToken },
  transports: ['websocket'],
});
```

Các sự kiện realtime chính gồm tin nhắn nhóm/1-1 (`receiveGroupMessage`,
`receiveDirectMessage`), trạng thái nhập (`userTyping`, `userStopTyping`),
thay đổi thành viên/nhóm, thay đổi quyền đọc và reaction. Tên event và payload
phải thống nhất với backend.

## Build và triển khai

Tạo production build:

```bash
npm run build
# hoặc
pnpm build
```

Kết quả nằm trong thư mục `build/`. Script `postbuild` sẽ được chạy tự động
để xử lý bundle sau khi CRA build xong.

### Nginx

Repository đã có [`nginx.conf`](./nginx.conf) với:

- root `/usr/share/nginx/html`;
- fallback mọi route SPA về `/index.html`;
- cache dài hạn cho JavaScript, CSS, ảnh và font.

Ví dụ Dockerfile tối giản:

```dockerfile
FROM nginx:alpine
COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

Build image sau khi đã chạy `npm run build`, sau đó trỏ reverse proxy/CORS đến
backend. Với Apache hoặc các static hosting hỗ trợ rewrite, dùng file
`.htaccess`/`_redirects` trong `public/` để các route React không trả về 404.

## Kiểm thử

Chạy test của Create React App:

```bash
npm test
```

Chạy build để kiểm tra lỗi compile và khả năng đóng gói:

```bash
npm run build
```

## Xử lý lỗi thường gặp

### Không gọi được API

- Kiểm tra backend có chạy đúng cổng không.
- Kiểm tra `REACT_APP_API_URL` có chứa `/api` đúng theo backend không.
- Kiểm tra CORS và `Access-Control-Allow-Credentials`.
- Sau khi sửa `.env`, hãy restart `npm start`.

### Không nhận tin nhắn realtime

- Kiểm tra `REACT_APP_SOCKET_URL` là origin Socket.IO, không phải REST URL.
- Kiểm tra backend cho phép WebSocket và không chặn upgrade connection.
- Kiểm tra access token còn hiệu lực và handshake nhận được `auth.token`.

### Refresh trang bị 404 sau khi deploy

Đây là đặc trưng của SPA: web server cần rewrite route về `index.html`. Hãy
dùng `nginx.conf`, `.htaccess` hoặc `_redirects` đi kèm repository.

### Không ghi âm hoặc không quét QR được

- Cấp quyền microphone/camera cho domain.
- Camera và microphone thường yêu cầu HTTPS, ngoại trừ `localhost`.
- Kiểm tra trình duyệt có hỗ trợ MediaRecorder và quyền thiết bị hay không.

### Không nhận Web Push

- Chỉ dùng public VAPID key ở frontend; private key phải nằm ở backend.
- Người dùng phải cấp quyền notification.
- Trang phải chạy trên HTTPS (hoặc `localhost`) và service worker phải được
  đăng ký đúng scope.

## Đóng góp

1. Tạo branch theo mục đích thay đổi.
2. Cập nhật code và test liên quan.
3. Chạy `npm test` và `npm run build`.
4. Tạo pull request với mô tả ngắn về thay đổi và cách kiểm tra.

## Bản quyền

Chưa có thông tin giấy phép được khai báo trong repository. Hãy bổ sung
`LICENSE` trước khi phát hành hoặc sử dụng dự án cho mục đích thương mại.
