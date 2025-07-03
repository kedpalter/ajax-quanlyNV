/*
    I. get api lấy dữ liệu danh sách sinh viên
        1. GET api lấy danh sách sinh viên
        2. render DS lên table
    II. post api đưa thông tin sinh viên lên server
        1. DOM các input lấy giá trị vào Obj
        2. POST api đưa Obj vừa thêm lên server
        3. getAll api để load lại trang
    III. sửa sinh viên
        1. Dữ liệu SV đã nằm trên server → gọi api lấy dữ liệu 1 sinh viên (khác với lấy dữ liệu danh sách)
        2. Cho thông tin sinh viên vừa lấy load lên các thẻ input
        3. Sau khi đổi thông tin, nhấn nút LƯU → PUT thông tin lên server
    IV. xóa sinh viên
*/