import { OfflinePackManager } from "@/components/offline-pack-manager";
import { PageHeader } from "@/components/page-header";
import { buildOfflineFlightPack } from "@/lib/offline-pack/build-pack";

/**
 * Offline flight readiness cockpit. The checklist scaffold is built
 * server-side from the same app-safe pack contract the artifact ships;
 * live install/cache state is resolved on the client.
 */
export default function FlightPackPage() {
  const pack = buildOfflineFlightPack();

  return (
    <>
      <PageHeader
        eyebrow="Offline readiness"
        title="Ready for flight?"
        summary="Public mission pages and the app-safe flight pack work offline once prepared. Private, admin, and sign-in surfaces always need a network — they are never cached."
        badge="App-safe pack"
      />
      <OfflinePackManager
        readiness={pack.readiness}
        verifyRoutes={pack.manifest.includedRoutes}
        packVersion={pack.manifest.packVersion}
      />
    </>
  );
}
