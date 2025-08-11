'use client';

import React from 'react';
import { useI18n } from '../context/i18n';

const ProfileMenu = ({ data }) => {
    const i18n = useI18n()

    const allProfiles = [
        { key: 'isDoctorProfile', icon: '🩺', label: i18n.t('Doctor'), link: '/profile/doctor' },
        { key: 'isDiagnosticCenterProfile', icon: '📋', label: i18n.t('Diagnostic Centers and Hospitals'), link: '/profile/diagnostic' },
        { key: 'isPharmacyProfile', icon: '💊', label: i18n.t('Pharmacy'), link: '/profile/pharmacy' },
        { key: 'isBloodBankProfile', icon: '🩸', label: i18n.t('Blood Bank and Donor Club'), link: '/profile/blood' },
        { key: 'isAmbulanceProfile', icon: '🚑', label: i18n.t('Ambulance'), link: '/profile/ambulance' },
        { key: 'isDental', icon: '🦷', label: i18n.t('Dental Clinic'), link: '/profile/dental' },
        { key: 'isDrugCenter', icon: '🚭', label: i18n.t('Drug De-Addiction Center'), link: '/profile/drug' },
        { key: 'isPhysioCenter', icon: '🧘‍♂️', label: i18n.t('Physiotherapy Center'), link: '/profile/physioProfile' },
        { key: 'isHearingCenter', icon: '🦻', label: i18n.t('Hearing Care Center'), link: '/profile/hearingCareProfile' },
        { key: 'isEyeCenter', icon: '👁️', label: i18n.t('Hearing Aid Center'), link: '/profile/eyeCareProfile' },
        { key: 'isNurse', icon: '🧑‍⚕️', label: i18n.t('Nursing Care Home'), link: '/profile/nursingCareProfile' },
    ];


    const activeProfiles = allProfiles.filter(profile => data[profile.key]);
    activeProfiles.unshift({ icon: '👤', label: i18n.t('General Profile'), link: '/profile/general' });

    const inactiveProfiles = allProfiles.filter(profile => !data[profile.key]);

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="space-y-4">
                {activeProfiles.map((item, index) => (
                    <div
                        onClick={() => {
                            window.location.href = `${item.link}`;
                        }}
                        key={index}
                        className="flex items-center space-x-4 border-b pb-2 cursor-pointer"
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-gray-700">{item.label}</span>
                    </div>
                ))}
            </div>

            {inactiveProfiles.length > 0 && (
                <>
                    <h2 className="text-md font-semibold mt-6 mb-4 text-gray-600">
                       {i18n.t("Other profiles you can create")}
                    </h2>
                    <div className="space-y-4">
                        {inactiveProfiles.map((item, index) => (
                            <div
                                onClick={() => {
                                    window.location.href = `${item.link}`;
                                }}
                                key={index}
                                className="flex items-center space-x-4 border-b pb-2 cursor-pointer"
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileMenu;
