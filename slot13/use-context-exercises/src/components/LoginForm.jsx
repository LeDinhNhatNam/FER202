import React, { useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Initial state cho form
const initialState = {
  email: '',
  password: ''
};

// Reducer quản lý form state
function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.value };
    case 'SET_PASSWORD':
      return { ...state, password: action.value };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

function LoginForm() {
  // Sử dụng useReducer cho form
  const [state, dispatch] = useReducer(loginReducer, initialState);
  
  // Sử dụng AuthContext
  const { login, loading, error, isAuthenticated, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!state.email || !state.password) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Sử dụng login từ AuthContext
    const result = await login(state.email, state.password);
    
    if (result.success) {
      alert(`✅ Đăng nhập thành công! Chào mừng ${result.user.username}`);
      dispatch({ type: 'CLEAR' });
    } else {
      alert(`❌ ${result.error}`);
    }
  };

  // Hiển thị thông tin user nếu đã đăng nhập
  if (isAuthenticated && user) {
    return (
      <div>
        <h3>🎉 Đăng nhập thành công!</h3>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <button onClick={() => window.location.reload()}>Đăng nhập lại</button>
      </div>
    );
  }

  return (
    <div>
      <h3>🔐 Exercise 2: AuthContext Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', value: e.target.value })}
            placeholder="Nhập email"
          />
        </div>
        <br />
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', value: e.target.value })}
            placeholder="Nhập password"
          />
        </div>
        <br />

        {error && (
          <div style={{ color: 'red' }}>
            ❌ {error}
          </div>
        )}
        
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Đang đăng nhập...' : '🚀 Đăng nhập'}
        </button>
        
        <hr />
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          <strong>💡 Mock Data:</strong><br />
          ✅ Admin: admin@example.com / 123456<br />
          ❌ User: user1@example.com / 123456 (Chỉ admin được phép)<br />
          ❌ Locked: user2@example.com / 123456 (Tài khoản bị khóa)
        </div>
      </form>
    </div>
  );
}

export default LoginForm;