//ToggleComponent.jsx is a functional component that uses the useReducer hook to manage toggle state.
import React, { useReducer } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { 
  isOn: false,
  message: 'Trạng thái: TẮT'
};

// 2. Định nghĩa hàm reducer
function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        isOn: !state.isOn,
        message: !state.isOn ? 'Trạng thái: BẬT' : 'Trạng thái: TẮT'
      };
    case 'TURN_ON':
      return {
        isOn: true,
        message: 'Trạng thái: BẬT'
      };
    case 'TURN_OFF':
      return {
        isOn: false,
        message: 'Trạng thái: TẮT'
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function ToggleComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  // Action handlers
  const toggle = () => dispatch({ type: 'TOGGLE' });
  const turnOn = () => dispatch({ type: 'TURN_ON' });
  const turnOff = () => dispatch({ type: 'TURN_OFF' });
  const reset = () => dispatch({ type: 'RESET' });

  // Style cho component
  const containerStyle = {
    padding: '20px',
    border: '2px solid #dee2e6',
    borderRadius: '10px',
    backgroundColor: state.isOn ? '#d4edda' : '#f8d7da',
    transition: 'background-color 0.3s ease'
  };

  const statusStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: state.isOn ? '#155724' : '#721c24',
    marginBottom: '20px'
  };

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  return (
    <div style={containerStyle}>
      <h2 className="text-center mb-3">Bật/Tắt Trạng Thái</h2>
      
      {/* Hiển thị trạng thái hiện tại */}
      <div className="text-center mb-4">
        <Badge 
          bg={state.isOn ? 'success' : 'danger'} 
          style={{ fontSize: '18px', padding: '10px 20px' }}
        >
          {state.message}
        </Badge>
      </div>

      {/* Biểu tượng trực quan */}
      <div className="text-center mb-4">
        <div 
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: state.isOn ? '#28a745' : '#dc3545',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
        >
          {state.isOn ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* Các nút điều khiển */}
      <div className="text-center">
        <Button
          onClick={toggle}
          variant={state.isOn ? 'warning' : 'success'}
          style={{ ...buttonStyle, marginRight: '10px' }}
        >
          {state.isOn ? 'Tắt' : 'Bật'}
        </Button>
        
        <Button
          onClick={turnOn}
          variant="success"
          style={{ ...buttonStyle, marginRight: '10px' }}
          disabled={state.isOn}
        >
          Bật
        </Button>
        
        <Button
          onClick={turnOff}
          variant="danger"
          style={{ ...buttonStyle, marginRight: '10px' }}
          disabled={!state.isOn}
        >
          Tắt
        </Button>
        
        <Button
          onClick={reset}
          variant="secondary"
          style={buttonStyle}
        >
          Reset
        </Button>
      </div>

      {/* Thông tin chi tiết */}
      <div className="mt-4 text-center">
        <small className="text-muted">
          Sử dụng useReducer để quản lý trạng thái bật/tắt với nhiều action khác nhau
        </small>
      </div>
    </div>
  );
}

export default ToggleComponent;