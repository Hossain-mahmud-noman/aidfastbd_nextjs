'use client'

import { FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../../form/input";
import { Form } from "antd";

const Contact = () => {
   const [form] = Form.useForm(); // ✅ use correct destructuring

   const handleSubmit = async (values) => {
      console.log(values);
   };

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 bg-[url('/home/contact/bg.png')] bg-no-repeat bg-cover bg-center">
         <div className="flex items-center xl:gap-[94px] lg:gap-8 gap-5 aid-container py-10 lg:py-16 xl:py-20">
            {/* Left Content */}
            <div className="flex-1">
               <h1 className="text-white heading1">Contact Us</h1>
               <p className="text-white description2 mt-2 max-w-[477px]">
                  Write your question or inquiry below and provide as much detail as
                  possible. We will get back to you as soon as possible.
               </p>
            </div>

            {/* Right Form Card */}
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
                     <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                        <FormInput
                           name="name"
                           label="Name"
                           required
                           className="w-full"
                        />
                        <FormInput
                           name="email"
                           label="Email"
                           isEmail={true}
                           className="w-full"
                           required
                        />
                     </div>
                     <FormInput
                        name="subject"
                        label="Subject"
                        className="w-full"
                        required
                     />
                     <FormInput
                        name="message"
                        label="Message"
                        required
                        textArea={true}
                        rows={5}
                        className="mt-4 w-full"
                     />
                     <button href="tel: 01980445424" className="bg-[#1087EF]  px-6 py-3 rounded-[12px] description1 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
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
