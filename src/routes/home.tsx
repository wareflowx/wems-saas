import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  ShieldAlert,
  Users,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/home')({
  component: DashboardLayout,
})

const DashboardLayout = () => {
  const { t } = useTranslation()

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>{t('dashboard.editMode')}</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 py-6">
        <DashboardContent t={t} />
      </div>
    </SidebarInset>
  )
}

const DashboardContent = ({ t }: { t: (key: string) => string }) => {
  // TODO: Replace with real data from database
  const metrics = {
    totalEmployees: 42,
    newHiresThisMonth: 3,
    departuresThisMonth: 1,
    employeesOnLeave: 2,
  }

  const alerts = {
    cacesExpired: 2,
    cacesExpiringSoon: 5,
    medicalVisitsOverdue: 1,
    medicalVisitsUpcoming: 8,
  }

  const upcomingDeadlines = {
    next7Days: {
      caces: [
        { id: 1, employee: 'Jean Dupont', category: '1A', daysLeft: 3 },
        { id: 2, employee: 'Marie Martin', category: '3', daysLeft: 5 },
      ],
      medicalVisits: [
        { id: 1, employee: 'Pierre Bernard', type: 'Visite de reprise', date: '2026-02-07' },
        { id: 2, employee: 'Sophie Petit', type: 'Visite périodique', date: '2026-02-10' },
      ],
    },
    next30Days: {
      cacesCount: 8,
      medicalVisitsCount: 15,
    },
  }

  const recentActivity = [
    { id: 1, type: 'employee_added', message: `${t('dashboard.newEmployee')}: Luc Dubois`, time: `2 ${t('dashboard.hoursAgo')}` },
    { id: 2, type: 'document_uploaded', message: `${t('documents.add')} ${t('documents.name')} pour Marie Martin`, time: `3 ${t('dashboard.hoursAgo')}` },
    { id: 3, type: 'caces_renewed', message: `${t('dashboard.cacesRenewed')} Pierre Bernard`, time: `1 ${t('dashboard.dayAgo')}` },
  ]

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="relative group rounded-lg border border-border p-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Sparkles className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-700">
                <span className="font-medium">{t('dashboard.title')}</span> - {t('dashboard.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title={t('dashboard.totalEmployees')}
          value={metrics.totalEmployees}
          icon={<Users className="h-5 w-5" />}
          color="blue"
        />
        <MetricCard
          title={t('dashboard.newHires')}
          value={metrics.newHiresThisMonth}
          subtitle={t('dashboard.thisMonth')}
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="green"
        />
        <MetricCard
          title={t('dashboard.departures')}
          value={metrics.departuresThisMonth}
          subtitle={t('dashboard.thisMonth')}
          icon={<Users className="h-5 w-5" />}
          color="gray"
        />
        <MetricCard
          title={t('dashboard.employeesOnLeave')}
          value={metrics.employeesOnLeave}
          icon={<Clock className="h-5 w-5" />}
          color="yellow"
        />
      </div>

      {/* Active Alerts */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('dashboard.activeAlerts')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AlertCard
            title={t('dashboard.expiredCaces')}
            count={alerts.cacesExpired}
            severity="critical"
            icon={<ShieldAlert className="h-5 w-5" />}
          />
          <AlertCard
            title={t('dashboard.expiringSoonCaces')}
            count={alerts.cacesExpiringSoon}
            severity="warning"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <AlertCard
            title={t('dashboard.overdueMedicalVisits')}
            count={alerts.medicalVisitsOverdue}
            severity="critical"
            icon={<AlertCircle className="h-5 w-5" />}
          />
          <AlertCard
            title={t('dashboard.upcomingMedicalVisits')}
            count={alerts.medicalVisitsUpcoming}
            severity="info"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Next 7 Days */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              {t('dashboard.next7Days')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.next7Days.caces.length === 0 &&
            upcomingDeadlines.next7Days.medicalVisits.length === 0 ? (
              <p className="text-gray-500 text-center py-4">{t('dashboard.noDeadlines')}</p>
            ) : (
              <div className="space-y-4">
                {/* CACES */}
                {upcomingDeadlines.next7Days.caces.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">{t('dashboard.caces')}</h4>
                    <div className="space-y-2">
                      {upcomingDeadlines.next7Days.caces.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.employee}</p>
                            <p className="text-sm text-gray-600">{t('dashboard.caces')} {item.category}</p>
                          </div>
                          <Badge variant="destructive">{item.daysLeft} {t('dashboard.days')}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medical Visits */}
                {upcomingDeadlines.next7Days.medicalVisits.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 mt-4">
                      {t('dashboard.medicalVisits')}
                    </h4>
                    <div className="space-y-2">
                      {upcomingDeadlines.next7Days.medicalVisits.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.employee}</p>
                            <p className="text-sm text-gray-600">{item.type}</p>
                          </div>
                          <Badge variant="outline">{item.date}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next 30 Days */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              {t('dashboard.next30Days')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-3xl font-bold text-yellow-700">
                  {upcomingDeadlines.next30Days.cacesCount}
                </p>
                <p className="text-sm text-gray-600 mt-1">{t('dashboard.cacesToRenew')}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-3xl font-bold text-blue-700">
                  {upcomingDeadlines.next30Days.medicalVisitsCount}
                </p>
                <p className="text-sm text-gray-600 mt-1">{t('dashboard.medicalVisitsPlanned')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-600" />
            {t('dashboard.recentActivity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="mt-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Metric Card Component
const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string
  value: number
  subtitle?: string
  icon: React.ReactNode
  color: 'blue' | 'green' | 'yellow' | 'gray'
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    gray: 'bg-gray-500',
  }

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start gap-4">
        <div className={`${colorClasses[color]} p-2.5 rounded-lg text-white`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

// Alert Card Component
const AlertCard = ({
  title,
  count,
  severity,
  icon,
}: {
  title: string
  count: number
  severity: 'critical' | 'warning' | 'info'
  icon: React.ReactNode
}) => {
  const iconClasses = {
    critical: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }

  const countClasses = {
    critical: 'bg-red-600 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-600 text-white',
  }

  return (
    <div className="cursor-pointer rounded-lg border border-border p-4 transition-colors hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={iconClasses[severity]}>{icon}</div>
          <div>
            <p className="font-semibold text-gray-900">{title}</p>
          </div>
        </div>
        <div className={`${countClasses[severity]} px-3 py-1 rounded-full text-lg font-bold`}>
          {count}
        </div>
      </div>
    </div>
  )
}
