import Footer from '@/components/Footer'

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
      title: 'NHMS - A Companion for Chronic Health Management',
      content:
        'NHMS, short for Nutrition and Health Monitoring System, is the result of Team Delta’s year-long software engineering project at the University of Aberdeen. This web-based application is designed to assist individuals with chronic health conditions such as IBS and diabetes in tracking their nutrition and symptoms.',
    },
    {
      title: 'Tailored Nutrition and Symptom Tracking',
      content:
        'The NHMS application is developed to provide a comprehensive platform for users to create personalized profiles and input data on their health and lifestyle. The system analyzes this data to offer tailored advice on dietary adjustments. The data inputs include personal physiological indicators, dietary intake, emotional state, exercise level, menstrual cycle, and chronic disease symptoms.',
    },
    {
      title: 'Beyond Calorie Counting - Focusing on Nutrient Value',
      content:
        'Dr. Monika Gostic, from the School of Medicine, Medical Sciences and Nutrition at the University of Aberdeen, commissioned NHMS with the specific need to cater to individuals with chronic diseases. The application goes beyond traditional calorie counting by emphasizing the importance of micronutrients and macronutrients, especially for those with chronic conditions. It highlights essential information such as fiber, sodium, and sugar intake, which are crucial for managing these conditions effectively.',
    },
  ]

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">About</h1>
      <p className="text-xl text-gray-400 my-4">Enhancing Wellness Through Data-Driven Nutrition Tracking</p>
      {docs.map((doc, i) => (
        <>
          <h2
            key={i + 'title'}
            className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          >
            {doc.title}
          </h2>
          <p key={i + 'content'} className="leading-7 [&:not(:first-child)]:mt-6 max-w-[50%]">
            {doc.content}
          </p>
        </>
      ))}
    </div>
  )
}
