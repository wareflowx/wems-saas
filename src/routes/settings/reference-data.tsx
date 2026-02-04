import { createFileRoute } from '@tanstack/react-router'
import { Plus, Trash2, Save, Bell, Database, CheckCircle2, Settings as SettingsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/settings/reference-data')({
  component: SettingsReferenceDataLayout,
})

const SettingsReferenceDataLayout = () => {
  const { t } = useTranslation()
  const departments = ['Production', 'Administration', 'RH', 'Commercial', 'Maintenance']
  const jobTitles = ['Opérateur', 'Technicien', 'Comptable', 'Responsable RH', 'Commercial']
  const contractTypes = ['CDI', 'CDD', 'Intérim', 'Alternance']

  return (
    <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2"><Database className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('settingsReferenceData.title')}</h2></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-full space-y-4">
            <Card>
              <CardHeader><CardTitle>{t('settingsReferenceData.departments')}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">{departments.map((dept, idx) => <div key={idx} className="flex items-center justify-between p-2 border rounded"><span>{dept}</span><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-600" /></Button></div>)}</div>
                <Button className="mt-4 w-full gap-2"><Plus className="h-4 w-4" />{t('settingsReferenceData.addDepartment')}</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsReferenceData.positions')}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">{jobTitles.map((job, idx) => <div key={idx} className="flex items-center justify-between p-2 border rounded"><span>{job}</span><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-600" /></Button></div>)}</div>
                <Button className="mt-4 w-full gap-2"><Plus className="h-4 w-4" />{t('settingsReferenceData.addPosition')}</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('settingsReferenceData.contractTypes')}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">{contractTypes.map((type, idx) => <div key={idx} className="flex items-center justify-between p-2 border rounded"><span>{type}</span><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-600" /></Button></div>)}</div>
                <Button className="mt-4 w-full gap-2"><Plus className="h-4 w-4" />{t('settingsReferenceData.addContractType')}</Button>
              </CardContent>
            </Card>
            <div className="flex justify-end"><Button className="gap-2"><Save className="h-4 w-4" />{t('common.save')}</Button></div>
          </div>
        </div>
      </SidebarInset>
  )
}
