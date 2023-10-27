import React from 'react';

const NotFoundPage = () => {
  return (
    <div>
      <div className="text-center">

        <div>
          <img className="m-auto w-48" src="https://f46-zpg-r.zdn.vn/9171591183498640060/6cc7a48c6564b03ae975.jpg" alt="" />
        </div>

        <div className="text-5xl font-extrabold ...">
          <span className="text-[#6BAA14] text-8xl font-extrabold">
            404
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center mx-auto md:w-1/2 lg:w-3/5">
          <div className="w-full md:w-4/5">
            <p className="text-5xl font-extrabold">Không tìm thấy nội dung</p>
          </div>
          <div className="w-full md:w-1/6  md:mt-0">
            <img src="https://img.freepik.com/premium-vector/cute-funny-crying-sad-carrot-character_464314-1975.jpg" alt="" />
          </div>
        </div>

        <div className="mt-3">
          <p className="text-lg font-medium">URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
          <p className="text-lg font-medium">Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì sử dụng URL đã lưu.</p>
        </div>

        <div className="mt-8">
          <a href="/">
            <button className="rounded-full bg-[#6BAA14] text-white text-lg font-medium md:w-[18%] h-10 mx-auto md:mx-0">Quay về trang chủ</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;