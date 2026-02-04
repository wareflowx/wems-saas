import { createFileRoute } from '@tanstack/react-router'
import { Download, Upload, Bell, Database, Save, CheckCircle2, Settings as SettingsIcon, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/settings/backup')({
  component: SettingsBackupLayout,
})

const SettingsBackupLayout = () => {
  const { t } = useTranslation()
  return (
    <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('settingsBackup.title')}</h2></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-full space-y-4">
            <Card>
              <CardHeader><CardTitle>{t('settingsBackup.manualBackup')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{t('settingsBackup.manualBackupDesc')}</p>
                <div className="flex gap-2"><Button className="gap-2"><Save className="h-4 w-4" />{t('settingsBackup.createBackup')}</Button><Button variant="outline" className="gap-2"><Download className="h-4 w-4" />{t('settingsBackup.download')}</Button></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsBackup.restoration')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{t('settingsBackup.restorationDesc')}</p>
                <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" />{t('settingsBackup.selectBackupFile')}</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsBackup.latestBackups')}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div><p className="font-medium">backup_2025_02_04_103000.zip</p><p className="text-sm text-gray-500">125 MB • {t('settingsBackup.today')} à 10:30</p></div>
                    <div className="flex gap-2"><Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><Upload className="h-4 w-4" /></Button></div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div><p className="font-medium">backup_2025_02_03_150000.zip</p><p className="text-sm text-gray-500">124 MB • {t('settingsBackup.yesterday')} à 15:00</p></div>
                    <div className="flex gap-2"><Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><Upload className="h-4 w-4" /></Button></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsBackup.automaticBackup')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><p className="font-medium">{t('settingsBackup.enableAutomaticBackup')}</p><p className="text-sm text-gray-500">{t('settingsBackup.enableAutomaticBackupDesc')}</p></div><input type="checkbox" defaultChecked className="w-5 h-5" /></div>
                <div className="flex items-center gap-2"><label className="text-sm text-gray-600">{t('settingsBackup.backupTime')}:</label><Input type="time" defaultValue="02:00" className="w-32" /></div>
                <div className="flex items-center gap-2"><label className="text-sm text-gray-600">{t('settingsBackup.lastAutomaticBackup')}:</label><span className="text-sm">{t('settingsBackup.today')} à 02:00</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
  )
}
