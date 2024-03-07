'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/datePicker'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import './main.css'

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState([])
  const [currentSymptom, setCurrentSymptom] = useState('')

  const handleSymptomsInput = e => {
    console.log(e.target.value)
    setCurrentSymptom(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && currentSymptom !== '' && !symptoms.some(s => s.name === currentSymptom)) {
      console.log('Enter key pressed')
      setSymptoms([...symptoms, { name: currentSymptom, intensity: 5 }])
      setCurrentSymptom('')
    }
  }

  const updateSymptom = (symptom, intensity) => {
    const updatedSymptoms = symptoms.map(s => {
      if (s.name === symptom.name) {
        return { ...s, intensity }
      }
      return s
    })
    setSymptoms(updatedSymptoms)
  }

  const removeSymptom = symptom => {
    const updatedSymptoms = symptoms.filter(s => s.name !== symptom.name)
    setSymptoms(updatedSymptoms)
  }

  const onSubmit = () => {
    console.log('Symptoms submitted')
    console.log(symptoms)
  }

  return (
    <div className="flex justify-center items-center flex-col gap-10 py-4 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">What are your symptoms?</h1>

      <WithLabel name="Symptoms">
        <Input
          type="text"
          id="Symptoms"
          placeholder="Type your main symptom here..."
          value={currentSymptom}
          onInput={handleSymptomsInput}
          onKeyDown={handleKeyDown}
        />
      </WithLabel>
      <WithLabel name="Date">
        <DatePicker placeholder="Select a date" />
      </WithLabel>

      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>My Symptoms</CardTitle>
          <CardDescription>Here are the symptoms you've entered</CardDescription>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem> */}
            {symptoms.map((symptom, idx) => (
              <AccordionItem value={`${symptom.name}-${idx}`} key={`${symptom.name}-${idx}`}>
                <AccordionTrigger onRemove={() => removeSymptom(symptom)}>{symptom.name}</AccordionTrigger>
                <AccordionContent>
                  <Intensity value={symptom.intensity} onChange={([value]) => updateSymptom(symptom, value)} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div />
          <Button onClick={onSubmit} disabled={symptoms.length === 0}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function WithLabel({ name, children }) {
  return (
    <div className="grid w-full max-w-xl items-center gap-1.5">
      <Label htmlFor={name}>{name}</Label>
      {children}
    </div>
  )
}

function Intensity({ onChange, value }) {
  const [intensity, setIntensity] = useState(value)
  const handleIntensityChange = value => {
    setIntensity(value)
    onChange && onChange(value)
  }
  return (
    <div className="w-full py-2 px-4 grid gap-2">
      <p className="font-bold">
        Result Strength: <span className="text-blue-500">{intensity}</span>
      </p>
      <Slider
        className="cursor-pointer"
        defaultValue={[intensity]}
        max={10}
        min={1}
        step={1}
        onValueChange={handleIntensityChange}
      />
    </div>
  )
}
