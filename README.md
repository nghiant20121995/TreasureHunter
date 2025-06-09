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

## Giải thích cách giải bài toán

Để giải quyết bài toán tìm lượng nhiên liệu tối thiểu để lấy được kho báu, em đã thực hiện như sau:

- Em xây dựng một phương thức đệ quy có tên là `CalculateMinFuelConsumed`.
- Phương thức này sẽ duyệt qua tất cả các đường đi có thể từ vị trí xuất phát đến vị trí kho báu trên ma trận.
- Ở mỗi bước, hàm sẽ tính toán lượng nhiên liệu tiêu tốn khi di chuyển từ đảo hiện tại sang các đảo tiếp theo hợp lệ (theo quy tắc đề bài: chỉ đi đến các rương có số lớn hơn và phải theo thứ tự từ nhỏ đến lớn).
- Khi đến được vị trí kho báu, hàm sẽ lưu lại tổng lượng nhiên liệu đã tiêu tốn cho đường đi đó.
- Sau khi duyệt hết tất cả các đường đi hợp lệ, em lọc ra kết quả có lượng nhiên liệu tiêu tốn nhỏ nhất.
- Kết quả cuối cùng là lượng nhiên liệu tối ưu để lấy được kho báu.

Cách làm này đảm bảo tìm được đáp án đúng vì duyệt hết mọi khả năng, tuy nhiên với ma trận lớn có thể cần tối ưu thêm về thuật toán để tăng tốc độ xử lý.

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

- Mở terminal tại thư mục chứa file docker-compose.yml.
- Chạy lệnh sau:
- docker compose up --build
- Docker sẽ tự động build và khởi động cả frontend và backend.
- Sau khi hoàn tất, truy cập frontend tại: http://localhost:1006
- API backend sẽ chạy tại: http://localhost:8386/api/ping
---

## Ghi chú
- Đảm bảo backend chạy trước khi thao tác trên frontend.
- Khi nhập ma trận, cần nhập đúng số hàng (n), số cột (m) và số loại rương (p) theo yêu cầu đề bài.
- Ứng dụng sử dụng Material-UI để hiển thị giao diện nhập liệu và kết quả.
- Dữ liệu nhập sẽ được lưu vào database để có thể xem lại và giải lại bài toán.

---

