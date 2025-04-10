import BottomNavigation from "../../components/BottomNavigation"
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
      <LayoutAppBar route="/diagnostic"  api_key={map_key}></LayoutAppBar>


      <div style={{ paddingBottom: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-20">

        <SearchDiagnostic></SearchDiagnostic>


        <div className="container mx-auto px-2">


          <DiagnosticList nextPage={1}></DiagnosticList>

        </div>

        <BottomNavigation active="/diagnostic"></BottomNavigation>

      </div>
    </>

  )
}

export default DiagnosticPage