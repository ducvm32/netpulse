# 🚀 NetPulse – Network Monitoring Tool (ElectronJS)

**NetPulse** là phần mềm desktop được xây dựng bằng **ElectronJS**, dùng để **kiểm tra và giám sát trạng thái mạng theo thời gian thực** dành cho người dùng phổ thông và IT support.

Ứng dụng tập trung vào:

- Hiển thị thông tin mạng **ngắn gọn – dễ hiểu**
- Tự phát hiện lỗi **mất mạng / DNS lỗi**
- Theo dõi **Ping & tín hiệu mạng realtime**

---

## ✨ Tính năng chính

### 🌐 Thông tin mạng

- Địa chỉ **IP**
- **Gateway**
- **DNS Server**
- Trạng thái kết nối Internet

> Chỉ hiển thị **giá trị cần thiết**, không gây rối cho người dùng.

---

### 📡 Kiểm tra kết nối

- Ping liên tục tới **8.8.8.8 (-t)**
- Tự phát hiện:
  - ❌ Mất mạng
  - ⚠️ DNS không phản hồi
  - ⏱️ Độ trễ cao (High Latency)

---

### 📊 Biểu đồ realtime

- 📈 **Ping Chart** (ms)
- 📶 **RSSI / Signal Strength** (nếu có Wi-Fi)
- Cập nhật theo thời gian thực

---

## 🛠️ Công nghệ sử dụng

- **ElectronJS**
- **Node.js**
- HTML / CSS / JavaScript
- Chart.js (Realtime Chart)
- OS Network APIs

---

## 📦 Cài đặt & Chạy thử

### 1️⃣ Clone source

````bash
git clone https://github.com/ducvm32/netpulse.git
cd netpulse

## Linux Dependencies

Before running NetPulse on Linux, install required system libraries:

### Ubuntu / Debian
```bash
sudo apt install libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libgbm1
````
