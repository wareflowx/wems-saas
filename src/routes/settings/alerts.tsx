import { createFileRoute } from "@tanstack/react-router";
import { Save, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { PageHeaderCard } from "@/components/ui/page-header-card";
import { DetailBadge } from "@/components/ui/badge";

export const Route = createFileRoute("/settings/alerts")({
  component: SettingsAlertsLayout,
});

const SettingsAlertsLayout = () => {
  const { t } = useTranslation();
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="min-h-full space-y-3">
          {/* Header */}
          <PageHeaderCard
            icon={<Sparkles className="h-4 w-4 text-gray-600" />}
            title={t("settingsAlerts.title")}
            description="Configurez les alertes pour les CACES et visites médicales"
          />

          <div className="flex gap-2 flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {t("settingsAlerts.cacesExpiryAlerts")}
                    </CardTitle>
                    <DetailBadge color="purple">Certification</DetailBadge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label htmlFor="caces-critical">Alerte critique</Label>
                      <p className="text-sm text-muted-foreground">
                        Jours avant expiration
                      </p>
                    </div>
                    <Input
                      id="caces-critical"
                      type="number"
                      defaultValue={30}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label htmlFor="caces-warning">Alerte warning</Label>
                      <p className="text-sm text-muted-foreground">
                        Jours avant expiration
                      </p>
                    </div>
                    <Input
                      id="caces-warning"
                      type="number"
                      defaultValue={90}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label htmlFor="caces-enabled">
                        Activer les notifications
                      </Label>
                    </div>
                    <Switch id="caces-enabled" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {t("settingsAlerts.medicalVisitAlerts")}
                    </CardTitle>
                    <DetailBadge color="green">Médical</DetailBadge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label htmlFor="visit-critical">Alerte critique</Label>
                      <p className="text-sm text-muted-foreground">
                        Jours avant visite
                      </p>
                    </div>
                    <Input
                      id="visit-critical"
                      type="number"
                      defaultValue={7}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label htmlFor="visit-warning">Périodicité rappel</Label>
                      <p className="text-sm text-muted-foreground">En mois</p>
                    </div>
                    <Input
                      id="visit-warning"
                      type="number"
                      defaultValue={24}
                      className="w-20"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                {t("common.save")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
