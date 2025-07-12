
import SearchPharmacy from "../../components/search/SearchPharmacy";
import { appname } from "../../utils/constants";
import PharmacyList from "../../components/list/PharmacyList";

export const metadata = {
    title: "Pharmacies | " + appname,
};

async function page() {
    return (
        <>
            <div className=" pt-10">
                <div className="aid-container">
                    <SearchPharmacy />
                </div>
                <div className="aid-container mx-auto px-2">
                    <PharmacyList nextPage={1} />
                </div>
            </div>
        </>
    )
}

export default page