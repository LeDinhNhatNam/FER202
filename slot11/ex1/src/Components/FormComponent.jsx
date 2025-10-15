//FormComponent.jsx use State to create a form with input fields for name and email, and a submit button that displays the entered values below the form
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function FormComponent() {
    //Khởi tạo state là 1 đối tượng user với các trường name và email, khởi tạo giá trị ban đầu là tên traltb và email là traltb@fe.edu.vn
    const [user, setUser] = useState({ name: 'traltb', email: 'traltb@fe.edu.vn' });
    //Hàm để xử lý thay đổi của user trong các input fields name và email  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); //Cập nhật trường tương ứng trong đối tượng user
    }
    //Hàm để xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault(); //Ngăn chặn reload trang
        //dùng alert để hiển thị thông tin user
        alert(`Tên: ${user.name}\nEmail: ${user.email}`);
    }
return (
    <div
        style={{
            maxWidth: '95vw',
            width: '440px',
            margin: '5vw auto',
            padding: '6vw 5vw',
            border: '1px solid #e0e0e0',
            borderRadius: '18px',
            background: 'linear-gradient(135deg,#fafcff 80%,#e3f2fd 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            boxSizing: 'border-box'
        }}
    >
        <h3
            style={{
                textAlign: 'center',
                color: '#1976d2',
                marginBottom: '6vw',
                fontWeight: '800',
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                letterSpacing: '1px'
            }}
        >
            Form Thông Tin Người Dùng
        </h3>
        <Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formName" style={{ marginBottom: '24px' }}>
    <Form.Label
        style={{
            fontWeight: '600',
            fontSize: 'clamp(15px, 3vw, 17px)',
            marginBottom: '8px',
            display: 'block',
            color: '#222'
        }}
    >
        Tên:
    </Form.Label>
    <Form.Control
        type='text'
        name='name'
        value={user.name}
        placeholder='Nhập vào name:'
        onChange={handleChange}
        style={{
            borderRadius: '10px',
            border: '2px solid #2196f3',
            padding: '12px 16px',
            fontSize: 'clamp(16px, 4vw, 18px)',
            background: '#fff',
            marginBottom: '0',
            boxShadow: '0 2px 8px rgba(33,150,243,0.08)',
            transition: 'border-color 0.2s',
            outline: 'none',
            width: '100%'
        }}
    />
</Form.Group>
<Form.Group className="mb-3" controlId="formEmail" style={{ marginBottom: '24px' }}>
    <Form.Label
        style={{
            fontWeight: '600',
            fontSize: 'clamp(15px, 3vw, 17px)',
            marginBottom: '8px',
            display: 'block',
            color: '#222'
        }}
    >
        Email:
    </Form.Label>
    <Form.Control
        type='email'
        name='email'
        value={user.email}
        placeholder='Nhập vào email:'
        onChange={handleChange}
        style={{
            borderRadius: '10px',
            border: '2px solid #2196f3',
            padding: '12px 16px',
            fontSize: 'clamp(16px, 4vw, 18px)',
            background: '#fff',
            marginBottom: '0',
            boxShadow: '0 2px 8px rgba(33,150,243,0.08)',
            transition: 'border-color 0.2s',
            outline: 'none',
            width: '100%'
        }}
    />
</Form.Group>
            <Button
                variant='primary'
                type='submit'
                style={{
                    width: '100%',
                    padding: '12px',
                    fontWeight: 'bold',
                    fontSize: 'clamp(16px, 4vw, 18px)',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#1976d2',
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
                    marginTop: '10px',
                    letterSpacing: '1px'
                }}
            >
                Gửi
            </Button>
        </Form>
        <div
            style={{
                marginTop: '32px',
                background: '#e3f2fd',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #bbdefb'
            }}
        >
            <h4 style={{
                color: '#1976d2',
                marginBottom: '14px',
                fontWeight: '700',
                fontSize: 'clamp(18px, 4vw, 20px)'
            }}>
                Thông Tin Người Dùng:
            </h4>
            <p style={{ fontSize: 'clamp(15px, 3vw, 17px)' }}><strong>Tên:</strong> {user.name}</p>
            <p style={{ fontSize: 'clamp(15px, 3vw, 17px)' }}><strong>Email:</strong> {user.email}</p>
        </div>
    </div>
);
}
export default FormComponent;
