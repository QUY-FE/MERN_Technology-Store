"use client";
import Button from "#/components/Button";
import { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";
import { toast } from "react-toastify";

export default function Contact() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        if( email.length || username.length ||  phoneNumber.length  || description.length > 0) {
            console.log({
                email,
                username,
                phoneNumber,
                description,
            })
            toast.success('Chúng tôi sẽ sớm phản hồi lại');
        } else {
            toast.error('Bạn chưa nhập đầy đủ thông tin vào form')
        }

    }


  return (
    <section className="max-w-[1200px] mx-auto flex justify-center gap-6 mt-20">
      {/* Thông tin liên hệ */}
      <div className="w-4/12 h-[500px] shadow-2xl rounded-2xl px-8 py-12 flex flex-col justify-between">
        <div>
          <h1 className="mb-4 text-2xl font-semibold flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#e34646] rounded-full text-white">
              <FaPhone />
            </span>
            Gọi cho chúng tôi
          </h1>
          <p className="mb-2 text-sm">Chúng tôi luôn nghe 24/7 và 7 ngày một tuần</p>
          <p className="mb-2">Số điện thoại: +84366367588</p>
        </div>
        <div>
          <h1 className="mb-4 text-2xl font-semibold flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#e34646] rounded-full text-white">
              <TbMail />
            </span>
            Gửi tin nhắn
          </h1>
          <p className="mb-2 text-sm">Chúng tôi sẽ kiểm tra tin và phản hồi lại trong 24h</p>
          <p className="mb-2">Email: helpme@gmail.com</p>
          <span>or</span>
          <p className="mb-2">Email: needtohelp@gmail.com</p>
        </div>
      </div>
      {/* Form liên hệ */}
      <form
        method="post"
        onSubmit={e => handleSubmit(e)}
        className="w-8/12 h-[500px] shadow-2xl rounded-2xl px-8 py-10 flex flex-col"
      >
        <h1 className="text-2xl mb-4 font-semibold text-black/90">
          Nhập thông tin của bạn
        </h1>
        <ul className="flex items-center justify-between gap-4 mb-6">
          <li className="w-[200px] rounded-lg">
            <label htmlFor="email" className="text-sm font-semibold text-black/80">Nhập email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="vd:user1@gmail.com"
              className="w-full h-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5"
            />
          </li>
          <li className="w-[200px] rounded-lg">
            <label htmlFor="" className="text-sm font-semibold text-black/80">Nhập họ tên</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Nguyễn văn A"
              className="w-full h-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5"
            />
          </li>
          <li className="w-[200px] rounded-lg">
            <label htmlFor="" className="text-sm font-semibold text-black/80">Nhập số điện thoại</label>
            <input
              type="text"
              name="number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="03xx97xx78x9"
              className="w-full h-full pl-3 py-3 font-semibold outline-none rounded-lg bg-black/5"
            />
          </li>
        </ul>
        <div className="w-full h-[200px] mb-6 rounded-lg">
          <label htmlFor="" className="text-sm font-semibold text-black/80">Nhập nội dung</label>
          <textarea
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Nội dung cần liên hệ"
            className="w-full h-full p-3 outline-none resize-none rounded-lg bg-black/5"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" primary w={215} h={56} text="Gửi" />
        </div>
      </form>
    </section>
  );
}