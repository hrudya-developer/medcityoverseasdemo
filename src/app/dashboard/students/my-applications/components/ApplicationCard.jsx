// components/my-application/ApplicationCard.jsx

import {
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    MapPin,
} from "lucide-react";

import InfoItem from "./InfoItem";

export default function ApplicationCard({
    application,
}) {
    const time =
        application?.created_at
            ?.split(" ")
            ?.[1] || "N/A";

    return (
        <div
            className="
                rounded-3xl
                border
                border-green-100
                bg-white
                p-6
                shadow-lg
                transition

                hover:shadow-xl
            "
        >
            <div
                className="
                    mb-4
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >
                <div>
                    <h3
                        className="
                            text-md
                            font-bold
                            text-darkPrimary
                        "
                    >
                        {application?.course ||
                            "N/A"}
                    </h3>

                    <div
                        className="
                            mt-1
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-primary
                        "
                    >
                        <Building2 className="h-4 w-4" />

                        <span>
                            {application?.name ||
                                "N/A"}
                        </span>
                    </div>
                </div>

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-sm
                        font-bold
                        text-green-700
                    "
                >
                    <CheckCircle className="h-4 w-4" />

                    Applied
                </div>
            </div>

            <div
                className="
                    grid
                    gap-3

                    md:grid-cols-2
                "
            >
                <InfoItem
                    icon={
                        <MapPin className="h-4 w-4" />
                    }
                    label="Country"
                    value={
                        application?.country
                    }
                />

                <InfoItem
                    icon={
                        <Calendar className="h-4 w-4" />
                    }
                    label="Date"
                    value={
                        application?.date
                    }
                />

                <InfoItem
                    icon={
                        <Clock className="h-4 w-4" />
                    }
                    label="Time"
                    value={time}
                />

                <InfoItem
                    icon={
                        <CheckCircle className="h-4 w-4" />
                    }
                    label="Status"
                    value={
                        application?.enquiry_status ||
                        "Applied"
                    }
                />
            </div>

            {application?.created_at && (
                <div
                    className="
                        mt-5
                        rounded-xl
                        bg-green-50
                        p-3
                        text-sm
                        font-medium
                        text-green-700
                    "
                >
                    Applied on:{" "}
                    {
                        application.created_at
                    }
                </div>
            )}
        </div>
    );
}