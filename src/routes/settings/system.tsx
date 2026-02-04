import { createFileRoute } from '@tanstack/react-router'
import { Save, Bell, Database, CheckCircle2, Settings as SettingsIcon, Info, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/settings/system')({
  component: SettingsSystemLayout,
})

const SettingsSystemLayout = () => {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2"><SettingsIcon className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('settingsSystem.title')}</h2></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-full space-y-4">
            <Card>
              <CardHeader><CardTitle>{t('settingsSystem.general')}</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-600">Version</span><span className="font-medium">1.0.0</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Environnement</span><span className="font-medium">Production</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Base de données</span><span className="font-medium">SQLite</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsSystem.security')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">MD</div>
                  <div><p className="font-medium">Marie Dupont</p><p className="text-sm text-gray-500">marie.dupont@wems.fr</p></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsSystem.general')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>{t('settingsSystem.companyName')}</Label><Input placeholder="votre@email.com" /></div>
                <div className="space-y-2"><Label>{t('settingsSystem.language')}</Label><select className="w-full p-2 border rounded" value={language} onChange={(e) => handleLanguageChange(e.target.value)}><option value="fr">Français</option><option value="en">English</option></select></div>
                <div className="space-y-2"><Label>{t('settingsSystem.dateFormat')}</Label><select className="w-full p-2 border rounded"><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option><option>MM/DD/YYYY</option></select></div>
              </CardContent>
            </Card>
            <div className="flex justify-end"><Button className="gap-2"><Save className="h-4 w-4" />{t('common.save')}</Button></div>
          </div>
        </div>
      </SidebarInset>
  )
}
