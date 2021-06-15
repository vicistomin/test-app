import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("react-modals");

class Modal extends React.Component {
  render() {
    const { children, header, onClose } = this.props;
        // Возвращаем ReactDOM.createPortal, 
        // который поместит дочерние элементы в modalRoot
    return ReactDOM.createPortal(
            (
                <>
                <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'#0008'}}></div>
                <div className="Modal" style={{position:'absolute', top:'32%', left:'43%', background:'white', padding:30, borderRadius:20}}>
                    <h1 onClick={onClose}>{header}</h1>
                        {children}
                    <span onClick={onClose} style={{position:'absolute', top:20, right:20, padding:10, fontFamily:'sans-serif'}}>X</span>
                </div>
                </>
            ), 
            modalRoot
        );
  }
} 
export default Modal;