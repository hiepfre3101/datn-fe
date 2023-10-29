const NoteForSeller = () => {
   return (
      <div>
         <div className='note mt-[30px] px-[12px] py-[30px] border-[#e2e2e2] border-[1px]'>
            <label
               htmlFor=''
               className='xl:text-[20px] max-xl:text-[18px] pb-[12px] mb-[30px] text-[#333333] font-bold border-[#e2e2e2] block border-b-[1px]'
            >
               Hướng dẫn đặc biệt cho người bán
            </label>
            <textarea
               className='w-full outline-none border-[#e2e2e2] border-[1px] rounded-[5px] resize-none px-[15px] py-[10px]'
               name=''
               id=''
               cols={30}
               rows={10}
            ></textarea>
         </div>
      </div>
   );
};

export default NoteForSeller;
