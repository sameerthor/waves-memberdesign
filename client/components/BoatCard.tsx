import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { CheckCircle2, Clock3 } from "lucide-react";

interface BookingTypeStatus {
  available?: boolean;
  waitlist?: boolean;
  label?: string;
}

interface BoatAvailability {
  AM?: BookingTypeStatus;
  PM?: BookingTypeStatus;
  FULL_DAY?: BookingTypeStatus;
}

interface BoatCardProps {
  id: string | number;
  name: string;
  type?: string;
  category?: string;
  image?: string | null;
  images?: string[];
  location?: string;
  boatType?: string;
  length?: string | number | null;
  guests?: number | null;
  features?: string[];

  pricePerHour?: number | null;
  badge?: "most-booked" | "unavailable" | null;

  fuelCapacity?: string | number | null;
  weightCapacity?: string | number | null;
  motor?: string | null;
  notes?: string | null;
  boatAddress?: string | null;

  lastBookedFormatted?: string | null;
  lastBooked?: string | null;

  availability?: BoatAvailability | null;

  onSelectBoat?: () => void;
  onViewBoat?: () => void;
}

const FEATURE_CARD_CONFIG = [
  { key: "Fishing", label: "Fishing permitted", image: "/fish.svg" },
  { key: "Livewell", label: "Livewell", image: "/live.svg" },
  { key: "Offshore Use", label: "Offshore use", image: "/offshore.svg" },
  { key: "Watersports", label: "Watersports", image: "/water.svg" },
  { key: "Bimini", label: "Bimini", image: "/bimni.svg" },
  { key: "Pets Allowed", label: "Pets", image: "/pets.svg" },
];

function formatLength(length?: string | number | null) {
  if (length === null || length === undefined || length === "") return "—";
  return `${length} ft`;
}

function formatFuelCapacity(fuelCapacity?: string | number | null) {
  if (fuelCapacity === null || fuelCapacity === undefined || fuelCapacity === "") {
    return "—";
  }
  return `${fuelCapacity} gal`;
}

function formatWeightCapacity(
  weightCapacity?: string | number | null,
  guests?: number | null,
) {
  const guestsText = guests ? `${guests} Guests` : "—";

  if (
    weightCapacity === null ||
    weightCapacity === undefined ||
    weightCapacity === ""
  ) {
    return guestsText;
  }

  return `${guestsText} / ${weightCapacity} lbs`;
}

function formatLastBooked(
  lastBookedFormatted?: string | null,
  lastBooked?: string | null,
) {
  if (lastBookedFormatted) return lastBookedFormatted;

  if (lastBooked) {
    const date = new Date(lastBooked);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US");
    }
  }

  return "Never";
}

function getAvailabilityPill(type: "AM" | "PM", status?: BookingTypeStatus) {
  const isAvailable = !!status?.available && !status?.waitlist;
  const isWaitlist = !!status?.waitlist;

  if (isAvailable) {
    return {
      label: type,
      text: "Available",
      className: "bg-[#F1FAF4] border border-[#00000014]",
      badgeTextClass: "text-[#008A3AB8]",
      textClass: "text-[#008A3A]",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#008A3A]" />,
    };
  }

  if (isWaitlist) {
    return {
      label: type,
      text: "Waitlist",
      className: "bg-[#FFF8EE] border border-[#00000014]",
      badgeTextClass: "text-[#B86A00]",
      textClass: "text-[#B86A00]",
      icon: <Clock3 className="w-3.5 h-3.5 text-[#B86A00]" />,
    };
  }

  return {
    label: type,
    text: "Booked",
    className: "bg-[#FFF7F7] border border-[#00000014]",
    badgeTextClass: "text-[#C33A2CB8]",
    textClass: "text-[#C33A2C]",
    icon: null,
  };
}

export default function BoatCard({
  id,
  name,
  type,
  category,
  image,
  images,
  location,
  boatType,
  length,
  guests,
  features = [],
  pricePerHour,
  badge,
  fuelCapacity,
  weightCapacity,
  motor,
  notes,
  boatAddress,
  lastBookedFormatted,
  lastBooked,
  availability,
  onSelectBoat,
  onViewBoat,
}: BoatCardProps) {
  console.log("availability",availability)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const galleryImages = useMemo(() => {
    const all = [...(images || []), ...(image ? [image] : [])]
      .filter(Boolean)
      .filter((value, index, arr) => arr.indexOf(value) === index);

    return all.length > 0 ? all : ["/placeholder.svg"];
  }, [images, image]);

  const safeLocation = location || "Location unavailable";
  const safeBoatType = boatType || type || "Boat";
  const safeLength = formatLength(length);
  const safeGuests = Number(guests ?? 0);
  const safeFuelCapacity = formatFuelCapacity(fuelCapacity);
  const safeCapacityText = formatWeightCapacity(weightCapacity, safeGuests);
  const safeMotor = motor || "—";
  const safeNotes = notes || boatAddress || "No notes available";
  const safeLastBooked = formatLastBooked(lastBookedFormatted, lastBooked);

  const normalizedFeatures = useMemo(() => new Set(features), [features]);

  const featureCards = FEATURE_CARD_CONFIG.map((item) => {
    const hasFeature = normalizedFeatures.has(item.key);

    return {
      ...item,
      value: hasFeature ? "Yes" : "No",
      enabled: hasFeature,
    };
  });

  const amPill = getAvailabilityPill("AM", availability?.AM);
  const pmPill = getAvailabilityPill("PM", availability?.PM);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col lg:flex-row gap-5 p-5 relative">
      <div className="w-full lg:w-[30%]">
        <div className="relative rounded-md overflow-hidden">
          {badge && (
            <div
              className={`absolute z-10 top-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
                badge === "most-booked"
                  ? "bg-green-badge text-white"
                  : "bg-red-badge text-white"
              }`}
            >
              {badge === "most-booked" ? "Most Booked" : "Unavailable"}
            </div>
          )}

          <div className="swiper__single__image">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className="h-full"
            >
              {galleryImages.map((img, index) => (
                <SwiperSlide key={`${id}-main-${index}`}>
                  <img
                    src={img}
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {galleryImages.length > 1 && (
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            className="mt-3"
          >
            {galleryImages.map((img, index) => (
              <SwiperSlide key={`${id}-thumb-${index}`}>
                <img
                  src={img}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="h-[60px] w-full object-cover rounded-md cursor-pointer border"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="w-full bg-[#FBFCFE] border border-[#EBEEF5] flex items-center justify-between rounded-[12px] py-2 px-3 mt-3">
          <p className="text-[#7C8798] font-medium text-[13px]">
            Last Booked by You
          </p>
          <p className="text-[#0F1723] font-bold text-[13px]">
            {safeLastBooked}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2 gap-3 flex-wrap">
          <div>
            <h3 className="text-gray-900 text-[26px] font-semibold">{name}</h3>

          </div>

          {pricePerHour !== null && pricePerHour !== undefined && (
            <div className="text-right">
              <div className="text-blue-primary text-2xl font-bold">
                ${pricePerHour}
                <span className="text-sm font-normal">/hr</span>
              </div>
            </div>
          )}

          <div className="py-2 px-3 flex items-center gap-x-[5px] rounded-[14px] border border-[#E5EAF2] bg-[#F7F9FC]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 6.66671C13.3332 9.99537 9.6405 13.462 8.4005 14.5327C8.1632 14.7112 7.83648 14.7112 7.59917 14.5327C6.35917 13.462 2.6665 9.99537 2.6665 6.66671C2.6665 3.72316 5.05629 1.33337 7.99984 1.33337C10.9434 1.33337 13.3332 3.72316 13.3332 6.66671"
                stroke="#3B63FF"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6.66663C6 7.77046 6.89617 8.66663 8 8.66663C9.10383 8.66663 10 7.77046 10 6.66663C10 5.5628 9.10383 4.66663 8 4.66663C6.89617 4.66663 6 5.5628 6 6.66663V6.66663"
                stroke="#3B63FF"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#425066] text-xs font-medium">
              {safeLocation}
            </span>
          </div>


        </div>

        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 mb-3 mt-3">
          <div className="w-full max-w-fit flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2029_383)">
                  <path
                    d="M9.99984 8.49091V11.6667M9.99984 1.66675V4.16675M15.8332 10.8334V5.83341C15.8332 4.91294 15.087 4.16675 14.1665 4.16675H5.83317C4.9127 4.16675 4.1665 4.91294 4.1665 5.83341V10.8334"
                    stroke="#7A8798"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.1498 16.6668C17.0462 15.1539 17.513 13.4252 17.4998 11.6668L10.6765 8.63427C10.2457 8.44287 9.75396 8.44287 9.32315 8.63427L2.49982 11.6668C2.46124 14.0365 3.29458 16.3378 4.84148 18.1334"
                    stroke="#7A8798"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.6665 17.5001C2.1665 17.9167 2.6665 18.3334 3.74984 18.3334C5.83317 18.3334 5.83317 16.6667 7.9165 16.6667C8.99984 16.6667 9.49984 17.0834 9.99984 17.5001C10.4998 17.9167 10.9998 18.3334 12.0832 18.3334C14.1665 18.3334 14.1665 16.6667 16.2498 16.6667C17.3332 16.6667 17.8332 17.0834 18.3332 17.5001"
                    stroke="#7A8798"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2029_383">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="text-[#637285] font-medium text-[13px]">
                {safeBoatType}
              </span>
            </div>

            <div className="text-[#0F1723] font-bold text-[20px]">•</div>

            <div className="flex items-center gap-2">
              <span className="text-[#637285] font-medium text-[13px]">
                Fuel Capacity
              </span>
              <span className="text-[#0F1723] font-medium text-[13px]">
                {safeFuelCapacity}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div
              className={`flex items-center gap-1 rounded-[100px] px-2 py-1 ${amPill.className}`}
            >
              <span className={`font-bold text-[10px] ${amPill.badgeTextClass}`}>
                {amPill.label}
              </span>
              <span className={`font-semibold text-[10px] ${amPill.textClass}`}>
                {amPill.text}
              </span>
              {amPill.icon}
            </div>

            <div
              className={`flex items-center gap-1 rounded-[100px] px-2 py-1 ${pmPill.className}`}
            >
              <span className={`font-bold text-[10px] ${pmPill.badgeTextClass}`}>
                {pmPill.label}
              </span>
              <span className={`font-semibold text-[10px] ${pmPill.textClass}`}>
                {pmPill.text}
              </span>
              {pmPill.icon}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-3 mt-1">
          <div className="w-full lg:w-[30%] flex items-center justify-between gap-2 px-3 py-2 bg-[#FAFBFD] border border-[#EEF2F6] rounded-[12px] whitespace-nowrap">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2029_228)">
                  <path
                    d="M14.1999 10.2001C14.5011 10.5003 14.6705 10.9081 14.6705 11.3334C14.6705 11.7588 14.5011 12.1666 14.1999 12.4668L12.4665 14.2001C12.1663 14.5014 11.7585 14.6707 11.3332 14.6707C10.9079 14.6707 10.5001 14.5014 10.1999 14.2001L1.79987 5.80011C1.17609 5.1733 1.17609 4.16025 1.79987 3.53345L3.5332 1.80011C4.16001 1.17633 5.17306 1.17633 5.79987 1.80011L14.1999 10.2001M9.66654 8.33345L10.9999 7.00011M7.66653 6.33345L8.99987 5.00011M5.66653 4.33345L6.99987 3.00011M11.6665 10.3334L12.9999 9.00011"
                    stroke="#8A96A8"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2029_228">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[#7A8798] font-medium text-[12px]">
                Length
              </span>
            </div>
            <span className="text-[#0F1723] font-medium text-[12px]">
              {safeLength}
            </span>
          </div>

          <div className="w-full lg:max-w-fit flex items-center justify-between gap-6 px-3 py-2 bg-[#FAFBFD] border border-[#EEF2F6] rounded-[12px]">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6668 14.0001V12.6668C10.6668 11.195 9.47194 10.0001 8.00016 10.0001H4.00016C2.52839 10.0001 1.3335 11.195 1.3335 12.6668V14.0001M10.6668 2.08545C11.843 2.39036 12.6643 3.45176 12.6643 4.66678C12.6643 5.8818 11.843 6.94321 10.6668 7.24812M14.6668 14.0001V12.6668C14.6659 11.4515 13.8435 10.3906 12.6668 10.0868"
                  stroke="#8A96A8"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.3335 4.66667C3.3335 6.13844 4.52839 7.33333 6.00016 7.33333C7.47194 7.33333 8.66683 6.13844 8.66683 4.66667C8.66683 3.19489 7.47194 2 6.00016 2C4.52839 2 3.3335 3.19489 3.3335 4.66667H3.3335"
                  stroke="#8A96A8"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[#7A8798] font-medium text-[12px]">
                Capacity
              </span>
            </div>
            <span className="text-[#0F1723] font-medium text-[12px] whitespace-nowrap">
              {safeCapacityText}
            </span>
          </div>

          <div className="w-full lg:w-[30%] flex items-center justify-between gap-2 px-3 py-2 bg-[#FAFBFD] border border-[#EEF2F6] rounded-[12px] whitespace-nowrap">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00002 9.33322L10.6667 6.66655M2.22668 12.6666C0.608854 9.86472 1.23627 6.30574 3.71468 4.22604C6.19309 2.14633 9.80695 2.14633 12.2854 4.22604C14.7638 6.30574 15.3912 9.86472 13.7734 12.6666"
                  stroke="#8A96A8"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[#7A8798] font-medium text-[12px]">
                Motor
              </span>
            </div>
            <span className="text-[#0F1723] font-medium text-[12px]">
              {safeMotor}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 mb-3 mt-1">
          <h2 className="text-[#0F1723] text-[17px] font-bold mb-1">
            Boat Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 w-full">
            {featureCards.map((item) => (
              <div
                className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-[12px] border border-[#EEF2F6] bg-[#FAFBFD]"
                key={item.key}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-4 h-4 shrink-0"
                  />

                  <span className="text-[#526173] text-xs whitespace-nowrap">
                    {item.label}
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                    item.enabled
                      ? "bg-[#E6F6EB] text-[#008A3A]"
                      : "bg-[#F1F4F8] text-[#6F7C8E]"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 rounded-lg bg-gray-200 text-gray-900 text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-auto items-center justify-between">
          <div className="flex flex-col gap-1 px-4 w-full sm:w-auto">
            <p className="text-sm text-[#0F1723] font-bold">Notes</p>
            <p className="text-sm text-[#1F2937] font-normal max-w-[250px] break-words">
              {safeNotes}
            </p>
          </div>

          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={onSelectBoat}
              className="flex-1 sm:flex-none sm:min-w-[180px] py-3 px-4 bg-blue-primary text-white font-semibold text-base rounded-md hover:bg-blue-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={badge === "unavailable"}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}