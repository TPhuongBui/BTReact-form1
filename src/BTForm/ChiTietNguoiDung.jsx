import React, { Component } from 'react'
import { connect } from 'react-redux'
class ChiTietNguoiDung extends Component {

  timKiemTheoTen = (event) => {

    let flag = this.props.dataReduce;
    if (event.target.value !== '') {
      let newArr = this.props.mangNguoiDung.filter((item) => {
        return item.hoTen.toLowerCase().indexOf(event.target.value) !== -1
      })
      flag = newArr
    } 

    this.props.dispatch({
      type: 'TIM_KIEM',
      flag
    })
  }
  render() {

    return (
      <div className="row">
        <div className="col-12">
          <p style={{fontSize: "30px", fontWeight: "bold"}} className='bg-dark text-light text-center'>Thông tin người dùng</p>
          <input  type="text" placeholder='Tìm kiếm tên người dùng' onChange={this.timKiemTheoTen} />
          <table className="table">
            <thead >
              <tr>
                <th>Tài khoản</th>
                <th>Họ Tên</th>
                <th>mật khẩu</th>
                <th>email</th>
                <th>số điện thoại</th>
                <th>loại người dùng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.mangNguoiDung.map((item) => {
                  let { taiKhoan, hoTen, matKhau, email, sdt, maLoaiND } = item
                  return <tr key={item.taiKhoan}>
                    <td>{taiKhoan}</td>
                    <td>{hoTen}</td>
                    <td>{matKhau}</td>
                    <td>{email}</td>
                    <td>{sdt}</td>
                    <td>{maLoaiND}</td>
                    <td>
                      <button className='btn btn btn-success mr-2' type='button' onClick={() => {
                        this.props.dispatch({
                          type: 'XEM_CHI_TIET',
                          xemChiTiet: item
                        })
                      }}>Xem</button>
                      <button className='btn btn btn-danger' type='button' onClick={() => {
                        this.props.dispatch({
                          type: 'XOA_ND',
                          taiKhoanXoa: item.taiKhoan
                        })
                      }}>Xóa</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>

    )
  }
}

const mapStatetoProps = (rootReducer) => {
  return {
    mangNguoiDung: rootReducer.LTBTQLND.mangNguoiDung,
    dataReduce: rootReducer.LTBTQLND.dataReduce
  }
}

export default connect(mapStatetoProps)(ChiTietNguoiDung)