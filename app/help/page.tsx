import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, FileText } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Help & Support
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        Find answers to common questions and learn how to get the most out of our platform.
      </p>

      <Tabs defaultValue="faq" className="space-y-8">
        <TabsList>
          <TabsTrigger value="faq">
            <FileText className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="support">
            <MessageSquare className="h-4 w-4 mr-2" />
            Support
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to the most common questions about our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does copy trading work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Copy trading allows you to automatically replicate the trades of experienced traders. Here's how it works:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Browse our leaderboard to find a trader whose strategy aligns with your goals</li>
                      <li>Set up your copy trading parameters (investment amount, risk level, etc.)</li>
                      <li>Confirm your selection and connect your wallet</li>
                      <li>Our platform will automatically execute trades on your behalf whenever your selected trader makes a move</li>
                      <li>Monitor your performance and adjust your settings as needed</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What fees are involved?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Our fee structure is simple and transparent:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Platform fee: 1% of profits (only charged when you make money)</li>
                      <li>Network fees: Standard Aptos blockchain transaction fees</li>
                      <li>No subscription fees or hidden charges</li>
                    </ul>
                    <p className="mt-2">
                      We only make money when you do, aligning our interests with your success.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How is risk managed?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      We provide several risk management tools to help protect your investments:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Stop-loss settings: Automatically exit trades if losses reach a certain percentage</li>
                      <li>Maximum investment per trade: Limit how much of your capital is used in any single trade</li>
                      <li>Risk level filtering: Find traders that match your risk tolerance</li>
                      <li>Manual exit option: Take control and exit any trade at any time</li>
                      <li>AI risk assessment: Our AI evaluates traders and assigns risk scores based on their trading patterns</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How are traders ranked?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Our AI ranking system evaluates traders based on multiple factors:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Historical performance (ROI)</li>
                      <li>Win rate</li>
                      <li>Risk-adjusted returns</li>
                      <li>Consistency over time</li>
                      <li>Trading volume</li>
                      <li>Drawdown periods</li>
                    </ul>
                    <p className="mt-2">
                      This comprehensive approach ensures that top-ranked traders demonstrate sustainable success rather than just lucky streaks.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is my investment safe?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      We prioritize security in several ways:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>\

