import LayoutAppBar from "../../components/LayoutAppBar";
import SearchPharmacy from "../../components/search/SearchPharmacy";
import { FaArrowLeft } from "react-icons/fa";
import { appname, map_key } from "../../utils/constants";
import PharmacyList from "../../components/list/PharmacyList";

export const metadata = {
    title: "Pharmacies | " + appname,
};

async function page() {
    return (
        <>
            <LayoutAppBar route="/pharmacy" leadingIcon={<FaArrowLeft className="h-5 w-5" />} title="Pharmacies" api_key={map_key} />
            <div style={{ insetBlockEnd: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-20">
                <SearchPharmacy />
                <div className="aid-container mx-auto px-2">
                    <PharmacyList nextPage={1} />
                </div>
            </div>
        </>
    )
}

export default page