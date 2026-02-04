import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Upload, File, Download, Trash2, Eye, FileIcon, FileSpreadsheet, FileImage, FileText as FileIcon2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/documents')({
  component: DocumentsLayout,
})

const DocumentsLayout = () => {
  const { t } = useTranslation()
  const documents = [
    { id: 1, name: 'Contrat_CDID_Dupont.pdf', type: 'Contrat', employee: 'Jean Dupont', uploadDate: '2024-01-15', size: '2.4 MB', category: 'pdf' },
    { id: 2, name: 'CACES_1A_Certificat.pdf', type: 'CACES', employee: 'Marie Martin', uploadDate: '2023-11-20', size: '1.8 MB', category: 'pdf' },
    { id: 3, name: 'Visite_Medicale_Initial.pdf', type: 'Visite médicale', employee: 'Pierre Bernard', uploadDate: '2024-01-10', size: '945 KB', category: 'pdf' },
    { id: 4, name: 'Photo_Identification.jpg', type: 'Identification', employee: 'Sophie Petit', uploadDate: '2023-09-15', size: '2.1 MB', category: 'image' },
  ]

  const getFileIcon = (category: string) => {
    switch (category) {
      case 'pdf': return <FileIcon2 className="h-5 w-5 text-red-600" />
      case 'spreadsheet': return <FileSpreadsheet className="h-5 w-5 text-green-600" />
      case 'image': return <FileImage className="h-5 w-5 text-blue-600" />
      default: return <FileIcon className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2"><FileIcon2 className="h-5 w-5 text-gray-600" /><h2 className="text-lg font-semibold">{t('documents.title')}</h2></div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200"><div className="w-2 h-2 rounded-full bg-green-500" /><span>{t('dashboard.editMode')}</span></div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" /><Input placeholder={t('documents.search')} className="pl-9 w-64" /></div><Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button></div>
              <Button className="gap-2"><Upload className="h-4 w-4" />{t('documents.addDocument')}</Button>
            </div>
            <Card>
              <CardHeader><CardTitle>{t('documents.title')}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4"><div className="p-2 bg-gray-100 rounded-lg">{getFileIcon(doc.category)}</div><div><p className="font-medium text-gray-900">{doc.name}</p><p className="text-sm text-gray-500">{doc.employee} • {doc.uploadDate} • {doc.size}</p></div></div>
                      <div className="flex items-center gap-2"><Badge>{doc.type}</Badge><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-600" /></Button></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
  )
}
