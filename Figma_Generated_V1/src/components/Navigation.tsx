import React from 'react';
import { Button } from './ui/button';
import { BarChart3, UserPlus, Monitor, Plus } from 'lucide-react';

type ViewType = 'group-dashboard' | 'hr-onboarding' | 'license-utilization' | 'department-wizard';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    {
      id: 'group-dashboard' as ViewType,
      label: 'Group Dashboard',
      icon: BarChart3,
      description: 'Group CTO View'
    },
    {
      id: 'hr-onboarding' as ViewType,
      label: 'HR Onboarding',
      icon: UserPlus,
      description: 'New Hire Setup'
    },
    {
      id: 'license-utilization' as ViewType,
      label: 'License Utilization',
      icon: Monitor,
      description: 'Subsidiary CTO View'
    },
    {
      id: 'department-wizard' as ViewType,
      label: 'New Department',
      icon: Plus,
      description: 'Department Setup'
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">S</span>
              </div>
              <div>
                <h1 className="text-lg">SCBX SaaS Optimization</h1>
                <p className="text-xs text-gray-500">Group Technology Office</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  className="flex flex-col items-center p-3 h-auto"
                  onClick={() => onViewChange(item.id)}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.description}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}