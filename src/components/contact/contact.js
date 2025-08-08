'use client'

import { FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../../form/input";
import { Form } from "antd";
import { FiMail } from "react-icons/fi";
import { toast, Toaster } from "sonner";

const Contact = () => {
   const [form] = Form.useForm();

   const handleSubmit = async (values) => {
      try {
         const res = await fetch("https://api.aidfastbd.com/api/Inquiries/Save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         });

         if (!res.ok) {
            throw new Error("Failed to send message");
         }

         toast.success("Thank you for reaching out! We’ll get back to you soon.");
         form.resetFields();
      } catch (error) {
         toast.error(error.message || "Something went wrong. Please try again.");
      }
   };


   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 bg-[url('/home/contact/bg.png')] bg-no-repeat bg-cover bg-center">
         <Toaster
            position="top-right"
         />
         <div className="flex flex-col md:flex-row xl:gap-[94px] lg:gap-8 gap-5 aid-container py-10 lg:py-16 xl:py-20">
            <div className="flex-1 mt-5">
               <h1 className="text-white heading1">Contact Us</h1>
               <p className="text-white description2 mt-2 max-w-[477px]">
                  Write your question or inquiry below and provide as much detail as
                  possible. We will get back to you as soon as possible.
               </p>
               <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-[30px] flex items-center gap-4">
                  <div className="bg-[#30C1EB] h-[64px] w-[64px] rounded-full flex items-center justify-center">
                     <FiMail size={30} className="w-full text-white z-50" />
                  </div>
                  <div>
                     <p className="description1 text-white">Email</p>
                     <p className="description2 text-white">aidfast@gmail.com</p>
                  </div>
               </div>
            </div>

            <div className="flex-1 shadow-custom-light bg-white rounded-lg lg:rounded-2xl xl:rounded-[24px] xl:p-10 lg:p-6 p-5">
               <h4 className="heading3 text-[#1A1A1A]">
                  {"Request a quote — let's work together!"}
               </h4>
               <p className="description1 text-[#494949] mt-3 lg:mt-4">
                  {
                     "Whether you need a custom solution or just have a question — we’re always here for you. Send us a message now."
                  }
               </p>
               <div className="mt-5 lg:mt-6 w-full">
                  <Form layout="vertical" form={form} onFinish={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 w-full">
                        <FormInput
                           name="name"
                           label="Name"
                           required
                           placeholder={"Input Name"}
                           className="w-full rounded-xl bg-transparent p-3 dashinput focus:outline-primary"
                        />
                        <FormInput
                           name="email"
                           label="Email"
                           required
                           isEmail={true}
                           className="w-full rounded-xl bg-transparent p-3 dashinput focus:outline-primary"
                           placeholder={"Input Email"}
                        />
                     </div>
                     <FormInput
                        name="subject"
                        label="Subject"
                        required
                        className="w-full rounded-xl bg-transparent p-3 dashinput focus:outline-primary"
                        placeholder={"Input Subject"}
                     />
                     <FormInput
                        name="message"
                        label="Message"
                        placeholder="Type your message"
                        required
                        textArea={true}
                        rows={5}
                        className="mt-4 w-full rounded-xl bg-transparent p-3 dashinput focus:outline-primary"
                     />
                     <button type="submit" href="tel: 01980445424" className="bg-[#1087EF]  px-6 py-3 rounded-[12px] description1 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                        <p className="description2 text-white">Sent Message</p>
                        <FaArrowRightLong className="text-white description2" />
                     </button>
                  </Form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Contact;
