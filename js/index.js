// I. get API lấy danh sách nhân viên
// ---------------- get API -------------------
let getAllStaffApi = async () => {
    let responseStaffData = await axios({
        url: 'https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json',
    });


    //------------- Call Render Function -------------
    document.querySelector('#tableBodyStaff').innerHTML = renderStaff(responseStaffData.data);
}

// ---------------- Render Function -------------------
let renderStaff = (arrStaff) => {
    let tableStaff = '';
    for (let tag of arrStaff) {
        tableStaff += `
            <tr>
                <td>${tag.maNhanVien}</td>
                <td>${tag.tenNhanVien}</td>
                <td>${tag.chucVu}</td>
                <td>${tag.heSoChucVu}</td>
                <td>${tag.luongCoBan}</td>
                <td>${tag.soGioLamTrongThang}</td>
                <td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#inputModal" id="btnAction" onclick="editStaff('${tag.maNhanVien}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" id="btnDelete" onclick="delStaff('${tag.maNhanVien}')"><i class="fas fa-trash"></i></button></td>
            </tr>
        `
    } return tableStaff;
}

// II. ----------------- ADD STAFF -----------------------
// 1. DOM các giá trị gắn vào Object
document.querySelector('#btnAdd').onclick = async (e) => {
    e.preventDefault();

    let staff = {}; // Obj
    let arrInput = document.querySelectorAll('.fill-input');

    for (let tag of arrInput) {
        let { id, value } = tag; // let id = tag.id; let value = tag.value;
        staff[id] = value;
    }
    console.log(staff);
    // 2. POST API đưa thông tin lên server
    try {
        let up = await axios({
            url: 'https://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: staff
        });

        alert('Thêm nhân viên thành công!');
        // 3. GET API lại để tự load trang
        getAllStaffApi();
    } catch (err) {
        console.log(err);
    }

}
// III. ------------------------ EDIT STAFF --------------------------
window.editStaff = async (user) => {
    document.querySelector('#btnUpdate').classList.remove('d-none');
    document.querySelector('#btnDelete').classList.remove('d-none');
    document.querySelector('#btnAdd').classList.add('d-none');

    // 1. GET API 1 Staff
    let responseOneStaff = await axios({
        url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${user}`,
        method: 'GET',
        responseType: 'json'
    });
    console.log(responseOneStaff.data);

    // 2. DOM lên các input
    let arrEdit = document.querySelectorAll('.fill-input');
    for (let data of arrEdit) {
        let { id } = data; // let id = data.id
        data.value = responseOneStaff.data[id];
    }
}
// 3. khi nhất nút cập nhật, PUT API lên server
document.querySelector('#btnUpdate').onclick = async () => {
    let arrUpdate = document.querySelectorAll('.fill-input');
    let staffUpdate = {};

    for (let tagUpdate of arrUpdate) {
        staffUpdate[tagUpdate.id] = tagUpdate.value;
    }
    try {
        let update = await axios({
            url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${staffUpdate.maNhanVien}`,
            method: 'PUT',
            data: staffUpdate,
        });

        alert('Cập nhật thành công!');

        getAllStaffApi();
    } catch (err) {
        console.log(err);
    }
}

// IV. ----------------------- DELETE STAFF -----------------------------
window.delStaff = async (user) => {
    console.log(user);
    try {
        let res = await axios({
            url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${user}`,
            method: 'DELETE',
            responseType: 'json',
        });
        getAllStaffApi();
        alert('Đã xóa!');
    } catch (err) {
        console.log(err);
    }
}




// Gọi hàm
getAllStaffApi();

// Reset btnOpenModal
document.querySelector('#btnOpenModal').onclick = () => {
    document.querySelector('#formStaff').reset();
    document.querySelector('#defaultSelect').setAttribute('selected', '');
    document.querySelector('#btnUpdate').classList.add('d-none');
    document.querySelector('#btnDelete').classList.add('d-none');
    document.querySelector('#btnAdd').classList.remove('d-none');
}