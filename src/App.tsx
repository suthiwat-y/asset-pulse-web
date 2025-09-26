import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { GroupDashboard } from './components/GroupDashboard';
import { HROnboarding } from './components/HROnboarding';
import { LicenseUtilization } from './components/LicenseUtilization';
import { DepartmentWizard } from './components/DepartmentWizard';

type ViewType = 'group-dashboard' | 'hr-onboarding' | 'license-utilization' | 'department-wizard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('group-dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-6 py-8">
        {currentView === 'group-dashboard' && <GroupDashboard />}
        {currentView === 'hr-onboarding' && <HROnboarding />}
        {currentView === 'license-utilization' && <LicenseUtilization />}
        {currentView === 'department-wizard' && <DepartmentWizard />}
      </main>
    </div>
  );
}