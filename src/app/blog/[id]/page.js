import Footer from "@/components/Footer.jsx";
export default function Page({ id }) {
  // This Function Component renders different blogs based on the blog id.
  // Check the folder structure of the parent
  return (
    <>
      <div className="mx-[10rem]">
        <main className="container mx-auto py-8">
          <header className="bg-black py-10 rounded-md">
            <div className="container mx-auto text-center text-white">
              <h1 className="text-3xl font-bold text-white">
                Diabetes Management: Navigating Your Way to a Healthier You
              </h1>
            </div>
          </header>
          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-lg">
              Living with diabetes can feel overwhelming, but with the right
              knowledge and support, managing your condition becomes a more
              navigable journey. Whether you’re newly diagnosed or have been
              dealing with diabetes for years, understanding how to balance your
              lifestyle with your health needs is key to maintaining your
              well-being.
            </p>
          </section>
          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">Understanding Diabetes</h2>
            <p className="text-lg">
              Diabetes, a condition characterized by high blood sugar levels,
              comes in two main forms: Type 1, where the body fails to produce
              insulin, and Type 2, where the body cannot use insulin
              effectively. Both types require careful management of diet,
              exercise, and medication. The good news is that with proactive
              management, you can lead a full and active life.
            </p>
          </section>
          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">Dietary Management</h2>
            <ul className="list-disc pl-8">
              <li className="mb-2">
                Carbohydrate Counting: Keeping track of the carbs you eat is
                crucial because they have the biggest effect on your blood sugar
                levels. Use food labels and apps to help manage your intake.
              </li>
              <li className="mb-2">
                Balanced Meals: Incorporate a variety of foods in your meals -
                include sources of lean protein, healthy fats, and fibers. This
                not only helps manage blood sugar but also supports overall
                health.
              </li>
              <li>
                Regular Meal Times: Eating at regular times helps keep your
                blood sugar stable. Skipping meals, especially if you’re on
                medications that lower blood sugar, can lead to hypoglycemia.
              </li>
            </ul>
          </section>

          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">
              Exercise for Diabetes Control
            </h2>
            <ul className="list-disc pl-8">
              <li className="mb-2">
                Increase Physical Activity: Aim for at least 150 minutes of
                moderate-intensity exercise each week, such as brisk walking,
                swimming, or cycling.
              </li>
              <li className="mb-2">
                Monitor Your Blood Sugar: Check your levels before and after
                exercise to learn how different activities affect you.
              </li>
              <li>
                Stay Hydrated: Exercise can affect your blood glucose levels and
                your hydration status; make sure to drink plenty of water.
              </li>
            </ul>
          </section>

          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">Medication Management</h2>
            <ul className="list-disc pl-8">
              <li className="mb-2">
                Consistency is Key: Take your medication at the same times each
                day to maintain stable blood sugar levels.
              </li>
              <li className="mb-2">
                Understand Your Medication: Know what each medication does and
                how it affects your sugar levels. Don’t hesitate to ask your
                doctor or pharmacist if you’re unsure about anything.
              </li>
              <li>
                Adjust as Needed: Your medication needs might change over time,
                especially if you lose weight, change your diet, or alter your
                exercise habits. Regular check-ins with your healthcare provider
                are essential.
              </li>
            </ul>
          </section>

          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">Living with Diabetes</h2>
            <ul className="list-disc pl-8">
              <li className="mb-2">
                Mental Health: Chronic conditions can be mentally taxing.
                Consider talking to a counselor or joining a support group to
                address the emotional aspects.
              </li>
              <li className="mb-2">
                Routine Checks: Regular visits to your healthcare provider for
                blood sugar monitoring, along with yearly eye exams and regular
                foot checks, are crucial.
              </li>
              <li>
                Stay Informed: Keep up with the latest diabetes research and
                treatments. Knowledge is power, and staying informed can help
                you make better decisions about your care.
              </li>
            </ul>
          </section>

          <section className="mb-1">
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p className="text-lg">
              Managing diabetes might seem daunting, but it’s entirely possible
              to live a happy and healthy life by making informed choices about
              your lifestyle and treatment options. Remember, you’re not alone
              in this journey—millions of people live with diabetes, and with
              the right strategies and support, you can too.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Call to Action</h2>
            <p className="text-lg">
              If you found this post helpful, share it with someone who might
              benefit from it. Stay tuned for more posts on managing chronic
              conditions effectively!
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
