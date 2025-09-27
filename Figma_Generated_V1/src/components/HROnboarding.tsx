import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { CheckCircle, Clock, Sparkles, User, Mail, Send } from 'lucide-react';

const sampleJobDescription = `Digital Marketing Manager

We are seeking an experienced Digital Marketing Manager to join our growing marketing team at SCBX Digital Ventures. The successful candidate will be responsible for developing and executing comprehensive digital marketing strategies across multiple channels.

Key Responsibilities:
- Develop and manage digital marketing campaigns across social media, email, and search platforms
- Analyze campaign performance using Google Analytics, Facebook Analytics, and other tools
- Create engaging content for various digital platforms
- Manage marketing automation workflows and lead nurturing campaigns
- Collaborate with design team using tools like Figma for creative assets
- Track ROI and report on marketing performance to stakeholders
- Manage relationships with external vendors and agencies

Required Skills:
- 3+ years experience in digital marketing
- Proficiency in Google Analytics, Google Ads, Facebook Ads Manager
- Experience with marketing automation platforms (HubSpot preferred)
- Strong analytical skills and data-driven decision making
- Excellent communication and project management skills
- Experience with A/B testing and conversion optimization

Tools & Software Experience:
- Google Analytics, Google Ads, Facebook Ads Manager
- HubSpot or similar marketing automation platform
- Social media management tools (Hootsuite, Buffer)
- Email marketing platforms (Mailchimp, Constant Contact)
- Basic design tools knowledge (Canva, Adobe Creative Suite)
- Project management tools (Asana, Trello)`;

interface SoftwareRecommendation {
  name: string;
  category: string;
  plan: string;
  monthlyCost: number;
  reason: string;
  available: boolean;
  availableFrom?: string;
  logo: string;
}

const mockRecommendations: SoftwareRecommendation[] = [
  {
    name: 'HubSpot Marketing Hub',
    category: 'Marketing Automation',
    plan: 'Professional',
    monthlyCost: 890,
    reason: 'Essential for marketing automation workflows and lead nurturing campaigns',
    available: true,
    availableFrom: 'SCB TechX Enterprise Plan',
    logo: '🔶'
  },
  {
    name: 'Google Analytics 360',
    category: 'Analytics',
    plan: 'Enterprise',
    monthlyCost: 0,
    reason: 'Required for campaign performance analysis and ROI tracking',
    available: true,
    availableFrom: 'Group-wide license',
    logo: '📊'
  },
  {
    name: 'Google Ads',
    category: 'Advertising',
    plan: 'Standard',
    monthlyCost: 0,
    reason: 'Digital advertising campaign management',
    available: true,
    availableFrom: 'Shared account access',
    logo: '🎯'
  },
  {
    name: 'Figma Professional',
    category: 'Design',
    plan: 'Professional',
    monthlyCost: 15,
    reason: 'Collaboration with design team for creative assets',
    available: true,
    availableFrom: 'SCBX Innovation Plan',
    logo: '🎨'
  },
  {
    name: 'Asana Business',
    category: 'Project Management',
    plan: 'Business',
    monthlyCost: 25,
    reason: 'Project management and task coordination',
    available: false,
    logo: '✅'
  },
  {
    name: 'Hootsuite Professional',
    category: 'Social Media',
    plan: 'Professional',
    monthlyCost: 99,
    reason: 'Social media management and scheduling',
    available: false,
    logo: '📱'
  },
  {
    name: 'Microsoft Office 365',
    category: 'Productivity',
    plan: 'E5',
    monthlyCost: 0,
    reason: 'Standard productivity suite for documentation and communication',
    available: true,
    availableFrom: 'Group-wide license',
    logo: '📋'
  }
];

export function HROnboarding() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzedRole, setAnalyzedRole] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<SoftwareRecommendation[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalyzedRole('Digital Marketing Manager');
    setRecommendations(mockRecommendations);
    setSelectedSoftware(mockRecommendations.map(rec => rec.name));
    setIsAnalyzing(false);
  };

  const handleSubmitRequests = async () => {
    setIsSubmitting(true);
    
    // Simulate request submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const toggleSoftware = (softwareName: string) => {
    setSelectedSoftware(prev => 
      prev.includes(softwareName) 
        ? prev.filter(s => s !== softwareName)
        : [...prev, softwareName]
    );
  };

  const totalMonthlyCost = recommendations
    .filter(rec => selectedSoftware.includes(rec.name))
    .reduce((sum, rec) => sum + rec.monthlyCost, 0);

  const availableSoftware = recommendations.filter(rec => rec.available);
  const newSoftware = recommendations.filter(rec => !rec.available);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1>Provisioning Requests Sent!</h1>
          <p className="text-gray-600 mt-2">
            All selected software provisioning requests have been sent to the respective license administrators.
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg">Request Status</h3>
              <div className="space-y-3">
                {recommendations
                  .filter(rec => selectedSoftware.includes(rec.name))
                  .map((rec) => (
                    <div key={rec.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{rec.logo}</span>
                        <div>
                          <p className="text-sm">{rec.name}</p>
                          <p className="text-xs text-gray-500">{rec.plan}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">Pending</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => {
            setJobDescription('');
            setAnalyzedRole(null);
            setRecommendations([]);
            setSelectedSoftware([]);
            setSubmitted(false);
          }}
          variant="outline"
        >
          Process Another New Hire
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1>New Hire Onboarding</h1>
        <p className="text-gray-600 mt-1">
          Automatically analyze job descriptions and recommend the right SaaS tools for new employees
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Job Description Analysis</span>
          </CardTitle>
          <CardDescription>
            Paste the job description below and our AI will recommend the appropriate SaaS package
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Job Description</label>
            <Textarea
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-40"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze & Suggest Software'}</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setJobDescription(sampleJobDescription)}
              disabled={isAnalyzing}
            >
              Use Sample Job Description
            </Button>
          </div>
        </CardContent>
      </Card>

      {analyzedRole && recommendations.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>Recommended SaaS Package for {analyzedRole}</span>
              </CardTitle>
              <CardDescription>
                Based on the job description analysis, here are the recommended software tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm text-green-600">✅ Available from Existing Licenses</h4>
                  {availableSoftware.map((software) => (
                    <div key={software.name} className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedSoftware.includes(software.name)}
                          onCheckedChange={() => toggleSoftware(software.name)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{software.logo}</span>
                            <h5 className="text-sm">{software.name}</h5>
                            <Badge variant="secondary">{software.category}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{software.reason}</p>
                          <p className="text-xs text-green-600 mt-1">
                            💰 Available from: {software.availableFrom}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm text-orange-600">🛒 Requires New Purchase</h4>
                  {newSoftware.map((software) => (
                    <div key={software.name} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedSoftware.includes(software.name)}
                          onCheckedChange={() => toggleSoftware(software.name)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{software.logo}</span>
                            <h5 className="text-sm">{software.name}</h5>
                            <Badge variant="secondary">{software.category}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{software.reason}</p>
                          <p className="text-xs text-orange-600 mt-1">
                            💸 ${software.monthlyCost}/month
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Total Monthly Cost for New Licenses</p>
                    <p className="text-2xl">${totalMonthlyCost}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{selectedSoftware.length} software tools selected</p>
                    <p>{availableSoftware.filter(s => selectedSoftware.includes(s.name)).length} from existing licenses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Submit Provisioning Requests</span>
              </CardTitle>
              <CardDescription>
                Send automated requests to license administrators for account setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">New Employee Email</label>
                <div className="flex space-x-2">
                  <Mail className="w-5 h-5 text-gray-400 mt-2" />
                  <input 
                    type="email"
                    placeholder="new.employee@scbx.com"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmitRequests}
                disabled={selectedSoftware.length === 0 || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending Requests...' : `Submit Provisioning Requests (${selectedSoftware.length} tools)`}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}