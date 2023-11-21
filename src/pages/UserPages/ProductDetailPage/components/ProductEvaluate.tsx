
import { ConfigProvider, Rate } from 'antd';


const ProductEvaluate = () => {
  return (
    <div>
         <div className='review-header mb-[25px]'>
                           <span className='review-title text-[20px] text-[#333333] font-bold'>
                              Đánh giá của khạch hàng 
                           </span>
                           <div className='product-rating mt-[25px] mb-[12px]'>
                              <div className='rate flex items-center'>
                                 <ConfigProvider
                                    theme={{
                                       token: {
                                          controlHeightLG: 34
                                       }
                                    }}
                                 >
                                    <Rate allowHalf disabled defaultValue={4.5} />
                                 </ConfigProvider>
                              </div>
                              <p className='review-summary mt-[8px] text-[18px]'>Dựa trên 3 đánh giá</p>
                           </div>
                        </div>
                        <div className='list-review'>
                           <div className='revite-item pt-[30px] pb-[30px] border-t-[1px]'>
                              <div className='rate flex items-center'>
                                 <ConfigProvider
                                    theme={{
                                       token: {
                                          controlHeightLG: 34
                                       }
                                    }}
                                 >
                                    <Rate allowHalf disabled defaultValue={4.5} />
                                 </ConfigProvider>
                              </div>
                              <p className='username mt-[9px] font-bold text-[#333333]'>Đàm Bá Quang</p>
                              <p className='date mt-[5px] text-[#333333] '>10/05/2023</p>
                              <p className='review-text mt-[18px]'>
                                 There are many variations of passages of lorem ipsum available, but the majority have
                                 suffered alteration in some form, by injected humour, or randomised words which don’t
                                 look even slightly believable. if you are going to use a passage of lorem ipsum, you
                                 need to be sure there isn’t anything embarrassing hidden in the middle of text. all the
                                 lorem ipsum generators on the internet tend to repeat predefined chunks as necessary,
                                 making this the first true generator on the internet.
                              </p>
                           </div>
                           <div className='revite-item pt-[30px] pb-[30px] border-t-[1px]'>
                              <div className='rate flex items-center'>
                                 <ConfigProvider
                                    theme={{
                                       token: {
                                          controlHeightLG: 34
                                       }
                                    }}
                                 >
                                    <Rate allowHalf disabled defaultValue={4.5} />
                                 </ConfigProvider>
                              </div>
                              <p className='username mt-[9px] font-bold text-[#333333]'>Đàm Bá Quang</p>
                              <p className='date mt-[5px] text-[#333333] '>10/05/2023</p>
                              <p className='review-text mt-[18px]'>
                                 There are many variations of passages of lorem ipsum available, but the majority have
                                 suffered alteration in some form, by injected humour, or randomised words which don’t
                                 look even slightly believable. if you are going to use a passage of lorem ipsum, you
                                 need to be sure there isn’t anything embarrassing hidden in the middle of text. all the
                                 lorem ipsum generators on the internet tend to repeat predefined chunks as necessary,
                                 making this the first true generator on the internet.
                              </p>
                           </div>
                           <div className='revite-item pt-[30px] pb-[30px] border-t-[1px]'>
                              <div className='rate flex items-center'>
                                 <ConfigProvider
                                    theme={{
                                       token: {
                                          controlHeightLG: 34
                                       }
                                    }}
                                 >
                                    <Rate allowHalf disabled defaultValue={4.5} />
                                 </ConfigProvider>
                              </div>
                              <p className='username mt-[9px] font-bold text-[#333333]'>Đàm Bá Quang</p>
                              <p className='date mt-[5px] text-[#333333] '>10/05/2023</p>
                              <p className='review-text mt-[18px]'>
                                 There are many variations of passages of lorem ipsum available, but the majority have
                                 suffered alteration in some form, by injected humour, or randomised words which don’t
                                 look even slightly believable. if you are going to use a passage of lorem ipsum, you
                                 need to be sure there isn’t anything embarrassing hidden in the middle of text. all the
                                 lorem ipsum generators on the internet tend to repeat predefined chunks as necessary,
                                 making this the first true generator on the internet.
                              </p>
                           </div>
                        </div>
    </div>
  )
}

export default ProductEvaluate