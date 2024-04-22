import Footer from '@/components/Footer'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <>
      <About />
      <Footer />
    </>
  )
}
function About() {
  return (
    <div className="min-h-full w-[90%] mx-auto flex items-center justify-center px-48 py-20 gap-20">
      <div className="flex-1 h-full flex flex-col justify-center">
        <h1 className="text-start scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl max-w-[30%] leading-tight">
          Contact Us
        </h1>
        <p className="text-xl text-gray-400 my-4 max-w-[70%]">
          Not sure what you need? The team will be happy to listen to you and suggest event ideas you hadn't considered.
        </p>
      </div>
      <div className="min-w-96 min-h-96 bg-neutral-100 rounded-lg p-10 shadow-md space-y-8">
        <h1 className="max-w-[80%] text-xl text-gray-500">We'd love to hear from you!Let's get in touch</h1>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="name">
              Name
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="email">
              Email
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex space-x-2 space-y-2 items-end">
            <div className="w-full space-y-2">
              <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="phone">
                Phone Number
              </Label>
              <Input
                className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="message">
              Message
            </Label>
            <textarea
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2"
              id="message"
              placeholder="Type your message"
              required
              rows="4"
            />
          </div>
          <Button className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
