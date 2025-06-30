
import LayoutAppBar from "../../components/LayoutAppBar";
import SearchDiagnostic from "../../components/search/SearchDiagnostic";
import { appname, map_key } from "../../utils/constants";
import DiagnosticList from '../../components/list/DiagnosticList';

export const metadata = {
  title: "Diagnostics | " + appname,
};

async function DiagnosticPage() {

  return (
    <>
      <div className="pt-10">
        <SearchDiagnostic />
        <div className="aid-container mx-auto px-2">
          <DiagnosticList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default DiagnosticPage