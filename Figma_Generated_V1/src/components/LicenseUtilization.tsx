import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserX, Calendar, AlertTriangle, CheckCircle, Filter } from 'lucide-react';

interface UserLicense {
  id: string;
  userName: string;
  userEmail: string;
  department: string;
  lastLoginDate: string;
  status: 'Active' | 'Inactive';
  daysInactive: number;
}

interface SoftwareApp {
  name: string;
  totalLicenses: number;
  activeLicenses: number;
  monthlyCostPerSeat: number;
  users: UserLicense[];
}

const mockData: Record<string, SoftwareApp> = {
  'salesforce': {
    name: 'Salesforce Enterprise',
    totalLicenses: 150,
    activeLicenses: 127,
    monthlyCostPerSeat: 165,
    users: [
      {
        id: '1',
        userName: 'John Smith',
        userEmail: 'john.smith@scbtechx.com',
        department: 'Sales',
        lastLoginDate: '2025-09-25',
        status: 'Active',
        daysInactive: 1
      },
      {
        id: '2',
        userName: 'Sarah Wilson',
        userEmail: 'sarah.wilson@scbtechx.com',
        department: 'Marketing',
        lastLoginDate: '2025-06-15',
        status: 'Inactive',
        daysInactive: 103
      },
      {
        id: '3',
        userName: 'Mike Chen',
        userEmail: 'mike.chen@scbtechx.com',
        department: 'Sales',
        lastLoginDate: '2025-05-20',
        status: 'Inactive',
        daysInactive: 129
      },
      {
        id: '4',
        userName: 'Lisa Rodriguez',
        userEmail: 'lisa.rodriguez@scbtechx.com',
        department: 'Customer Success',
        lastLoginDate: '2025-09-24',
        status: 'Active',
        daysInactive: 2
      },
      {
        id: '5',
        userName: 'David Park',
        userEmail: 'david.park@scbtechx.com',
        department: 'Sales',
        lastLoginDate: '2025-04-10',
        status: 'Inactive',
        daysInactive: 169
      },
      {
        id: '6',
        userName: 'Emma Thompson',
        userEmail: 'emma.thompson@scbtechx.com',
        department: 'Marketing',
        lastLoginDate: '2025-07-12',
        status: 'Inactive',
        daysInactive: 76
      }
    ]
  },
  'jira': {
    name: 'Jira Software',
    totalLicenses: 200,
    activeLicenses: 156,
    monthlyCostPerSeat: 14,
    users: [
      {
        id: '7',
        userName: 'Alex Johnson',
        userEmail: 'alex.johnson@scbtechx.com',
        department: 'Engineering',
        lastLoginDate: '2025-09-26',
        status: 'Active',
        daysInactive: 0
      },
      {
        id: '8',
        userName: 'Rachel Green',
        userEmail: 'rachel.green@scbtechx.com',
        department: 'Product',
        lastLoginDate: '2025-05-30',
        status: 'Inactive',
        daysInactive: 119
      },
      {
        id: '9',
        userName: 'Tom Anderson',
        userEmail: 'tom.anderson@scbtechx.com',
        department: 'Engineering',
        lastLoginDate: '2025-09-25',
        status: 'Active',
        daysInactive: 1
      }
    ]
  },
  'figma': {
    name: 'Figma Professional',
    totalLicenses: 50,
    activeLicenses: 38,
    monthlyCostPerSeat: 15,
    users: [
      {
        id: '10',
        userName: 'Jessica Wong',
        userEmail: 'jessica.wong@scbtechx.com',
        department: 'Design',
        lastLoginDate: '2025-09-26',
        status: 'Active',
        daysInactive: 0
      },
      {
        id: '11',
        userName: 'Carlos Martinez',
        userEmail: 'carlos.martinez@scbtechx.com',
        department: 'Product',
        lastLoginDate: '2025-03-15',
        status: 'Inactive',
        daysInactive: 195
      }
    ]
  }
};

export function LicenseUtilization() {
  const [selectedApp, setSelectedApp] = useState<string>('salesforce');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterDays, setFilterDays] = useState<string>('all');
  const [isDeprovisioning, setIsDeprovisioning] = useState(false);
  const [deprovisionedUsers, setDeprovisionedUsers] = useState<string[]>([]);

  const currentApp = mockData[selectedApp];
  const filteredUsers = currentApp.users.filter(user => {
    if (filterDays === 'all') return true;
    const days = parseInt(filterDays);
    return user.daysInactive >= days;
  });

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeprovision = async () => {
    setIsDeprovisioning(true);
    
    // Simulate deprovisioning
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDeprovisionedUsers(prev => [...prev, ...selectedUsers]);
    setSelectedUsers([]);
    setIsDeprovisioning(false);
  };

  const inactiveUsers = filteredUsers.filter(user => 
    user.status === 'Inactive' && !deprovisionedUsers.includes(user.id)
  );
  const potentialSavings = selectedUsers.length * currentApp.monthlyCostPerSeat;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1>License Utilization Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor and optimize SaaS license usage across SCB TechX
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Software Applications</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{Object.keys(mockData).length}</div>
            <p className="text-xs text-muted-foreground">
              Actively monitored applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Underutilized Licenses</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-600">
              {Object.values(mockData).reduce((sum, app) => 
                sum + app.users.filter(u => u.status === 'Inactive').length, 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Inactive for 30+ days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Potential Monthly Savings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              ${Object.values(mockData).reduce((sum, app) => 
                sum + (app.users.filter(u => u.status === 'Inactive').length * app.monthlyCostPerSeat), 0
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Through deprovisioning
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application Selection and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>License Analysis</span>
          </CardTitle>
          <CardDescription>
            Select a SaaS application to analyze license utilization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Select Application</label>
              <Select value={selectedApp} onValueChange={setSelectedApp}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(mockData).map(([key, app]) => (
                    <SelectItem key={key} value={key}>
                      {app.name} ({app.totalLicenses} licenses)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Filter by Inactivity</label>
              <Select value={filterDays} onValueChange={setFilterDays}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="30">30+ days inactive</SelectItem>
                  <SelectItem value="60">60+ days inactive</SelectItem>
                  <SelectItem value="90">90+ days inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Application Overview */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Total Licenses</p>
              <p className="text-xl">{currentApp.totalLicenses}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-xl text-green-600">{currentApp.activeLicenses}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cost per Seat</p>
              <p className="text-xl">${currentApp.monthlyCostPerSeat}/mo</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Utilization Rate</p>
              <p className="text-xl">{Math.round((currentApp.activeLicenses / currentApp.totalLicenses) * 100)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User License Table */}
      <Card>
        <CardHeader>
          <CardTitle>User License Details - {currentApp.name}</CardTitle>
          <CardDescription>
            Detailed view of license usage and last login activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedUsers.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    <span className="text-blue-700">{selectedUsers.length} users selected</span> for deprovisioning
                  </p>
                  <p className="text-sm text-blue-600">
                    Potential monthly savings: ${potentialSavings}/month
                  </p>
                </div>
                <Button 
                  onClick={handleDeprovision}
                  disabled={isDeprovisioning}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeprovisioning ? 'Deprovisioning...' : 'Deprovision Selected Users'}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 rounded-lg text-sm font-medium">
              <div className="col-span-1">Select</div>
              <div className="col-span-3">User Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Last Login</div>
              <div className="col-span-1">Status</div>
            </div>
            
            {filteredUsers.map((user) => {
              const isDeprovisioned = deprovisionedUsers.includes(user.id);
              
              return (
                <div 
                  key={user.id} 
                  className={`grid grid-cols-12 gap-4 p-3 border rounded-lg ${
                    isDeprovisioned ? 'bg-red-50 border-red-200' : 
                    user.status === 'Inactive' ? 'bg-orange-50 border-orange-200' : 'bg-white'
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    {!isDeprovisioned && user.status === 'Inactive' && (
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleUserToggle(user.id)}
                      />
                    )}
                    {isDeprovisioned && (
                      <CheckCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="col-span-3 text-sm">{user.userName}</div>
                  <div className="col-span-3 text-sm text-gray-600">{user.userEmail}</div>
                  <div className="col-span-2 text-sm">{user.department}</div>
                  <div className="col-span-2 text-sm">
                    <div>{user.lastLoginDate}</div>
                    <div className="text-xs text-gray-500">
                      {user.daysInactive === 0 ? 'Today' : `${user.daysInactive} days ago`}
                    </div>
                  </div>
                  <div className="col-span-1">
                    {isDeprovisioned ? (
                      <Badge variant="destructive">Deprovisioned</Badge>
                    ) : (
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {inactiveUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <p>All licenses are being actively used!</p>
              <p className="text-sm">No inactive licenses found for the selected filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}