import { createFileRoute } from '@tanstack/react-router'
import { Filter, ShieldAlert, AlertTriangle, Calendar, Stethoscope, FileText } from 'lucide-react'
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

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('alerts.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-full">
            <div className="flex items-center justify-between mb-6"><Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button></div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />{t('alerts.critical')} (3)</h3>
                <div className="space-y-2">
                  {alerts.filter(a => a.severity === 'critical').map((alert) => (
                    <Card key={alert.id} className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">{alert.type.includes('CACES') ? <ShieldAlert className="h-8 w-8 text-red-600" /> : <Calendar className="h-8 w-8 text-red-600" />}<div><p className="font-semibold text-gray-900">{alert.type}</p><p className="text-sm text-gray-600">{alert.employee} • {alert.category || alert.visitType} • {alert.date}</p></div></div>
                          <Badge variant="destructive">{t('alerts.critical')}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-600 mb-3 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />{t('alerts.warning')} (2)</h3>
                <div className="space-y-2">
                  {alerts.filter(a => a.severity === 'warning').map((alert) => (
                    <Card key={alert.id} className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4"><ShieldAlert className="h-8 w-8 text-yellow-600" /><div><p className="font-semibold text-gray-900">{alert.type}</p><p className="text-sm text-gray-600">{alert.employee} • {t('caces.category')} {alert.category} • {t('caces.expiringSoon')} {alert.daysLeft} {t('dashboard.days')}</p></div></div>
                          <Badge className="bg-yellow-600">{t('alerts.warning')}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2"><Calendar className="h-5 w-5" />{t('alerts.info')} (2)</h3>
                <div className="space-y-2">
                  {alerts.filter(a => a.severity === 'info').map((alert) => (
                    <Card key={alert.id} className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4"><Calendar className="h-8 w-8 text-blue-600" /><div><p className="font-semibold text-gray-900">{alert.type}</p><p className="text-sm text-gray-600">{alert.employee} • {alert.visitType} • {alert.date}</p></div></div>
                          <Badge variant="outline">{t('alerts.info')}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
  )
}
