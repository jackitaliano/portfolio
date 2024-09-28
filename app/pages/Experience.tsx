import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Experience() {
  return (
    <div>
      <Tabs defaultValue="nasa">
        <TabsList className="dark grid w-full grid-cols-3 bg-slate-900/60 backdrop-blur-xl text-white">
          <TabsTrigger value="nasa">NASA</TabsTrigger>
          <TabsTrigger value="statefarm">State Farm</TabsTrigger>
          <TabsTrigger value="holocron">Holocron</TabsTrigger>
        </TabsList>
        <TabsContent value="nasa">
          <Card className="bg-slate-900 text-white border-none bg-transparent">
            <CardHeader>
              <CardTitle>NASA</CardTitle>
              <CardDescription>AI/ML Intern</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <CardDescription>Jan - May 2024</CardDescription>
                <ol className='ps-6 list-disc text-sm'>
                  <li>Built WebApp for AI Aerospace research and design tool</li>
                  <li>Created developer tool in Go for interacting with OpenAI API</li>
                  <li>Represented NASA at Eclipse 2024</li>
                </ol>
              </div>
              <div className="mt-4">
                <CardDescription>Jun - Aug 2024</CardDescription>
                <ol className='ps-6 list-disc text-sm'>
                  <li>Continued work on AI WebApp</li>
                  <li>Built new candidate AI WebApp for NASA-wide use</li>
                  <li>Represented NASA at EAA AirVenture Oshkosh</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="statefarm">
          <Card className="bg-slate-900 text-white border-none bg-transparent">
            <CardHeader>
              <CardTitle>State Farm</CardTitle>
              <CardDescription>SE Intern</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <CardDescription>Jun - Aug 2023</CardDescription>
                <ol className='ps-6 list-disc text-sm'>
                  <li>Worked on migration of on-premises services to the cloud</li>
                  <li>Gained experience with AWS, Terraform, and other cloud technologies</li>
                  <li>Improved build pipelines, test coverages, and developer experience</li>
                </ol>
              </div>
              <div className="mt-4">
                <CardDescription>Aug - Dec 2023</CardDescription>
                <ol className='ps-6 list-disc text-sm'>
                  <li>Continued work part-time</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="holocron">
          <Card className="bg-slate-900 text-white border-none bg-transparent">
            <CardHeader>
              <CardTitle>Holocron</CardTitle>
              <CardDescription>ML Intern</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <CardDescription>Sep - Dec 2022</CardDescription>
                <ol className='ps-6 list-disc text-sm'>
                  <li>Researched and developed new NLP and Computer Vision techniques</li>
                  <li>Developed Aspect Based Sentiment Analysis model</li>
                  <li>Improved recognition of entities and their specific sentiment across texts</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
