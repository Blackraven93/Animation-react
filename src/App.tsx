import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useDomEvent, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import SvgContainer from './SvgContainer';


const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
`;

const SwitchBtn = styled(motion.button)`
  width: 95px;
  height: 40px;
  border-radius: 5px;
  border:0;
  color:#ff9558;
  font-size: 21px;
  font-weight: 700;
  background-color: white;
`

const btnVariants = {
  start: {
    width: "80px",
    height: "32px",
    fontSize: "18px",
  },
  end: {
    
    fontSize: "21px",
  }
}

const boxVariants = {
  hover: {scale: 1.4, rotateZ:90},
  click: {
    borderRadius: "100px",
    scale:1
  }

};

const test = {
  start: {
    translateX:-380,
    rotate: 0,
    // transition: {
    //   type:"spring",
    //   duration: 1,
    // }
  },
  end: {
    translateX:380,
    rotate: 360,
    // transition: {
    //   type:"spring",
    //   duration: 1,
    // }
  },
}


function App() {

  const [isClick, setIsClick] = useState(false);
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(prev => !prev)
  
  const translateX = useMotionValue(0);
  const color = useTransform(translateX, [-350, 350], ["rgba(255, 149, 88, 1)", "rgba(76, 81, 117, 1)"])


  return (
    <>
      <Wrapper>
          <Box variants={test} style={{translateX}} animate={isClick ? "start" : "end"}  drag="x" dragSnapToOrigin />
          <SwitchBtn variants={btnVariants} style={{color}} animate={isClick ? "start" : "end"} onClick={() => setIsClick(isClick => !isClick)}>Click!</SwitchBtn>
        <SvgContainer/>
          {showing ? <Box />: null}
          <SwitchBtn onClick={toggleShowing}>Click!</SwitchBtn>
      </Wrapper>
    </>
  );
}

export default App;
