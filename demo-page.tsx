"use client"

import { useState } from "react"
import AnimatedLogoSpinner from "./animated-logo-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function DemoPage() {
  const [size, setSize] = useState(136)
  const [duration, setDuration] = useState(2.5)
  const [key, setKey] = useState(0)

  const resetAnimation = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Animated Logo Spinner</CardTitle>
          <CardDescription>
            Circle fills with turquoise, then transitions to a turquoise-orange gradient
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8">
          <div className="bg-white rounded-full p-6 shadow-md">
            <AnimatedLogoSpinner key={key} size={size} duration={duration} />
          </div>

          <div className="w-full space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Size</span>
                <span className="text-sm text-gray-500">{size}px</span>
              </div>
              <Slider value={[size]} min={50} max={300} step={1} onValueChange={(value) => setSize(value[0])} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Animation Duration</span>
                <span className="text-sm text-gray-500">{duration}s</span>
              </div>
              <Slider value={[duration]} min={1} max={5} step={0.1} onValueChange={(value) => setDuration(value[0])} />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={resetAnimation} className="w-full">
            Replay Animation
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
