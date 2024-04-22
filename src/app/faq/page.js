import Footer from '@/components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Page() {
  return (
    <>
      <About />
      <Footer />
    </>
  )
}
function About() {
  const docs = [
    {
      title: 'What is NHMS?',
      content:
        'NHMS, or Nutrition and Health Monitoring System, is a web-based application designed to assist individuals with chronic health conditions such as IBS and diabetes in tracking their nutrition and symptoms. ',
    },
    {
      title: 'What is the main purpose of NHMS?',
      content:
        'The main purpose of NHMS is to provide users with a comprehensive platform to create personalized profiles, input data on their health and lifestyle, and receive tailored advice on dietary adjustments to improve their chronic health conditions.',
    },
    {
      title: 'How does NHMS differ from other nutrition tracking apps?',
      content:
        'Unlike traditional calorie counting apps, NHMS focuses on the importance of micronutrients and macronutrients, especially for individuals with chronic conditions. It emphasizes essential information such as fiber, sodium, and sugar intake, which are crucial for managing these conditions effectively.',
    },
    {
      title: 'Who is the target audience for NHMS?',
      content:
        'NHMS is specifically designed for individuals with chronic health conditions such as IBS and diabetes. It aims to help these individuals manage their health and improve their quality of life through personalized nutrition and symptom tracking.',
    },
    {
      title: 'What kind of data can users input into NHMS?',
      content:
        'Users can input various types of data into NHMS, including personal physiological indicators, dietary intake, emotional state, exercise level, menstrual cycle, and symptoms related to chronic diseases such as IBS and diabetes. This data is then analyzed to provide users with tailored advice on dietary adjustments.',
    },
  ]

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-10">
      <h1 className="text-center scroll-m-20 text-[58px] font-extrabold tracking-tight lg:text-5xl max-w-[30%] leading-tight">
        Frequently asked questions
      </h1>
      <p className="text-xl text-gray-400 my-4">
        Do you need some help with something or davou have questions on some features ?
      </p>

      <Accordion type="single" collapsible className="rounded-lg bg-neutral-100 px-10 py-5 w-[50%] mt-10 transition">
        {docs.map((doc, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-bold">{doc.title}</AccordionTrigger>
            <AccordionContent>{doc.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
