'use client';

import React from 'react';

const ProfileMenu = ({ data }) => {
    const allProfiles = [
        { key: 'isDoctorProfile', icon: '🩺', label: 'Doctor', link: '/profile/doctor' },
        { key: 'isDiagnosticCenterProfile', icon: '📋', label: 'Diagnostic Center & Hospital', link: '/profile/diagnostic' },
        { key: 'isPharmacyProfile', icon: '💊', label: 'Pharmacy', link: '/profile/pharmacy' },
        { key: 'isBloodBankProfile', icon: '🩸', label: 'Blood Bank & Donor Club', link: '/profile/blood' },
        { key: 'isAmbulanceProfile', icon: '🚑', label: 'Ambulance', link: '/profile/ambulance' },
        { key: 'isDental', icon: '🦷', label: 'Dental Clinic', link: '/profile/dental' },
        { key: 'isDrugCenter', icon: '🚭', label: 'Drug De-Addiction', link: '/profile/drug' },
        { key: 'isPhysioCenter', icon: '🧘‍♂️', label: 'Physiotherapy Center', link: '/profile/physioProfile' },
        { key: 'isHearingCenter', icon: '🦻', label: 'Hearing Care Center', link: '/profile/hearingCareProfile' },
        { key: 'isEyeCenter', icon: '👁️', label: 'Eye Care Center', link: '/profile/eyeCareProfile' },
        { key: 'isNurse', icon: '🧑‍⚕️', label: 'Nursing Care Center', link: '/profile/nursingCareProfile' },
    ];

    const activeProfiles = allProfiles.filter(profile => data[profile.key]);
    activeProfiles.unshift({ icon: '👤', label: 'General Profile', link: '/profile/general' });

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
                        Other profiles you can create
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
