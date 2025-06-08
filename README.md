# Hướng dẫn cài đặt và chạy dự án Treasure Hunter

## Yêu cầu hệ thống

- Node.js phiên bản 18
- .NET 8 SDK
- Cổng server backend: 8386

## Mô tả bài toán

Bạn hãy viết code C# (backend) và React (frontend, ưu tiên dùng thư viện Material-UI) để giải quyết bài toán bên dưới. Thông tin input được nhập và lưu vào database để có thể xem và giải lại. Hiển thị input nhập ma trận theo thông tin n, m và có validation.

### Tìm kho báu

Đoàn hải tặc tìm thấy một bản đồ kho báu, tuy nhiên để đến được kho báu thì phải vượt qua được thử thách. Vùng biển chứa kho báu là một ma trận các hòn đảo n hàng m cột, mỗi đảo có một chiếc rương đánh dấu bởi một số nguyên dương trong khoảng từ 1 đến p (tạm gọi là số x), và nó sẽ chứa chìa khoá cho chiếc rương đánh số x + 1. Và chỉ có chiếc rương được đánh số p (và là số lớn nhất) là chứa kho báu.

Để đi từ hòn đảo (x1:y1) đến đảo (x2:y2) cần một lượng nhiên liệu là √(x1 − x2)^2 + (y1 − y2)^2.

Hải tặc đang ở hòn đảo (1:1) - hàng 1 cột 1 và đã có sẵn chìa khoá số 0. Với việc cần tiết kiệm nhiên liệu để trở về, hãy tính lượng nhiên liệu ít nhất để lấy được kho báu. Biết rằng luôn có đường dẫn đến kho báu.

#### Input:
- 3 số nguyên dương n, m, p (1 <= n, m <= 500 , 1 <= p <= n*m) – lần lượt là số hàng, số cột của ma trận và số p – số loại rương có thể có trên ma trận
- Ma trận n hàng m cột, mỗi vị trí là một số nguyên biểu thị ma trận kho báu : a[i][j] (1 <= a[i][j] <= p) là số thứ tự của rương trong mỗi hòn đảo. Và chỉ có một hòn đảo chứa rương đánh số p.

#### Output:
Một số thực là lượng nhiên liệu nhỏ nhất mà hải tặc cần có để lấy được rương kho báu.

#### Ví dụ:

Test 1:
```
n: 3
m: 3
p: 3
3 2 2
2 2 2
2 2 1
Output: 4√2 = 5.65685
```

Test 2:
```
n: 3
m: 4
p: 3
2 1 1 1
1 1 1 1
2 1 1 3
Output: 5
```

Test 3:
```
n: 3
m: 4
p: 12
1 2 3 4
8 7 6 5
9 10 11 12
Output: 11
```

---

## Hướng dẫn cài đặt và chạy dự án

### 1. Cài đặt Backend (.NET 8)

1. Cài đặt .NET 8 SDK từ https://dotnet.microsoft.com/en-us/download/dotnet/8.0
2. Mở terminal, di chuyển vào thư mục backend (hoặc nơi chứa mã nguồn backend):
   ```sh
   cd <thu-muc-backend>
   ```
3. Khôi phục các package:
   ```sh
   dotnet restore
   ```
4. Chạy ứng dụng backend trên cổng 8386:
   ```sh
   dotnet run --urls "http://localhost:8386"
   ```
   > Lưu ý: Đảm bảo API chạy trên http://localhost:8386

### 2. Cài đặt Frontend (React + Material-UI)

1. Cài đặt Node.js phiên bản 18 từ https://nodejs.org/en/download/releases
2. Mở terminal, di chuyển vào thư mục frontend:
   ```sh
   cd frontend
   ```
3. Cài đặt các package:
   ```sh
   npm install
   ```
4. Chạy ứng dụng frontend:
   ```sh
   npm start
   ```
5. Truy cập ứng dụng tại http://localhost:3000

### 3. Cấu hình kết nối API

- Đảm bảo file cấu hình hoặc các lệnh gọi API trong frontend trỏ đúng về http://localhost:8386
- Nếu thay đổi cổng backend, cần sửa lại endpoint trong mã nguồn React cho khớp.

---

## Ghi chú
- Đảm bảo backend chạy trước khi thao tác trên frontend.
- Khi nhập ma trận, cần nhập đúng số hàng (n), số cột (m) và số loại rương (p) theo yêu cầu đề bài.
- Ứng dụng sử dụng Material-UI để hiển thị giao diện nhập liệu và kết quả.
- Dữ liệu nhập sẽ được lưu vào database để có thể xem lại và giải lại bài toán.

---

