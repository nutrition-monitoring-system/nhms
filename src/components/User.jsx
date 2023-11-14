import React, { useState } from "react";
import "./User.css"; // 导入 CSS 文件
import { AiOutlinePlus } from "react-icons/ai"; // 导入加号图标
import { FaRegAddressCard } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function UserAvatar() {
  const [avatar, setAvatar] = useState("image/default-avatar.png");
  const [searchTerm, setSearchTerm] = useState("");
  const [photo, setAvatarPhoto] = useState(<FaCamera className="camera" />);

  const userInfo = {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      // 执行退出操作，例如跳转到退出页面或执行退出逻辑
      alert("You have been logged out.");
    } else {
      alert("Logout canceled.");
    }
  };

  const goToPage = () => {
    // 使用window.location.href属性或者window.location.assign方法来跳转到"http://localhost:3001/"
    window.location.href = "http://localhost:3001/";
  };
  const goToPage2 = () => {
    // 使用window.location.href属性或者window.location.assign方法来跳转到"http://localhost:3001/"
    window.location.href = "E:/大三上/NHMS/calendar.html";
  };

  const handleSearch = () => {
    // 在这里执行搜索操作，例如跳转到搜索结果页面或显示搜索结果
    console.log("开始搜索：" + searchTerm);
  };

  const items = [
    { text: "Create events" },
    { text: "Create Nutrition Plan" },
    { text: "Create Health Record Form" },
    { text: "Create workout" },
  ];

  return (
    <div className="body">
      <div className="user-avatar">
        <img
          id="avatar"
          src={avatar}
          alt="user-avatar"
          onClick={() => document.getElementById("avatar-upload").click()}
        />
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <div>
          <p>
            <strong>ID: </strong>
            <span id="user-id">{userInfo.id}</span>
          </p>
          <p>
            <strong>Name: </strong>
            <span id="user-name">{userInfo.name}</span>
          </p>
          <p>
            <strong>Email: </strong>
            <span id="user-email">{userInfo.email}</span>
          </p>
        </div>
        <img
          id="logout"
          src="/image/logout.png"
          alt="user-logout"
          onClick={confirmLogout}
        />
      </div>

      <div className="sidebar">
        {/* 添加搜索框 */}
        <div className="search-box">
          <input
            type="text"
            id="search-box"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="28"
            viewBox="0 0 96 68"
            fill="none"
            id="search"
            onClick={handleSearch}
          >
            <path
              d="M39 -4C22.467 -4 9 9.46699 9 26C9 42.533 22.467 56 39 56C46.1895 56 52.7922 53.447 57.9668 49.209L75.8789 67.1211C76.1553 67.409 76.4864 67.6389 76.8528 67.7972C77.2192 67.9556 77.6135 68.0393 78.0126 68.0433C78.4118 68.0474 78.8077 67.9718 79.1772 67.8209C79.5468 67.67 79.8825 67.447 80.1647 67.1647C80.447 66.8825 80.67 66.5468 80.8209 66.1772C80.9718 65.8077 81.0474 65.4118 81.0433 65.0126C81.0393 64.6135 80.9556 64.2192 80.7972 63.8528C80.6389 63.4864 80.409 63.1553 80.1211 62.8789L62.209 44.9668C66.447 39.7922 69 33.1895 69 26C69 9.46699 55.533 -4 39 -4ZM39 2C52.2904 2 63 12.7096 63 26C63 39.2904 52.2904 50 39 50C25.7096 50 15 39.2904 15 26C15 12.7096 25.7096 2 39 2Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="free"></div>
        {/* 你的导航链接 */}
        <a href="#section1">Blogs</a>
        <a href="#section2">Plan</a>
        <a href="#section3">Data Analytics</a>
        <a href="#section1">Health Record Form</a>
        <a href="file:///E:/%E5%A4%A7%E4%B8%89%E4%B8%8A/NHMS/calender.html">
          events
        </a>
        <a href="#section3">Change of personal information</a>
        <a href="#section1">Settings</a>
        <a href="#section2">Section 2</a>
        <a href="#section3">Section 3</a>
      </div>

      <div class="Calendar">
        <a
          class="calendar-text"
          href="file:///E:/%E5%A4%A7%E4%B8%89%E4%B8%8A/NHMS/calender.html"
        >
          Calendar
        </a>
      </div>

      <div className="Health-info">
        <p>Healthy information</p>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <div className="expand-user-info" onClick={goToPage}>
          <FaRegAddressCard className="info-icon" />
        </div>
      </div>

      <div className="Creat">
        {items.map((item, index) => (
          <div key={index} className="Creat-back">
            <p className="Creat-text">{item.text}</p>
            <AiOutlinePlus className="add1" /> {/* 使用加号图标 */}
          </div>
        ))}
      </div>

      <div className="photo">
        <div className="photo-bar">
          <p>before</p>

          <label
            htmlFor="upload-photo"
            onClick={() => document.getElementById("avatar-upload").click()}
          >
            {photo}
          </label>

          <input
            id="uploda-photo"
            type="file"
            accept="image/*"
            onChange={handlePhoto}
          />
        </div>

        <div className="photo-bar">
          <p>after</p>
          <FaCamera className="camera" />
        </div>
      </div>

      <div className="log">
        <div className="log-bar">
          <AiOutlinePlus className="add2"></AiOutlinePlus>
          <p>log Food</p>
        </div>
        <div className="log-bar">
          <AiOutlinePlus className="add2"></AiOutlinePlus>
          <p>log Water</p>
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
