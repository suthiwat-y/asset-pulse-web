import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle, ChevronLeft, ChevronRight, Building2, Users, Lightbulb, Send } from 'lucide-react';

interface SoftwareRecommendation {
  name: string;
  category: string;
  description: string;
  monthlyCostPerSeat: number;
  consolidationOpportunity?: {
    available: boolean;
    subsidiary: string;
    availableSeats: number;
    savings: number;
  };
  essential: boolean;
  logo: string;
}

const functionRecommendations: Record<string, SoftwareRecommendation[]> = {
  'customer-success': [
    {
      name: 'Salesforce Service Cloud',
      category: 'CRM',
      description: 'Customer relationship management and case tracking',
      monthlyCostPerSeat: 165,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'SCB TechX',
        availableSeats: 25,
        savings: 100
      },
      essential: true,
      logo: '☁️'
    },
    {
      name: 'Zendesk Support',
      category: 'Support',
      description: 'Customer support ticketing and knowledge base',
      monthlyCostPerSeat: 89,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'Digital Ventures',
        availableSeats: 15,
        savings: 100
      },
      essential: true,
      logo: '🎧'
    },
    {
      name: 'Slack Business+',
      category: 'Communication',
      description: 'Team communication and collaboration',
      monthlyCostPerSeat: 15,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'Group-wide license',
        availableSeats: 50,
        savings: 100
      },
      essential: true,
      logo: '💬'
    },
    {
      name: 'Tableau Creator',
      category: 'Analytics',
      description: 'Customer data analysis and reporting dashboards',
      monthlyCostPerSeat: 75,
      essential: false,
      logo: '📊'
    },
    {
      name: 'Calendly Teams',
      category: 'Scheduling',
      description: 'Customer meeting scheduling and coordination',
      monthlyCostPerSeat: 16,
      essential: false,
      logo: '📅'
    }
  ],
  'marketing': [
    {
      name: 'HubSpot Marketing Hub',
      category: 'Marketing Automation',
      description: 'Email campaigns, lead nurturing, and marketing analytics',
      monthlyCostPerSeat: 890,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'SCB TechX',
        availableSeats: 10,
        savings: 100
      },
      essential: true,
      logo: '🔶'
    },
    {
      name: 'Google Analytics 360',
      category: 'Analytics',
      description: 'Website traffic analysis and conversion tracking',
      monthlyCostPerSeat: 0,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'Group-wide license',
        availableSeats: 999,
        savings: 100
      },
      essential: true,
      logo: '📈'
    },
    {
      name: 'Figma Professional',
      category: 'Design',
      description: 'Design collaboration for marketing materials',
      monthlyCostPerSeat: 15,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'SCBX Innovation',
        availableSeats: 20,
        savings: 100
      },
      essential: true,
      logo: '🎨'
    },
    {
      name: 'Hootsuite Professional',
      category: 'Social Media',
      description: 'Social media management and scheduling',
      monthlyCostPerSeat: 99,
      essential: false,
      logo: '📱'
    }
  ],
  'engineering': [
    {
      name: 'Jira Software',
      category: 'Project Management',
      description: 'Agile project management and issue tracking',
      monthlyCostPerSeat: 14,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'Digital Ventures',
        availableSeats: 50,
        savings: 100
      },
      essential: true,
      logo: '🎯'
    },
    {
      name: 'GitHub Enterprise',
      category: 'Development',
      description: 'Code repository and collaboration platform',
      monthlyCostPerSeat: 21,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'SCB TechX',
        availableSeats: 30,
        savings: 100
      },
      essential: true,
      logo: '🐙'
    },
    {
      name: 'Slack Business+',
      category: 'Communication',
      description: 'Developer team communication',
      monthlyCostPerSeat: 15,
      consolidationOpportunity: {
        available: true,
        subsidiary: 'Group-wide license',
        availableSeats: 50,
        savings: 100
      },
      essential: true,
      logo: '💬'
    },
    {
      name: 'Docker Business',
      category: 'Development',
      description: 'Containerization and deployment tools',
      monthlyCostPerSeat: 24,
      essential: false,
      logo: '🐳'
    }
  ]
};

export function DepartmentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [departmentName, setDepartmentName] = useState('');
  const [primaryFunction, setPrimaryFunction] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const recommendations = primaryFunction ? functionRecommendations[primaryFunction] || [] : [];
  
  const totalMonthlyCost = recommendations
    .filter(rec => selectedSoftware.includes(rec.name))
    .reduce((sum, rec) => {
      const hasConsolidation = rec.consolidationOpportunity?.available;
      return sum + (hasConsolidation ? 0 : rec.monthlyCostPerSeat * parseInt(teamSize || '1'));
    }, 0);

  const totalSavings = recommendations
    .filter(rec => selectedSoftware.includes(rec.name) && rec.consolidationOpportunity?.available)
    .reduce((sum, rec) => sum + (rec.monthlyCostPerSeat * parseInt(teamSize || '1')), 0);

  const handleNext = () => {
    if (currentStep === 1 && primaryFunction) {
      // Pre-select essential software
      const essentialSoftware = recommendations
        .filter(rec => rec.essential)
        .map(rec => rec.name);
      setSelectedSoftware(essentialSoftware);
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
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

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1>Department Setup Complete!</h1>
          <p className="text-gray-600 mt-2">
            Your new {departmentName} department has been configured with the recommended SaaS tools.
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg">Setup Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Department</p>
                  <p>{departmentName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Function</p>
                  <p className="capitalize">{primaryFunction.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Team Size</p>
                  <p>{teamSize} people</p>
                </div>
                <div>
                  <p className="text-gray-600">Software Tools</p>
                  <p>{selectedSoftware.length} applications</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-600">Monthly Savings</p>
                    <p className="text-2xl text-green-600">${totalSavings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">New Costs</p>
                    <p className="text-2xl">${totalMonthlyCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => {
            setCurrentStep(1);
            setDepartmentName('');
            setPrimaryFunction('');
            setTeamSize('');
            setSelectedSoftware([]);
            setSubmitted(false);
          }}
          variant="outline"
        >
          Setup Another Department
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1>New Department Setup Wizard</h1>
        <p className="text-gray-600 mt-1">
          Set up a new department with the right SaaS tools and discover consolidation opportunities
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`flex-1 h-0.5 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Department Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Department Information</span>
            </CardTitle>
            <CardDescription>
              Tell us about your new department to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Department Name</label>
              <Input
                placeholder="e.g., Customer Success Team"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">Primary Business Function</label>
              <Select value={primaryFunction} onValueChange={setPrimaryFunction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the main function of this department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-success">Customer Success</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Expected Team Size</label>
              <Select value={teamSize} onValueChange={setTeamSize}>
                <SelectTrigger>
                  <SelectValue placeholder="How many people will be in this department?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1-2 people</SelectItem>
                  <SelectItem value="5">3-7 people</SelectItem>
                  <SelectItem value="10">8-15 people</SelectItem>
                  <SelectItem value="20">16-25 people</SelectItem>
                  <SelectItem value="30">25+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleNext}
                disabled={!departmentName || !primaryFunction || !teamSize}
                className="flex items-center space-x-2"
              >
                <span>Next: Software Recommendations</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Software Recommendations */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Recommended Software for {primaryFunction.replace('-', ' ')}</span>
            </CardTitle>
            <CardDescription>
              Select the tools your team needs. We've highlighted consolidation opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((software) => {
                const isSelected = selectedSoftware.includes(software.name);
                const hasConsolidation = software.consolidationOpportunity?.available;
                
                return (
                  <div 
                    key={software.name}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    } ${hasConsolidation ? 'bg-green-50 border-green-200' : ''}`}
                    onClick={() => toggleSoftware(software.name)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSoftware(software.name)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{software.logo}</span>
                          <h4 className="text-sm">{software.name}</h4>
                          <Badge variant="secondary">{software.category}</Badge>
                          {software.essential && <Badge variant="default">Essential</Badge>}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{software.description}</p>
                        
                        {hasConsolidation ? (
                          <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                            <p className="text-green-700 font-medium">
                              💰 Consolidation Opportunity!
                            </p>
                            <p className="text-green-600">
                              {software.consolidationOpportunity!.subsidiary} has {software.consolidationOpportunity!.availableSeats} available seats.
                              Save ${(software.monthlyCostPerSeat * parseInt(teamSize)).toLocaleString()}/month (100% cost reduction)
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 mt-2">
                            ${software.monthlyCostPerSeat}/seat/month × {teamSize} seats = ${(software.monthlyCostPerSeat * parseInt(teamSize)).toLocaleString()}/month
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Selected Tools</p>
                  <p className="text-2xl">{selectedSoftware.length}</p>
                </div>
                <div>
                  <p className="text-sm text-green-600">Monthly Savings</p>
                  <p className="text-2xl text-green-600">${totalSavings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Monthly Cost</p>
                  <p className="text-2xl">${totalMonthlyCost.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(1)}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button 
                onClick={handleNext}
                disabled={selectedSoftware.length === 0}
                className="flex items-center space-x-2"
              >
                <span>Next: Review & Submit</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review and Submit */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Review Department Setup</span>
            </CardTitle>
            <CardDescription>
              Review your selections and submit provisioning requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Department Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span>{departmentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Function:</span>
                    <span className="capitalize">{primaryFunction.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Size:</span>
                    <span>{teamSize} people</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-600 mb-2">Cost Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Savings:</span>
                    <span className="text-green-600">${totalSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Costs:</span>
                    <span>${totalMonthlyCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Net Impact:</span>
                    <span className={`font-medium ${totalSavings > totalMonthlyCost ? 'text-green-600' : 'text-gray-600'}`}>
                      ${(totalSavings - totalMonthlyCost).toLocaleString()}/month saved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-600 mb-3">Selected Software ({selectedSoftware.length} tools)</h4>
              <div className="space-y-2">
                {recommendations
                  .filter(rec => selectedSoftware.includes(rec.name))
                  .map((software) => (
                    <div key={software.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{software.logo}</span>
                        <div>
                          <p className="text-sm">{software.name}</p>
                          <p className="text-xs text-gray-500">{software.category}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        {software.consolidationOpportunity?.available ? (
                          <p className="text-green-600">Available from {software.consolidationOpportunity.subsidiary}</p>
                        ) : (
                          <p>${(software.monthlyCostPerSeat * parseInt(teamSize)).toLocaleString()}/month</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(2)}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Setup Requests'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}