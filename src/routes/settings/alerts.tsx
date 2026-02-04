import { createFileRoute } from '@tanstack/react-router'
import { Save, Bell, Database, CheckCircle2, Settings as SettingsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/settings/alerts')({
  component: SettingsAlertsLayout,
})

const SettingsAlertsLayout = () => {
  const { t } = useTranslation()
  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><Bell className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('settingsAlerts.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-full space-y-4">
            <Card>
              <CardHeader><CardTitle>{t('settingsAlerts.cacesExpiryAlerts')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><Label>{t('settingsAlerts.daysBeforeExpiry')}</Label><p className="text-sm text-gray-500">{t('settingsAlerts.enableExpiryAlerts')}</p></div><Input type="number" defaultValue={30} className="w-24" /></div>
                <div className="flex items-center justify-between"><div><Label>{t('settingsAlerts.daysBeforeExpiry')}</Label><p className="text-sm text-gray-500">{t('alerts.warning')}</p></div><Input type="number" defaultValue={90} className="w-24" /></div>
                <div className="flex items-center justify-between"><div><Label>{t('settingsAlerts.enableVisitAlerts')}</Label><p className="text-sm text-gray-500">{t('settingsAlerts.notificationMethods')}</p></div><Switch defaultChecked /></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsAlerts.medicalVisitAlerts')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><Label>{t('medicalVisits.periodicVisit')}</Label><p className="text-sm text-gray-500">{t('settingsAlerts.enableVisitAlerts')}</p></div><Input type="number" defaultValue={7} className="w-24" /></div>
                <div className="flex items-center justify-between"><div><Label>{t('medicalVisits.periodicVisit')}</Label><p className="text-sm text-gray-500">{t('medicalVisits.periodicVisit')}</p></div><Input type="number" defaultValue={24} className="w-24" /></div>
              </CardContent>
            </Card>
            <div className="flex justify-end"><Button className="gap-2"><Save className="h-4 w-4" />{t('common.save')}</Button></div>
          </div>
        </div>
      </SidebarInset>
  )
}
