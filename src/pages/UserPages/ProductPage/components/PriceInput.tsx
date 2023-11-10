
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
          min: value[0],
          max: value[1],
        },
      });
    }
  
  
  }
 
  return<>
  <Slider onChange={(current:any)=>(changePrice(current))}  range={{ draggableTrack: true }} defaultValue={[1, 100]} />
  <span>{filter.field.min}</span>
  <br />
  <span>{filter.field.max}</span>
  </>
};
export default InputRange
