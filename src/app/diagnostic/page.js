
import SearchDiagnostic from "../../components/search/SearchDiagnostic";
import { appname } from "../../utils/constants";
import DiagnosticList from '../../components/list/DiagnosticList';

export const metadata = {
  title: "Diagnostics | " + appname,
};

async function DiagnosticPage() {

  return (
    <>
      <div className="pt-10">
        <div className="aid-container">
          <SearchDiagnostic />
        </div>
        <div className="aid-container mx-auto px-2">
          <DiagnosticList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default DiagnosticPage