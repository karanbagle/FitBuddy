/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0vAU4J2N9Xc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="w-full max-w-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <CardHeader className="flex flex-col gap-1.5">
          <CardTitle>Upload your medical history</CardTitle>
          <CardDescription>
            Please upload your medical history PDF document. Our chatbot will use this information to assist you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-white rounded-lg w-full p-12 flex flex-col items-center justify-center">
            <FileIcon className="w-12 h-12 mb-4 text-white" />
            <div className="text-center text-sm">
              <p className="font-medium">Drag and drop your file here to upload</p>
              <p className="text-gray-200">or</p>
              <Button size="sm">Choose file</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-3xl bg-gradient-to-br from-blue-500 to-green-500 text-white">
        <CardHeader className="flex flex-col gap-1.5">
          <CardTitle>Chat with our health assistant</CardTitle>
          <CardDescription>
            Ask questions about your health or symptoms. Our assistant will provide information based on your medical
            history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm text-gray-200">You</p>
                <div className="bg-white rounded-xl p-4">
                  <p>Can you tell me more about the side effects of the medication I'm taking?</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm text-gray-200">Health Assistant</p>
                <div className="bg-white rounded-xl p-4">
                  <p>
                    The most common side effects of your medication include nausea, headache, and dizziness. If you
                    experience any severe or persistent symptoms, please consult your physician.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm text-gray-200">You</p>
                <div className="bg-white rounded-xl p-4">
                  <p>What are the risk factors for diabetes?</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm text-gray-200">Health Assistant</p>
                <div className="bg-white rounded-xl p-4">
                  <p>
                    The risk factors for diabetes include obesity, lack of physical activity, poor diet, family history
                    of diabetes, and age. Maintaining a healthy lifestyle, including regular exercise and a balanced
                    diet, can help reduce the risk of developing diabetes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form className="flex items-stretch gap-2">
            <Input className="flex-1" id="message" placeholder="Type a message..." />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
