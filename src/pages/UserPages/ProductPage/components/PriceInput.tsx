import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider } from 'antd';

export const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState<number|null>(1);

  const onChange = (newValue: number|null) => {
    setInputValue(newValue);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export const DecimalStep: React.FC = () => {
  const [inputValue, setInputValue] = useState<number|null>(0);

  const onChange = (valuee: number|null) => {
  if(valuee){
    if (isNaN(valuee)) {
        return;
      }
      if(valuee>20){
        setInputValue(valuee);
      }
  }
 
  

  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={100}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={1}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={100}
          style={{ margin: '0 16px' }}
          step={1}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
