
import { Slider } from 'antd';
import { useContext } from 'react';
import { FilterFieldContext } from '../ProductPage';


const  InputRange: React.FC = () => {
  const filter = useContext(FilterFieldContext)
  const changePrice =  (value:any)=>{
    if (filter.setfield) {
      filter.setfield({
        ...filter,
        field: {
          ...filter.field,
          minPrice: value[0],
          maxPrice: value[1],
        },
      });
    }
  
  
  }
 
  return<>
  <Slider onChange={(current:any)=>(changePrice(current))} step={10000}  range={{ draggableTrack: true }} max={500000} defaultValue={[1,500000]} />

  <br />
<div className='flex justify-between'>
<span>{filter.field.minPrice}</span>
  
  <span>{filter.field.maxPrice}</span>
</div>
  </>
};
export default InputRange
