## Giải thích cách giải bài toán

Để giải quyết bài toán tìm lượng nhiên liệu tối thiểu để lấy được kho báu, em đã thực hiện như sau:

- Em xây dựng một phương thức đệ quy có tên là `CalculateMinFuelConsumed`.
- Phương thức này sẽ duyệt qua tất cả các đường đi có thể từ vị trí xuất phát đến vị trí kho báu trên ma trận.
- Ở mỗi bước, hàm sẽ tính toán lượng nhiên liệu tiêu tốn khi di chuyển từ đảo hiện tại sang các đảo tiếp theo hợp lệ (theo quy tắc đề bài: chỉ đi đến các rương có số lớn hơn và phải theo thứ tự từ nhỏ đến lớn).
- Khi đến được vị trí kho báu, hàm sẽ lưu lại tổng lượng nhiên liệu đã tiêu tốn cho đường đi đó.
- Sau khi duyệt hết tất cả các đường đi hợp lệ, em lọc ra kết quả có lượng nhiên liệu tiêu tốn nhỏ nhất.
- Kết quả cuối cùng là lượng nhiên liệu tối ưu để lấy được kho báu.

Cách làm này đảm bảo tìm được đáp án đúng vì duyệt hết mọi khả năng, tuy nhiên với ma trận lớn có thể cần tối ưu thêm về thuật toán để tăng tốc độ xử lý.
