import { ConfigProvider, Rate } from 'antd';
import {  useState } from 'react';
import { IDescProp } from '../../../../interfaces/product';


const ProductDescriptionTab = ({desc,originName}:IDescProp)=>{
    const [stateNav, setStateNav] = useState<string>('des');    
    return<>
         <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <ul className='pro-nav flex flex-wrap max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                     <li className='des md:pr-[28px]  '>
                        <button
                           onClick={() => {
                              setStateNav('des');
                           }}
                           type='button'
                           style={ stateNav == 'des' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           className=' font-bold py-[15px] p transition-all duration-300 hover:text-[#333333]'
                        >
                           MIÊU TẢ
                        </button>
                     </li>
                     <li className='pr-info px-[28px] sm:border-l-[1px] '>
                        <button
                           onClick={() => {
                              setStateNav('pr-info');
                           }}
                           style={ stateNav == 'pr-info' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           type='button'
                           className=' font-bold py-[15px] transition-all duration-300 hover:text-[#333333]'
                        >
                           THÔNG TIN SẢN PHẨM
                        </button>
                     </li>
                     <li className='other-content px-[28px] sm:border-l-[1px] '>
                        <button
                           type='button'
                           onClick={() => {
                              setStateNav('other-content');
                           }}
                           style={ stateNav == 'other-content' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           className=' font-bold py-[15px] transition-all duration-300 hover:text-[#333333]'
                        >
                           NỘI DUNG KHÁC
                        </button>
                     </li>
                     <li className='review-btn px-[28px] sm:border-l-[1px] '>
                        <button
                           type='button'
                           onClick={() => {
                              setStateNav('review-btn');
                           }}
                           style={ stateNav == 'review-btn' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           className=' font-bold py-[15px] transition-all duration-300 hover:text-[#333333]'
                        >
                           ĐÁNH GIÁ
                        </button>
                     </li>
                  </ul>
                  {stateNav == 'des' && (
                     <div className='product-des-content mt-[30px]'>
                         { <div dangerouslySetInnerHTML={{ __html:desc?desc:"" }} /> }
                    
                     </div>
                  )}
                  {stateNav == 'pr-info' && (
                     <div className='product-additional-info mt-[30px]'>
                        <table className='border-collapse  border w-full'>
                           <tr>
                              <th className='p-[15px] border text-[#333333] w-[20%] text-left'>Xuất xứ:</th>
                              <td className='p-[15px] border w-[80%]'>{originName}</td>
                           </tr>
                          
                        </table>
                     </div>
                  )}

                  {stateNav == 'other-content' && (
                     <div className='product-other-content mt-[30px]'>
                        ohter Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </div>
                  )}
                  {stateNav == 'review-btn' && (
                     <div className='review mt-[30px]'>
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
                  )}
               </div>
    </>
}
export default ProductDescriptionTab