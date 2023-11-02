
import { Link } from "react-router-dom";
import InputComponent from "./Component/TabInput"
import { Button, Divider, Space, Table, Tag } from 'antd'

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  date: string;
  phone: string;
  trangthai: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// data fake
const data: DataType[] = [
  {
    key: '1',
    id: '1',
    name: 'John',
    date: '23/10/2023',
    phone: '09876543',
    trangthai: 'đã giao'
  },
  {
    key: '2',
    id: '2',
    name: 'John',
    date: '23/10/2023',
    phone: '09876543',
    trangthai: 'đang giao'
  },
  {
    key: '3',
    id: '3',
    name: 'John',
    date: '23/10/2023',
    phone: '09876543',
    trangthai: 'đã hủy'
  },

];

const OrderPage = () => {


  return (
    <div className="main">

      <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
        <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
          <span>
            <a href=''>Trang chủ </a> / Đơn hàng
          </span>
        </div>
      </section>

      <div className="bg-slate-200 cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start">
        <div className="mt-10 w-full font-bold">
          <InputComponent inputs={[
            {
              id: 1,
              label: "Tên",
              value: "",
            },
            {
              id: 2,
              label: "Địa chỉ",
              value: "",
            },
            {
              id: 3,
              label: "Số điện thoại",
              value: "",
            },
            {
              id: 4,
              label: "Ngày mua",
              value: "",
            },
            {
              id: 5,
              label: "ID",
              value: "",
            },
          ]} />

          <Divider></Divider>

          <div className="bg-slate-50">
            <Table dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: 800 }} >
              <Column title="ID" dataIndex="id" key="id" />
              <Column title="Ngày mua" dataIndex="date" key="date" />
              <Column title="Tên" dataIndex="name" key="name" />
              <Column title="Số điện thoại" dataIndex="phone" key="phone" />
              <Column title="Trạng thái" dataIndex="trangthai" key="trangthai"
                render={(_: any, record: DataType) => {
                  let color = 'white'
                  if (record.trangthai == 'đang giao') {
                    color = 'yellow'
                  }
                  if (record.trangthai == 'đã giao') {
                    color = 'green'
                  }
                  if (record.trangthai == 'đã hủy') {
                    color = 'red'
                  }
                  return (<Tag color={color}>
                    {record.trangthai}
                  </Tag>)
                }
                }
              />
              <Column
                title="Hành động"
                key="action"
                render={(_: any, record: DataType) => (
                  <Space size="middle">

                    <Link to={''}><Button className="bg-amber-500" >Mua lại</Button></Link>
                    <Link to={'/my-order/:id'}><Button className="bg-greenPrimary">Chi tiết</Button></Link>

                  </Space>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage