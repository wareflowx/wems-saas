import { createFileRoute } from '@tanstack/react-router'
import { Users, ShieldAlert, Stethoscope, FileText, Sparkles, Bell, AlertTriangle, Calendar, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: DashboardLayout })

const DashboardLayout = () => {
  const { t } = useTranslation()

  // Mock data
  const stats = {
    totalEmployees: 42,
    activeEmployees: 38,
    expiredCaces: 3,
    overdueVisits: 5,
  }

  const recentAlerts = [
    { id: 1, type: 'CACES expiré', employee: 'Jean Dupont', severity: 'critical', date: '2025-02-10' },
    { id: 2, type: 'Visite en retard', employee: 'Marie Martin', severity: 'critical', date: '2025-02-01' },
    { id: 3, type: 'CACES expiration proche', employee: 'Pierre Bernard', severity: 'warning', date: '2025-02-15' },
  ]

  const upcomingEvents = [
    { id: 1, type: 'Visite médicale', employee: 'Sophie Petit', date: '2025-02-20' },
    { id: 2, type: 'CACES expiration', employee: 'Luc Dubois', date: '2025-03-01' },
    { id: 3, type: 'Visite médicale', employee: 'Jean Dupont', date: '2025-03-05' },
  ]

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('dashboard.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 py-6">
        <div className="min-h-full space-y-3">
          {/* Header */}
          <div className="mb-2">
            <Card className="p-3 bg-background shadow-sm rounded-md">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Sparkles className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">{t('dashboard.title')}</span> - Vue d'ensemble de votre entreprise et alertes importantes
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('dashboard.totalEmployees')}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{stats.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">{stats.activeEmployees} actifs</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.critical')}</CardTitle>
                <ShieldAlert className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{stats.expiredCaces}</div>
                <p className="text-xs text-muted-foreground">{t('caces.expired')}</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('medicalVisits.overdue')}</CardTitle>
                <Stethoscope className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{stats.overdueVisits}</div>
                <p className="text-xs text-muted-foreground">{t('medicalVisits.overdue')}</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('documents.title')}</CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Total documents</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid gap-3 lg:grid-cols-2">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Alertes récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                      <div className={`mt-0.5 ${alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {alert.severity === 'critical' ? <ShieldAlert className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{alert.type}</p>
                        <p className="text-xs text-muted-foreground">{alert.employee}</p>
                      </div>
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'} className="flex-shrink-0">
                        {alert.severity === 'critical' ? 'Critique' : 'Avertissement'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Link to="/alerts">
                  <Button variant="outline" className="w-full mt-4">
                    Voir toutes les alertes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Événements à venir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                      <div className="mt-0.5 text-blue-500">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{event.type}</p>
                        <p className="text-xs text-muted-foreground">{event.employee}</p>
                      </div>
                      <div className="text-xs text-muted-foreground flex-shrink-0">
                        {event.date}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Link to="/medical-visits">
                    <Button variant="outline" className="w-full">
                      Visites
                    </Button>
                  </Link>
                  <Link to="/caces">
                    <Button variant="outline" className="w-full">
                      CACES
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Link to="/employees">
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    {t('employees.title')}
                  </Button>
                </Link>
                <Link to="/medical-visits">
                  <Button variant="outline" className="gap-2">
                    <Stethoscope className="h-4 w-4" />
                    {t('medicalVisits.title')}
                  </Button>
                </Link>
                <Link to="/caces">
                  <Button variant="outline" className="gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    {t('caces.title')}
                  </Button>
                </Link>
                <Link to="/documents">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {t('documents.title')}
                  </Button>
                </Link>
                <Link to="/alerts">
                  <Button variant="outline" className="gap-2">
                    <Bell className="h-4 w-4" />
                    {t('alerts.title')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
