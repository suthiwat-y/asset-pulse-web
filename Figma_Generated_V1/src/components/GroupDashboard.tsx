import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Building2, Calendar } from 'lucide-react';

const subsidiarySpendData = [
  { name: 'SCB TechX', spend: 420000 },
  { name: 'Digital Ventures', spend: 380000 },
  { name: 'Abacus', spend: 320000 },
  { name: 'SCB Securities', spend: 290000 },
  { name: 'SCB Asset Management', spend: 240000 },
  { name: 'SCB Life Assurance', spend: 210000 },
  { name: 'SCB Julius Baer', spend: 180000 },
  { name: 'SCBX Innovation', spend: 150000 },
  { name: 'SCB 10X', spend: 120000 },
  { name: 'Other Subsidiaries', spend: 100000 }
];

const functionSpendData = [
  { name: 'Engineering', value: 890000, color: '#3B82F6' },
  { name: 'Sales & Marketing', value: 650000, color: '#EF4444' },
  { name: 'Data & Analytics', value: 520000, color: '#10B981' },
  { name: 'HR & Operations', value: 340000, color: '#F59E0B' },
  { name: 'Finance', value: 210000, color: '#8B5CF6' },
  { name: 'Legal & Compliance', value: 120000, color: '#6B7280' }
];

const consolidationOpportunities = [
  {
    opportunity: 'Project Management Tools',
    currentTools: 'Jira, Asana, Monday.com',
    affectedSubsidiaries: 8,
    annualSavings: 125000,
    priority: 'High'
  },
  {
    opportunity: 'Communication Platforms',
    currentTools: 'Slack, Microsoft Teams, Discord',
    affectedSubsidiaries: 6,
    annualSavings: 89000,
    priority: 'High'
  },
  {
    opportunity: 'Design & Prototyping',
    currentTools: 'Figma, Sketch, Adobe XD',
    affectedSubsidiaries: 5,
    annualSavings: 67000,
    priority: 'Medium'
  },
  {
    opportunity: 'Document Management',
    currentTools: 'Notion, Confluence, SharePoint',
    affectedSubsidiaries: 7,
    annualSavings: 54000,
    priority: 'Medium'
  },
  {
    opportunity: 'Analytics & BI',
    currentTools: 'Tableau, PowerBI, Looker',
    affectedSubsidiaries: 4,
    annualSavings: 43000,
    priority: 'Low'
  }
];

const upcomingRenewals = [
  { app: 'Salesforce Enterprise', subsidiary: 'SCB TechX', amount: 89000, daysUntil: 12 },
  { app: 'Microsoft 365 E5', subsidiary: 'Multiple', amount: 156000, daysUntil: 28 },
  { app: 'Jira Software', subsidiary: 'Digital Ventures', amount: 23000, daysUntil: 45 },
  { app: 'Figma Organization', subsidiary: 'SCBX Innovation', amount: 18000, daysUntil: 67 },
  { app: 'AWS Enterprise Support', subsidiary: 'SCB 10X', amount: 34000, daysUntil: 78 }
];

export function GroupDashboard() {
  const totalSpend = subsidiarySpendData.reduce((sum, item) => sum + item.spend, 0);
  const totalPotentialSavings = consolidationOpportunities.reduce((sum, item) => sum + item.annualSavings, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Group CTO Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Complete visibility into SaaS spending across all 10 SCBX subsidiaries
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm">September 26, 2025 • 14:30 ICT</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Group SaaS Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${(totalSpend / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Annual recurring revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Potential Annual Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">${(totalPotentialSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              Through consolidation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Subsidiaries</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">10</div>
            <p className="text-xs text-muted-foreground">
              Using 247 unique SaaS products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Upcoming Renewals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5</div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consolidation Opportunities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Consolidation Opportunities</CardTitle>
            <CardDescription>
              Ranked by potential annual savings and impact across subsidiaries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consolidationOpportunities.map((opp, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        opp.priority === 'High' ? 'bg-red-500' : 
                        opp.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <h4 className="text-sm">{opp.opportunity}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{opp.currentTools}</p>
                    <p className="text-xs text-gray-500">{opp.affectedSubsidiaries} subsidiaries affected</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-green-600">${(opp.annualSavings / 1000).toFixed(0)}K</div>
                    <p className="text-xs text-gray-500">annual savings</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spend by Subsidiary */}
        <Card>
          <CardHeader>
            <CardTitle>Spend by Subsidiary</CardTitle>
            <CardDescription>Annual SaaS spending breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subsidiarySpendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  fontSize={10}
                />
                <Tooltip 
                  formatter={(value) => [`$${(value as number / 1000).toFixed(0)}K`, 'Annual Spend']}
                />
                <Bar dataKey="spend" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spend by Function */}
        <Card>
          <CardHeader>
            <CardTitle>Spend by Business Function</CardTitle>
            <CardDescription>How SaaS budget is allocated across functions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={functionSpendData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={10}
                >
                  {functionSpendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(value as number / 1000).toFixed(0)}K`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Renewals */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Renewals (Next 90 Days)</CardTitle>
            <CardDescription>
              Contract renewals requiring attention and potential renegotiation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingRenewals.map((renewal, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="text-sm">{renewal.app}</h4>
                    <p className="text-xs text-gray-500">{renewal.subsidiary}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">${(renewal.amount / 1000).toFixed(0)}K</div>
                    <p className={`text-xs ${
                      renewal.daysUntil <= 30 ? 'text-red-500' : 
                      renewal.daysUntil <= 60 ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                      {renewal.daysUntil} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}