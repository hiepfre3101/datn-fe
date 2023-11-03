
import { Link } from "react-router-dom";
import InputComponent from "./Component/TabInput"
import { Button, Divider, Space, Table, Tag, message } from 'antd'
import { useEffect, useState } from "react";
import { IOder } from "../../../interfaces/order";
import Loading from "../../../components/Loading/Loading";
import { getOrder } from "../../../api/order";


const { Column } = Table;


const OrderPage = () => {

  const [orders, setOrders] = useState<IOder>();
  const [loading, setLoading] = useState<boolean>(false);

  // const orderDatas = orders && orderData(orders)
  useEffect(() => {

    (async () => {
      try {
        setLoading(true);
        const {
          data: { body }
        } = await getOrder();
        setOrders(body.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error('Loi he thong!');
        console.log(error);
      }
    })();
  }, []);
  console.log(orders);


  if (loading) return <Loading sreenSize='lg' />;
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
            <Table dataSource={orders} pagination={{ pageSize: 10 }} scroll={{ y: 800 }} >
              <Column title="ID" dataIndex="_id" key="id" />
              <Column title="Ngày mua" dataIndex="createdAt" key="createdAt" />
              <Column title="Tên" dataIndex="customerName" key="customerName" />
              <Column title="Số điện thoại" dataIndex="phoneNumber" key="phoneNumber" />
              <Column title="Trạng thái" dataIndex="status" key="status"
                render={(_: IOder, record: IOder) => {
                  let color = 'white'
                  if (record.status == 'chờ xác nhận') {
                    color = 'yellow'
                  }
                  if (record.status == 'đang giao hàng') {
                    color = 'green'
                  }
                  if (record.status == 'giao hàng thành công') {
                    color = 'red'
                  }
                  return (<Tag color={color}>
                    {record.status}
                  </Tag>)
                }
                }
              />
              <Column
                title="Hành động"
                key="action"
                render={(_: IOder, record: IOder) => (
                  <Space size="middle">

                    <Link to={''}><Button className="bg-amber-500" >Mua lại</Button></Link>
                    <Link to={'/my-order/' + record?._id}><Button className="bg-greenPrimary">Chi tiết</Button></Link>

                  </Space>
                )}
              />
            </Table>
            {/* <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                
                {
                  orders?.map((item) =>{
                    return <tr>
                    <td>{item._id}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.customerName}</td>
                    <td ></td>
                  </tr>
                  })
                }
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage