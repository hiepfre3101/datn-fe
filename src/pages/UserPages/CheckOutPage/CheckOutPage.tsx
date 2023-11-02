import { useState } from 'react';
import OrderDetail from './components/orderDetail';
import OrderNote from './components/orderNote';
import OrderCheckOut from './components/orderCheckOut';
import { Button, ConfigProvider, Steps } from 'antd';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ICartSlice } from '../../../slices/cartSlice';
const CheckOutPage = () => {
   // const [checkOutState, setCheckOutState] = useState<string>('order-detail');

   // const handleChangeCheckOutState = (state:string) => {
   //    setCheckOutState(state)
   // }
   const methods = useForm();
   
   const [current, setCurrent] = useState(0);
   const cart = useSelector((state: { cart: ICartSlice }) => state?.cart.items);
   
   const onSubmit = (data) => {      
      console.log(data);
      next()
      if(current==2) {
         console.log("mua hàng");
         
      }
    
    };
   
    console.log(current);
   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };
   const steps = [
      {
         title: '',
         content: <OrderDetail></OrderDetail>
      },
      {
         title: '',
         content: <OrderNote></OrderNote>
      },
      {
         title: '',
         content: <OrderCheckOut></OrderCheckOut>
      }
   ];
   const items = steps.map((item) => ({ key: item.title, title: item.title }));
   return (
      <>
         <div className='main'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <Link to="/">Trang chủ </Link> / Thanh toán
                  </span>
               </div>
            </section>
            <FormProvider {...methods}>
            <section className='section-chekout lg:my-[100px] md:my-[80px] max-md:my-[60px]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='checkout-header mb-[40px]'>
                     <div className='checkout-tab'>
                        <ConfigProvider
                           theme={{
                              components: {
                                 Steps: {
                                    colorPrimary:"#51A55C",
                                 }
                              }
                           }}
                        >
                            <Steps current={current} items={items} />
                        </ConfigProvider>               
                     </div>
                  </div>

                  <div className='checkout-content'>
                     <div>{steps[current].content}</div>
                     <div style={{ marginTop: 24 }}>
                        {current < steps.length - 1 && (
                           <Button
                              className='bg-[#51A55C] text-white hover:bg-[#51A55C] hover:!border-[#51A55C] hover:!text-white'
                              type="text" onClick={methods.handleSubmit(onSubmit)}
                           >
                              Next
                           </Button>
                        )}
                        {current > 0 && (
                           <Button
                              className=' hover:!border-[#51A55C] hover:!text-[#51A55C] '
                              style={{ margin: '0 8px' }}
                              onClick={() => prev()}
                           >
                              Previous
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </section>
            </FormProvider>
     
         </div>
      </>
   );
};
export default CheckOutPage;
