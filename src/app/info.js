import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Modal, Form, Input, Select, Radio } from "antd";


function UserInfo(props) {

  const { firstname, secondname, age, gender, height, weight, history } = props;

  const goToUser = () => {
    
    window.location.href = "http://localhost:3001/";
  };
  const [visible, setVisible] = useState(false); // 弹窗的可见性
  const [mode, setMode] = useState(""); // 弹窗的模式，分为add, edit, delete
  const [form] = Form.useForm(); // 表单的实例
  const [data, setData] = useState({ // 表单的数据
    firstname,
    secondname,
    age,
    gender,
    height,
    weight,
    history,
  });

  const userinfo = {
    width: '650px',
    height: '850px',
    position: 'absolute',
    display: 'flex',
    top: '40px',
    bottom: '40px',
    right: '563px',
    backgroundColor: '#fb923c',
    borderRadius: '10px',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
  };
  
  const back = {
    position: 'absolute',
    top: '50px',
    left: '330px',
    width: '50px',
    height: '50px',
    backgroundSize: 'cover',
    zIndex: '999',
    cursor: 'pointer'
  };
  

  const h1 ={
    fontFamily:'Trebuchet MS, sans-serif'
  }

  const infobar = {
    display: 'flex',
    justifyContent: 'center',
    width: '600px',
    height: '30px',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: 'white',
    marginTop: '10px',
    marginLeft: '18px',
    position: 'relative',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    fontFamily: 'Trebuchet MS, sans-serif'
  };
  

  const button = {
    width: '40px',
    height: '110px',
    position: 'absolute',
    top: '50px',
    left: '1046.5px',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    backgroundColor: '#fb923c',
    fontFamily: 'Trebuchet MS, sans-serif',
    fontSize: '0.45cm',
    borderRadius: '0 10px 10px 0'
  };
  

  const handleEdit = () => {
    // 如果弹窗不可见，说明是点击编辑按钮，显示弹窗
    if (!visible) {
        setVisible(true);
      } else {
        // 如果弹窗可见，说明是点击弹窗的确认按钮，获取表单的数据，并更新data中的对应字段
        form
          .validateFields()
          .then((values) => {
            // 验证表单的数据是否合法
            setData({ ...data, ...values }); // 合并data和values
            setVisible(false); // 关闭弹窗
            form.resetFields(); // 重置表单
          })
          .catch((error) => {
            // 处理表单的错误信息
            console.log(error);
          });
      }
  };

  const handleCancel = () => {
    // 点击弹窗的取消按钮，关闭弹窗，并重置表单
    setVisible(false);
    form.resetFields();
  };

  return (
<div>
    <div className='back' style={back}>
        <IconContext.Provider value={{ color: "balck", size: "3rem" }}>
            <FaArrowLeft onClick={goToUser}/>
        </IconContext.Provider>
        <p>back</p>
        </div>
    <div className="user-info" style={userinfo}>
        
        <h1 style={h1}>Health Information</h1>
        <div className='info-bar' style={infobar}>
            <p >Name:{firstname} {secondname}</p>
        </div>
        <div className='info-bar' style={infobar}>
            <p >Age:{age}</p>
        </div>
        <div className='info-bar' style={infobar}>
            <p >Gender:{gender}</p>
        </div>
        <div className='info-bar' style={infobar}>
            <p >Height:{height} cm</p>
        </div>
        <div className='info-bar' style={infobar}>
            <p >Weight:{weight} kg</p>
        </div>
        <div className='info-bar' style={infobar}>
            <p >History:{history}</p>
        </div>
        
        </div>
        <div className="button-bar" style={button}>
        <Button  type="primary" onClick={handleEdit}>
          E<br/>d<br/>i<br/>t
        </Button>
      </div>

      {/* 创建一个弹窗，用于显示表单 */}
      <Modal
        title="Edit Information"
        visible={visible} 
        onOk={handleEdit} 
        onCancel={handleCancel} 
      >
        {/* 创建一个表单，用于输入或显示信息 */}
        <Form
          form={form} // 设置表单的实例
          initialValues={data} // 设置表单的初始值
          labelCol={{ span: 4 }} // 设置表单的标签的宽度
          wrapperCol={{ span: 20 }} // 设置表单的输入框的宽度
        >
      
          <Form.Item
            label="Name" 
            name="firstname" 
            rules={[{ required: true, message: "Please input your name!" }]} // 设置表单项的验证规则
          >
            <Input /> 
          </Form.Item>
       
          <Form.Item
            label="Surname" 
            name="secondname" 
            rules={[{ required: true, message: "Please input your surname!" }]} // 设置表单项的验证规则
          >
            <Input  /> 
          </Form.Item>
     
          <Form.Item
            label="Age" 
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]} // 设置表单项的验证规则
          >
            <Input /> 
          </Form.Item>
         
          <Form.Item
            label="Gender" 
            name="gender" 
            rules={[{ required: true, message: "Please select your gender" }]} // 设置表单项的验证规则
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Height" 
            name="height" 
            rules={[{ required: true, message: "Please input your height!" }]} // 设置表单项的验证规则
          >
            <Input /> 
          </Form.Item>
          
          <Form.Item
            label="Weight" 
            name="weight" 
            rules={[{ required: true, message: "Please input your weight!" }]} // 设置表单项的验证规则
          >
            <Input disabled={mode === "delete"} />
            </Form.Item>

            <Form.Item
            label="History" 
            name="history" 
            rules={[{ required: true, message: "Please input your history!" }]} // 设置表单项的验证规则
          >
            <Select>
              <Select.Option value="option1">High blood pressure</Select.Option>
              <Select.Option value="option2">Diabetes</Select.Option>
              <Select.Option value="option3">Heart disease</Select.Option>
              <Select.Option value="option2">Arthritis</Select.Option>
              <Select.Option value="option2">no</Select.Option>
              <Select.Option value="option3">other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Other" 
            name="other" 
            help="Please input your other history"
            rules={[{ required: false }]} // 设置表单项的验证规则
          >
            <Input  />
            </Form.Item>
          </Form>
        </Modal>
</div>
  );
}

export default UserInfo;
