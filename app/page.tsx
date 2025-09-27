import { HeroSection } from "@/components/hero-section"
import { SolutionSection } from "@/components/solution-section"
import { InteractivePredictionSection } from "@/components/interactive-prediction-section"
import { BubbleCursor } from "@/components/bubble-cursor"
import { Footer } from "@/components/footer"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function HomePage() {
  // Remove the redirect to /try - let users access the home page directly
  // const authToken = cookies().get("auth_token")?.value
  // if (!authToken) {
  //   redirect("/try")
  // }

  return (
    <div className="min-h-screen relative">
      <BubbleCursor />
      <main>
        <HeroSection />
        <SolutionSection />
        <InteractivePredictionSection />
      </main>
      <Footer />
    </div>
  )
}