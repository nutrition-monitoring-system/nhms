"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datePicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState("");

  const handleSymptomsInput = (e) => {
    console.log(e.target.value);
    let capitalised =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setCurrentSymptom(capitalised);
  };

  const handleKeyDown = (e) => {
    /* Enter the symptom. */
    if (
      e.key === "Enter" &&
      currentSymptom !== "" &&
      !symptoms.some((s) => s.name === currentSymptom)
    ) {
      console.log("Enter key pressed");
      setSymptoms([...symptoms, { name: currentSymptom, intensity: 5 }]);
      setCurrentSymptom("");
    }
  };

  const updateSymptom = (symptom, intensity) => {
    /* Update a symptom with the new intensity. */
    const updatedSymptoms = symptoms.map((s) => {
      if (s.name === symptom.name) {
        return { ...s, intensity };
      }
      return s;
    });
    setSymptoms(updatedSymptoms);
  };

  const removeSymptom = (symptom) => {
    const updatedSymptoms = symptoms.filter((s) => s.name !== symptom.name);
    setSymptoms(updatedSymptoms);
  };

  const onSubmit = () => {
    console.log("Symptoms submitted.");
    console.log(symptoms);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-4">
      <h1 className="grid place-items-center text-center font-extrabold text-[2rem]">
        What are your symptoms?
      </h1>
      <div className="flex flex-col w-full gap-3">
        <WithLabel name="Symptoms">
          <input
            type="text"
            id="Symptoms"
            placeholder="Type your main symptoms here:"
            value={currentSymptom}
            onInput={handleSymptomsInput}
            onKeyDown={handleKeyDown}
          />
        </WithLabel>
        <WithLabel name="Date">
          <input type="date" placeholder="Enter a date:" />
        </WithLabel>
      </div>

      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle>My Symptoms</CardTitle>
          <CardDescription>
            Here are the symptoms you&apos;ve entered.<br></br> Add the
            intensity below:
          </CardDescription>
          <hr></hr>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {symptoms.map((symptom, idx) => (
              /* Each item gets put into the accordion component. */
              <AccordionItem
                value={`${symptom.name}-${idx}`}
                key={`${symptom.name}-${idx}`}
              >
                <AccordionTrigger onRemove={() => removeSymptom(symptom)}>
                  {symptom.name}
                </AccordionTrigger>
                <AccordionContent>
                  <Intensity
                    value={symptom.intensity}
                    onChange={([value]) => updateSymptom(symptom, value)}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={onSubmit} disabled={symptoms.length === 0}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function WithLabel({ name, children }) {
  return (
    <div className="grid w-full max-w-xl items-center gap-1.5">
      <Label htmlFor={name}>{name}</Label>
      {children}
    </div>
  );
}

function Intensity({ onChange, value }) {
  const [intensity, setIntensity] = useState(value);
  const handleIntensityChange = (value) => {
    setIntensity(value);
    onChange && onChange(value);
  };
  return (
    <div className="grid w-full gap-2 px-4 py-2">
      <p className="font-bold">
        Intensity Strength: <span className="text-blue-500">{intensity}</span>
      </p>
      <Slider
        className="bg-black rounded-sm cursor-pointer"
        defaultValue={[intensity]}
        max={10}
        min={1}
        step={1}
        onValueChange={handleIntensityChange}
      />
    </div>
  );
}
