'use client'

import { FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../../../form/input";
import { Form } from "antd";
import { FiMail } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import { useI18n } from "../../../context/i18n";
import { BsWhatsapp } from "react-icons/bs";

const Contact = () => {
   const [form] = Form.useForm();
   const i18n = useI18n()

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
         <div className="flex flex-col md:flex-row xl:gap-[94px] lg:gap-8 gap-5 aid-container py-4 md:py-8 lg:py-16 xl:py-20">
            <div className="flex-1 mt-2 md:mt-3 lg:mt-5">
               <h1 className="text-white contact-heading">{i18n.t("Contact Us")}</h1>
               <p className="text-white contact-description mt-1 md:mt-2 max-w-[477px]">
                  {i18n.t("Join AidFast as a doctor or healthcare provider by filling out this form. Share your questions or suggestions—we’re committed to giving you the best care.")}
               </p>
               <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-[30px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 md:gap-3">
                     <div className="bg-[#30C1EB] w-9 h-9 md:h-[64px] md:w-[64px] rounded-full flex items-center justify-center">
                        <BsWhatsapp className="text-lg md:text-3xl lg:text-3xl w-full text-white" />
                     </div>
                     <div>
                        <p className="description2 text-white">{i18n.t("WhatsApp")}</p>
                        <p className="description2 text-white">01738548662</p>
                     </div>
                  </div>
                  <div className=" flex items-center gap-1.5 md:gap-3">
                     <div className="bg-[#30C1EB] w-9 h-9 md:h-[64px] md:w-[64px] rounded-full flex items-center justify-center">
                        <FiMail className="text-lg md:text-3xl lg:text-3xl w-full text-white" />
                     </div>
                     <div>
                        <p className="description2 text-white">{i18n.t("Email")}</p>
                        <p className="description2 text-white">aidfast@gmail.com</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 shadow-custom-light bg-white rounded-lg lg:rounded-2xl xl:rounded-[24px] xl:p-10 lg:p-6 md:p-4 p-3">
               <h4 className="contact-title text-[#1A1A1A]">
                  {i18n.t("You can provide any questions or suggestions to help improve the quality of Aidfast’s services")}
               </h4>
               <p className="contact-description1 text-[#494949] mt-2 md:mt-3 lg:mt-4">
                  {
                     i18n.t("We are committed to providing you with the highest level of sincere service")
                  }
               </p>
               <div className="mt-5 lg:mt-6 w-full">
                  <Form layout="vertical" form={form} onFinish={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:gap-3 md:gap-2 gap-0 w-full">
                        <FormInput
                           name="name"
                           label={i18n.t("Name")}
                           // required
                           placeholder={i18n.t("Input Name")}
                           className="w-full rounded-xl bg-transparent lg:p-3 p-2 dashinput focus:outline-primary"
                        />
                        <FormInput
                           name="email"
                           label={i18n.t("Email")}
                           // required
                           isEmail={true}
                           className="w-full rounded-xl bg-transparent lg:p-3 p-2 dashinput focus:outline-primary"
                           placeholder={i18n.t("Input Email")}
                        />
                     </div>
                     <FormInput
                        name="subject"
                        label={i18n.t("Phone Number")}
                        required
                        className="w-full rounded-xl bg-transparent lg:p-3 p-2 dashinput focus:outline-primary"
                        placeholder={i18n.t("Type your phone number")}
                     />
                     <div className="hidden md:block">
                        <FormInput
                           name="message"
                           label={i18n.t("Message")}
                           placeholder={i18n.t("Type your message")}
                           // required
                           textArea={true}
                           rows={5}
                           className=" mt-4 w-full rounded-xl bg-transparent lg:p-3 p-2 dashinput focus:outline-primary"
                        />
                     </div>
                     <div className="block md:hidden">
                        <FormInput
                           name="message"
                           label={i18n.t("Message")}
                           placeholder={i18n.t("Type your message")}
                           // required
                           textArea={true}
                           rows={2}
                           className=" mt-4 w-full rounded-xl bg-transparent lg:p-3 p-2 dashinput focus:outline-primary"
                        />
                     </div>
                     <button type="submit" className="bg-[#1087EF] px-6 py-3 rounded-[12px] description1 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                        <p className="description2 text-white">{i18n.t("Sent Message")}</p>
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
