import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useDomEvent, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import SvgContainer from './SvgContainer';


const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  `;

  const Container = styled(motion.div)`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 20px;
  `

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 15px;
  font-size: 28px;
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


const test = {
  start: {
    translateX:-300,
    rotate: 0,
    // transition: {
    //   type:"spring",
    //   duration: 1,
    // }
  },
  end: {
    translateX:300,
    rotate: 360,
    // transition: {
    //   type:"spring",
    //   duration: 1,
    // }
  },
}

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
}

const box = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0
  }
}

function App() {

  const [isClick, setIsClick] = useState(false);
  const [showing, setShowing] = useState(false);
  const [visible, setVisible] = useState(1);

  const toggleShowing = () => setShowing(prev => !prev)
  const nextPlease = () => setVisible(prev => prev === 10 ? 1 : prev + 1)
  
  const translateX = useMotionValue(0);
  const color = useTransform(translateX, [-300, 300], ["rgba(255, 149, 88, 1)", "rgba(76, 81, 117, 1)"])

  const temp = [1,2,3,4,5,6,7,8,9,10]

  return (
    <>
      <Wrapper>
        <Box variants={test} style={{translateX}} animate={isClick ? "start" : "end"}  drag="x" dragSnapToOrigin />
        <SwitchBtn variants={btnVariants} style={{color}} animate={isClick ? "start" : "end"} onClick={() => setIsClick(isClick => !isClick)}>Click!</SwitchBtn>
        <SvgContainer/>
        <AnimatePresence>{showing ? <Box variants={boxVariants} initial="initial" animate="visible" exit="leaving"/>: null}</AnimatePresence>
        <SwitchBtn onClick={toggleShowing}>Click!</SwitchBtn>
        <Container>
          <AnimatePresence>
            { temp.map(number => number === visible ? (
              <Box variants={box} initial="invisible" animate="visible" exit="exit" key={number}>{number}</Box>
            ) : null )}
          </AnimatePresence>
        </Container>
          <button onClick={nextPlease}>next</button>
      </Wrapper>
    </>
  );
}

export default App;
