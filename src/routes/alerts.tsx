import { createFileRoute } from '@tanstack/react-router'
import { Filter, ShieldAlert, AlertTriangle, Calendar, Stethoscope, FileText, Sparkles, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/alerts')({
  component: AlertsLayout,
})

const AlertsLayout = () => {
  const { t } = useTranslation()
  const alerts = [
    { id: 1, type: 'CACES expiré', employee: 'Jean Dupont', category: '1A', severity: 'critical', date: '2025-03-15' },
    { id: 2, type: 'CACES expiré', employee: 'Luc Dubois', category: '5', severity: 'critical', date: '2025-02-10' },
    { id: 3, type: 'Visite en retard', employee: 'Marie Martin', visitType: 'Visite de reprise', severity: 'critical', date: '2025-02-01' },
    { id: 4, type: 'CACES expiration proche', employee: 'Pierre Bernard', category: '3', daysLeft: 5, severity: 'warning', date: '2025-02-15' },
    { id: 5, type: 'Visite planifiée', employee: 'Sophie Petit', visitType: 'Visite périodique', severity: 'info', date: '2025-02-20' },
    { id: 6, type: 'Visite planifiée', employee: 'Jean Dupont', visitType: 'Visite initiale', severity: 'info', date: '2025-03-01' },
    { id: 7, type: 'CACES expiration proche', employee: 'Marie Martin', category: '7', daysLeft: 25, severity: 'warning', date: '2025-03-01' },
  ]

  // KPIs
  const kpis = {
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
    warningAlerts: alerts.filter(a => a.severity === 'warning').length,
    infoAlerts: alerts.filter(a => a.severity === 'info').length,
    totalAlerts: alerts.length,
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Bell className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('alerts.title')}</h2></div>
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
                    <span className="font-medium">{t('alerts.title')}</span> - Restez informé des alertes critiques et à venir concernant vos employés
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.all')}</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.totalAlerts}</div>
                <p className="text-xs text-muted-foreground">Total alertes</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.critical')}</CardTitle>
                <ShieldAlert className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">{((kpis.criticalAlerts / kpis.totalAlerts) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.warning')}</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.warningAlerts}</div>
                <p className="text-xs text-muted-foreground">{((kpis.warningAlerts / kpis.totalAlerts) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-sm font-medium">{t('alerts.info')}</CardTitle>
                <Stethoscope className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">{kpis.infoAlerts}</div>
                <p className="text-xs text-muted-foreground">{((kpis.infoAlerts / kpis.totalAlerts) * 100).toFixed(0)}% du total</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>

          {/* Alerts grouped by severity */}
          <div className="space-y-4">
            {kpis.criticalAlerts > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  {t('alerts.critical')} ({kpis.criticalAlerts})
                </h3>
                <div className="space-y-2">
                  {alerts.filter(a => a.severity === 'critical').map((alert) => (
                    <Card key={alert.id} className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <ShieldAlert className="h-8 w-8 text-red-600" />
                            <div>
                              <p className="font-semibold text-gray-900">{alert.type}</p>
                              <p className="text-sm text-gray-600">{alert.employee} • {alert.category || alert.visitType} • {alert.date}</p>
                            </div>
                          </div>
                          <Badge variant="destructive">{t('alerts.critical')}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {kpis.warningAlerts > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {t('alerts.warning')} ({kpis.warningAlerts})
                </h3>
                <div className="space-y-2">
                  {alerts.filter(a => a.severity === 'warning').map((alert) => (
                    <Card key={alert.id} className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <ShieldAlert className="h-8 w-8 text-yellow-600" />
                            <div>
                              <p className="font-semibold text-gray-900">{alert.type}</p>
                              <p className="text-sm text-gray-600">{alert.employee} • {t('caces.category')} {alert.category} • {t('caces.expiringSoon')} {alert.daysLeft} {t('dashboard.days')}</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-600">{t('alerts.warning')}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {kpis.infoAlerts > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  {t('alerts.info')} ({kpis.infoAlerts})
                </h3>
                <div className="space-y-2">
                  {alerts.filter(a => a.severity === 'info').map((alert) => (
                    <Card key={alert.id} className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Stethoscope className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="font-semibold text-gray-900">{alert.type}</p>
                              <p className="text-sm text-gray-600">{alert.employee} • {alert.visitType} • {alert.date}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{t('alerts.info')}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
