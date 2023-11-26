import Title from "antd/es/typography/Title"
import { Link } from "react-router-dom"


const IntroducePage = () => {
    return (
        <>
            <div className='main'>
                <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
                    <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                        <span>
                            <Link to='/'>Trang chủ </Link> / Giới thiệu
                        </span>
                    </div>
                </section>
                <section className=' lg:py-[100px] md:py-[80px] max-md:py-[60px] '>
                    <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] '>
                        <div className=' xl:w-[90%] lg:w-[60%] md:w-[70%] max-md:w-[100%] m-auto '>
                            <div style={{ padding: `15px` }}>
                                <Title className='text-start' level={2}>CÂU CHUYỆN CỦA CHÚNG TÔI</Title>
                                <p>Fresh mart là cửa hàng bán hoa quả trực tuyến uy tín, chuyên cung cấp
                                    các loại hoa quả tươi ngon, chất lượng cao. Chúng tôi cam kết mang đến
                                    cho khách hàng những sản phẩm hoa quả tươi ngon, an toàn, giá cả hợp lý.</p>
                            </div>
                            <div style={{ padding: `15px` }}>
                                <Title className='text-start' level={2}>Fresh mart cung cấp đa dạng các loại
                                    hoa quả tươi ngon, chất lượng cao, bao gồm:</Title>
                                <p>Trái cây nhập khẩu: Táo, lê, cam, chanh, kiwi, dâu tây, v.v.</p>
                                <p>Trái cây Việt Nam: Xoài, cam, bưởi, dứa, thanh long, v.v.</p>
                                <p>Trái cây theo mùa: Thanh long, nhãn, vải, chôm chôm, măng cụt, v.v.</p>
                            </div>
                            <div style={{ padding: `15px` }}>
                                <Title className='text-start' level={2}>Chính sách giao hàng:</Title>
                                <p>Quả ngon cung cấp dịch vụ giao hàng tận nơi miễn phí cho các đơn hàng trên
                                    200.000 đồng. Thời gian giao hàng từ 2-4 giờ trong nội thành Hà Nội.</p>
                            </div>
                            <div style={{ padding: `15px` }}>
                                <Title className='text-start' level={2}>Ưu điểm của cửa hàng bán hoa quả trực tuyến Fresh mart:</Title>
                                <p>Chất lượng sản phẩm cao, đảm bảo an toàn vệ sinh thực phẩm.</p>
                                <p>Giá cả hợp lý, cạnh tranh.</p>
                                <p>Dịch vụ giao hàng tận nơi nhanh chóng, tiện lợi.</p>
                            </div>
                           
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IntroducePage