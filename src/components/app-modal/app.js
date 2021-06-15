import React, { useEffect, useRef, useState } from 'react';
import appStyles from './app.module.css';
import { ReactComponent as AsteriskImage } from '../../images/asterisk.svg';

import Form from '../form/form';
import Modal from '../modal/modal';

const App = () => {
    const [visible, setVisible] = React.useState(false);
    
    
    const openModal = (e) => {
       setVisible(true);
       console.log(111);
       e.stopPropagation();
    } 

    const openModal2 = () => {
        // setVisible(true);
        console.log(222);
     } 

    const closeModal = () => {
        setVisible(false)
    }

    const captureModal = (e) => {
        e.stopPropagation();
        console.log('!!!');
    }

    const modal = (
        <Modal header="Внимание!" onClose={closeModal}> 
            <p>Спасибо за внимание!</p>
            <p>Открывай меня, если станет скучно :)</p>
        </Modal>
    );

    const buttonRef = React.createRef();
    
    // React.useEffect(() => {
    //   buttonRef.current.addEventListener('click', openModal);
    //   console.log(11);
    // }, []);

    function GameResult({points}) {
  
        const prevPointsRef = useRef();
      
        useEffect(() => {
          prevPointsRef.current = points;
        });
      
        const prevPoints = prevPointsRef.current;
      
        return <h1>Новый рекорд: {points}, Предыдущий рекорд: {prevPoints}</h1>;
      } 


    const Game = () => {
        const [points, setPoints] = useState(0);
        
        const addPoint = () => setPoints(points + 1);
        
        return (
            <>
                <button onClick={addPoint}>Добавить очко Гриффиндору</button>
                <GameResult points={points} />
            </>
        )
    }

    return (
      <main className={appStyles.root}>
        <AsteriskImage className={appStyles.asterisk}/>
        <AsteriskImage className={appStyles.asterisk}/>
        <AsteriskImage className={appStyles.asterisk}/>
        <AsteriskImage className={appStyles.asterisk}/>
        <Form />
        <Game />
        <div style={{overflow: 'hidden'}} onClick={openModal2} onClickCapture={captureModal}>
            <button
            onClick={openModal}
            ref={buttonRef}
             >Открыть модальное окно</button>
            {visible && modal}
        </div>
      </main>
    );

}

export default App;
